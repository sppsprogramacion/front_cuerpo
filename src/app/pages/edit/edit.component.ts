import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinoModel } from '../../models/destino.model';
import { destinos, departamentos, departamentos_provinciales, divisiones, estados_civil, municipios, nivelEducativo, sectores, secciones_guardia, situacion, escalaJerarquica, escalafon, grados, sexos, provincias, ciudades} from 'src/app/common/data-mockeada';
import { globalConstants } from '../../common/global-constants';
import { DepartamentoModel } from '../../models/departamento.model';
import { DivisionModel } from '../../models/division.model';
import { sectorModel } from '../../models/sector.model';
import { SeccionGuardia } from 'src/app/models/seccion_guardia.model';
import { EscalafonModel } from '../../models/escalafon.model';
import { EscalaJerarquicaModel } from '../../models/escala.model';
import { GradoModel } from '../../models/grado.model';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PersonalService } from 'src/app/services/personal.service';
import {DatePipe} from '@angular/common';
import {FechasPipe} from '../../pipes/fechas.pipe';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import * as printJS from 'print-js';
import { SexoModel } from '../../models/sexo.model';
import { EstadoCivilModel } from '../../models/estado_civil.model';
import { ProvinciaModel } from 'src/app/models/provincia.model';
import { DepartamentoProvincialModel } from 'src/app/models/departamento_provincial.model';
import { MunicipioModel } from '../../models/municipio.model';
import { csLocale } from 'ngx-bootstrap/chronos';
import { NivelEducativoModel } from '../../models/nivel_educativo.model';
import { SituacionModel } from '../../models/situacion.model';
import { PdfModel } from '../../models/pdf.model';
import { PdfpersonalPipe } from 'src/app/pipes/pdfpersonal.pipe';
import { PdfService } from 'src/app/services/pdf.service';
import {environment} from 'src/environments/environment';
import { CiudadModel } from '../../models/ciudad.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
     './edit.component.css'
  ]
})
export class EditComponent implements OnInit {
  base_url:string = environment.URL_BASE;
  
  forma: FormGroup;
  formaFiliatorios: FormGroup;
  dataEdit: Personal={};
  pdfsList: PdfModel[] = [];
  loadingTablaPdfs: boolean = false;
  nombreCompleto: string="";

  administrador: boolean = false;
  destino_txt: string="";
  
  //variables de manejo de pdf
  newFileDialog: boolean = false;
  url_pdf: string = "";
  regPdf: Partial<PdfModel> = new PdfModel();
  submitted: boolean = false;
  baseUrlPdf: string = `${this.base_url}/archivo/pdf`;

  //manejo de forumulario de personal
  departamentos: DepartamentoModel[]=[];
  departamentos_provincial: DepartamentoProvincialModel[]=[];
  destinos: DestinoModel[]=[];
  divisiones: DivisionModel[]=[];  
  escalas: EscalaJerarquicaModel[]=[];
  escalafones: EscalafonModel[]=[];
  estados_civil: EstadoCivilModel[]=[];
  grados: GradoModel[]=[];
  municipios: MunicipioModel[]=[];
  niveles_educativo: NivelEducativoModel[]=[];
  provincias: ProvinciaModel[]=[];
  sectores: sectorModel[]=[];
  secciones_guardia: SeccionGuardia[]=[];
  sexos: SexoModel[]=[];
  situaciones: SituacionModel[]=[];
  ciudades: CiudadModel[]=[];


  foto_nombre: string = 'no-image.png';
  fotoSubir: File | undefined;
  pdfSubir: File | undefined;
  modo: string = 'laboral';
  auxiliarDate: any = null;
  
  bsDatePickerConfig!: Partial<BsDatepickerConfig>;

  constructor(
    public dataService: DataService,
    private fb: FormBuilder,
    private readonly fileUploadService: FileUploadService,
    private readonly personalService: PersonalService,
    private readonly datePipe: DatePipe,
    private localeService: BsLocaleService,
    private pdfService: PdfService
  ) {
    this.dataEdit= dataService.personalData;
    this.regPdf.legajo_personal = this.dataEdit.legajo!;  
    if(this.dataEdit.ultimo_ascenso != null){
      //debe ser MM-dd-yyyy porque el tipo Date recibe ese formato... con dd-MM-yyyy intercambia mes con dia
      let auxiliar = this.datePipe.transform(this.dataEdit.ultimo_ascenso, "MM-dd-yyyy");
      this.dataEdit.ultimo_ascenso = new Date(auxiliar!);
           
    }
    if(this.dataEdit.fecha_nacimiento != null){
      //debe ser MM-dd-yyyy porque el tipo Date recibe ese formato... con dd-MM-yyyy intercambia mes con dia
      let auxiliar2 = this.datePipe.transform(this.dataEdit.fecha_nacimiento, "MM-dd-yyyy");
      this.dataEdit.fecha_nacimiento = new Date(auxiliar2!);
           
    }

    if(this.dataEdit.fecha_ingreso != null){
      //debe ser MM-dd-yyyy porque el tipo Date recibe ese formato... con dd-MM-yyyy intercambia mes con dia
      let auxiliar3 = this.datePipe.transform(this.dataEdit.fecha_ingreso, "MM-dd-yyyy");
      this.dataEdit.fecha_ingreso = new Date(auxiliar3!);
           
    }

    //configuracion de datepicker
    this.bsDatePickerConfig = Object.assign({}, 
    { isAnimated: true, 
      dateInputFormat: 'DD/MM/YYYY', 
      containerClass: 'theme-dark-blue' 
  
    });

    //configurar idioma bsDatepicker
    this.localeService.use('en');

    //cargar lista de pdfs
    if(this.dataEdit.pdfs != null){
      this.pdfsList = this.dataEdit.pdfs.map(item => {
        const pdf: PdfModel = {
          ...item
        }
        return pdf;
          });
    }
    

    //creando el formulario
    this.forma = this.fb.group({
       id_personal: [this.dataEdit.id_personal,Validators.required],
       apellido_1: [this.dataEdit.apellido_1,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       apellido_2: [this.dataEdit.apellido_2,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_1: [this.dataEdit.nombre_1,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       nombre_2: [this.dataEdit.nombre_2,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_3: [this.dataEdit.nombre_3,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      //  dni: [this.dataEdit.dni,[Validators.required,Validators.min(1111111),Validators.max(99999999)]],
       legajo: [this.dataEdit.legajo,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
       destino_id: [this.dataEdit.destino_id,[Validators.required]],
       departamento_id: [this.dataEdit.departamento_id],
       division_id: [this.dataEdit.division_id],
       sector_id: [this.dataEdit.sector_id],
       funcion: [this.dataEdit.funcion,[Validators.minLength(1), Validators.maxLength(200)]],
       seccion_guardia_id: [this.dataEdit.seccion_guardia_id],
       escalafon_id: [this.dataEdit.escalafon_id],
       escala_jerarquica_id: [this.dataEdit.escala_jerarquica_id],
       grado_id: [this.dataEdit.grado_id],
       foto: [this.dataEdit.foto],
       ultimo_ascenso: [this.dataEdit.ultimo_ascenso],
      //  fecha_nacimiento:[this.dataEdit.fecha_nacimiento],
    });

    //FORMULARIO DATOS FILIATORIOS
    this.formaFiliatorios = this.fb.group({   
      dni: [this.dataEdit.dni,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      fecha_nacimiento: [this.dataEdit.fecha_nacimiento,[Validators.required]],
      fecha_ingreso: [this.dataEdit.fecha_ingreso, ],
      cuil: [this.dataEdit.cuil,[Validators.required, Validators.pattern(/\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/)]],
      sexo_id: [this.dataEdit.sexo_id],
      estado_civil_id: [this.dataEdit.estado_civil_id],
      nacionalidad: [this.dataEdit.nacionalidad,[Validators.minLength(1), Validators.maxLength(50)]],
      domicilio: [this.dataEdit.domicilio,[Validators.minLength(1), Validators.maxLength(300)]],
      provincia_id: [this.dataEdit.provincia_id],
      departamento_provincial_id: [this.dataEdit.departamento_provincial_id],
      municipio_id: [this.dataEdit.municipio_id],
      ciudad_id: [this.dataEdit.ciudad_id],
      nivel_educativo_id: [this.dataEdit.nivel_educativo_id],
      telefonos: [this.dataEdit.telefonos,[Validators.minLength(1), Validators.maxLength(300)]],
      email: [this.dataEdit.email,[Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.minLength(4), Validators.maxLength(50)]],
      altura: [this.dataEdit.altura],
      peso: [this.dataEdit.peso],
      registrado_por: [this.dataEdit.registrado_por],
      situacion_id: [this.dataEdit.situacion_id]
    });
    //FIN FORMULARIO DATOS FILIATORIOS
  
    //this.submitForm();
   
    let auxiliar: any;
    auxiliar = this.dataEdit.grado;
    this.nombreCompleto = (auxiliar.grado! || "") + " " + (this.dataEdit.apellido_1! || "") + " " + (this.dataEdit.apellido_2! || "") +" " + (this.dataEdit.nombre_1! || "") +" " + (this.dataEdit.nombre_2! || "") +" " + (this.dataEdit.nombre_3! || "");
    this.nombreCompleto = this.nombreCompleto.toUpperCase();
    this.administrador = (globalConstants.rol_usuario == "0")? true: false;
    auxiliar = this.dataEdit.destino;    

    this.cargarDepartamentos(this.dataEdit.destino_id!);
    this.cargarDepartamentosProvinciales(this.dataEdit.provincia_id!)
    this.cargarDivisiones(this.dataEdit.departamento_id!);
    this.cargarGrados(this.dataEdit.escala_jerarquica_id!);
    this.cargarMunicipios(this.dataEdit.departamento_provincial_id!);
    this.cargarSeccionesGuardia(this.dataEdit.departamento_id!);
    
    this.destino_txt = auxiliar.destino;

    this.estados_civil = estados_civil;    
    this.escalafones = escalafon;
    this.escalas = escalaJerarquica;
    this.niveles_educativo = nivelEducativo;
    this.provincias = provincias;
    this.sexos = sexos;
    this.situaciones= situacion;

    if(this.dataEdit.foto){
      this.foto_nombre = this.dataEdit.foto?.toString();

    }

  }
  //fin constructor

  ngOnInit(): void {
    //cargar el array de destinos
    this.destinos = destinos;      
    this.cargarPdfs();
  }  

  // async descargarPdf(url: string){
  //   console.log('LA URL ES: ', url);
  //   await  this.pdfService.getPdf(url).then();   
  // }

  descargarPdf(id: number){
    this.pdfService.getPDF(id)
    .subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);

// if you want to open PDF in new tab
        window.open(fileURL); 
        var a         = document.createElement('a');
        a.href        = fileURL; 
        a.target      = '_blank';
        a.download    = 'bill.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ',error);
      }
    );
  }

  //VALIDACIONES FORMULARIOS
  //mensajes de validaciones
  user_validation_messages = {
    //Formulario datos laborales
    'apellido_1': [
      { type: 'required', message: 'El primer apellio es requerido' },
      { type: 'pattern', message: 'Solo se pueden ingresar letras y espacios.' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 50.' }
    ],
    'apellido_2': [
      { type: 'pattern', message: 'Solo se pueden ingresar letras y espacios.' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 50.'}
    ],
    'nombre_1': [
      { type: 'required', message: 'El primer nombre es requerido' },
      { type: 'pattern', message: 'Solo se pueden ingresar letras y espacios.' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 50.' }
    ],
    'nombre_2': [
      { type: 'pattern', message: 'Solo se pueden ingresar letras y espacios.' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 50.'}
    ],
    'nombre_3': [
      { type: 'pattern', message: 'Solo se pueden ingresar letras y espacios.' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 50.'}
    ],
    'legajo': [
      { type: 'required', message: 'El legajo es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' },
      { type: 'min', message: 'El número ingresado es bajo.(minimo: 1)' },
      { type: 'max', message: 'El número ingresado es alto (maximo: 500000).'} 
    ],
    'funcion': [
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 1' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 200'}
    ],
    //fin Formulario datos laborales

    //Formulario datos personales
    'dni': [
      { type: 'required', message: 'El dni es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' },
      { type: 'min', message: 'El número ingresado es bajo.(minimo: 1000000)' },
      { type: 'max', message: 'El número ingresado es alto (maximo: 99000000).'} 
    ],
    'cuil': [
      { type: 'required', message: 'El cuil es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número de cuil válido (Ej. 20-32505425-8).' }
    ],
    'nacionalidad': [
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 50.'}
    ],
    'domicilio': [
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 300.'}
    ],
    'telefonos': [
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 300.'}
    ],
    'email': [
      { type: 'pattern', message: 'No es un email válido.' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 4.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 50.'}
    ]

    //fin Formulario datos personales
  }
  //FIN mensajes de validaciones

  //fin validaciones formulario laborales
  get apellido1NoValido(){
    return this.forma.get('apellido_1')?.invalid && this.forma.get('apellido_1')?.touched;
  }

  get apellido2NoValido(){
    return this.forma.get('apellido_2')?.invalid && this.forma.get('apellido_2')?.touched;
  }

  get nombre1NoValido(){
    return this.forma.get('nombre_1')?.invalid && this.forma.get('nombre_1')?.touched;
  }  
  get nombre2NoValido(){
    return this.forma.get('nombre_2')?.invalid && this.forma.get('nombre_2')?.touched;
  }  
  get nombre3NoValido(){
    return this.forma.get('nombre_3')?.invalid && this.forma.get('nombre_3')?.touched;
  }  

  get legajoNoValido(){    
    return this.forma.get('legajo')?.invalid && this.forma.get('legajo')?.touched;
  }

  get funcionNoValido(){    
    return this.forma.get('funcion')?.invalid && this.forma.get('funcion')?.touched;
  }

  get destinoNoValido(){
    return this.forma.get('destino_id')?.invalid && this.forma.get('destino_1')?.touched;
  }

  get departamentoNoValido(){
    return this.forma.get('departamento_id')?.invalid && this.forma.get('departamento_id')?.touched;
  }
  //fin validaciones formulario laborales

  //validaciones formulario filatorios
  get dniNoValido(){
    return this.formaFiliatorios.get('dni')?.invalid && this.formaFiliatorios.get('dni')?.touched;
  }

  get cuilNoValido(){
    return this.formaFiliatorios.get('cuil')?.invalid && this.formaFiliatorios.get('cuil')?.touched;
  }

  get fechaNacimientoNoValido(){
    return this.formaFiliatorios.get('fecha_nacimiento')?.invalid && this.formaFiliatorios.get('fecha_nacimiento')?.touched;
  }

  get nacionalidadNoValido(){    
    return this.formaFiliatorios.get('nacionalidad')?.invalid && this.formaFiliatorios.get('nacionalidad')?.touched;
  }

  get domicilioNoValido(){    
    return this.formaFiliatorios.get('domicilio')?.invalid && this.formaFiliatorios.get('domicilio')?.touched;
  }

  get telefonosNoValido(){    
    return this.formaFiliatorios.get('telefonos')?.invalid && this.formaFiliatorios.get('telefonos')?.touched;
  }

  get emailNoValido(){    
    return this.formaFiliatorios.get('email')?.invalid && this.formaFiliatorios.get('email')?.touched;
  }
  
  //fin validaciones formulario filatorios
  //FIN VALIDACIONES FORMULARIOS


  cargarDepartamentos(destino_id: number){
     this.departamentos=departamentos.filter(departamento => {
       
              return departamento.destino_id == destino_id || departamento.destino_id == 0;
         });
  }

  onChangeDestino(){
    
    Swal.fire({
      title: 'Confirma el cambio de destino del personal?',
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: `Cambiar de Destino`,
      denyButtonText: `Cancelar Cambio de Destino`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const id = this.forma.get('destino_id')?.value;
        if(id != null){
          this.cargarDepartamentos(parseInt(id.toString()));
          this.divisiones = [];
          this.sectores = [];
          this.secciones_guardia= [];      
        }else{
          Swal.fire('Error: repita la operación por favor', '', 'info')
        }
        Swal.fire('Exito!', '', 'success')
      } else if (result.isDenied) {
        this.forma.get('destino_id')?.setValue(this.dataEdit.destino_id);
        Swal.fire('Usted ha cancelado el cambio de destino', '', 'info')
      }
    })

    
  }
  
  cargarDepartamentosProvinciales(provincia_id: number){
    this.departamentos_provincial=departamentos_provinciales.filter(departamento_provincial => {
      
             return departamento_provincial.provincia_id == provincia_id || departamento_provincial.provincia_id == 0;
        });
  }

  onChangeProvincia(){
    const id = this.formaFiliatorios.get('provincia_id')?.value;
    if(id != null){
      this.cargarDepartamentosProvinciales(parseInt(id.toString()));
           
    }    
  }

  cargarMunicipios(departamento_provincial_id: number){
    this.municipios=municipios.filter(municipio => {
      
             return municipio.departamento_id == departamento_provincial_id || municipio.departamento_id == 0;
        });
  }

  onChangeDepartamentoProvincial(){
    const id = this.formaFiliatorios.get('departamento_provincial_id')?.value;
    if(id != null){
      this.cargarMunicipios(parseInt(id.toString()));
           
    }    
  }

  cargarCiudades(municipio_id: number){
    this.ciudades= ciudades.filter(ciudad => {
      
             return ciudad.municipio_id == municipio_id || ciudad.municipio_id == 3986;
        });
  }

  onChangeMunicipios(){
    const id = this.forma.get('municipio_id')?.value;
    if(id != null){
      this.cargarCiudades(parseInt(id.toString()));
      //this.cargarSeccionesGuardia(parseInt(id.toString()));
      
    }    
  }

  
  onChangeDepartamento(){
    const id = this.forma.get('departamento_id')?.value;
    if(id != null){
      this.cargarDivisiones(parseInt(id.toString()));
      this.cargarSeccionesGuardia(parseInt(id.toString()));
      
    }
  }

  cargarDivisiones(departamento_id: number){
    this.divisiones = divisiones.filter(division => {
       
      return division.departamento_id == departamento_id || division.departamento_id == 0;
 });
  }

 

  cargarSectores(division_id: number){
    this.sectores = sectores.filter(sector => {
       
      return sector.division_id == division_id || sector.division_id == 0;
    });
  }

  onChangeDivision(){
    const id = this.forma.get('division_id')?.value;
    if(id != null){
      this.cargarSectores(parseInt(id.toString()));
      
    }
  }

  cargarSeccionesGuardia(departamento_id: number){
    this.secciones_guardia = secciones_guardia.filter(seccion_gdia => {
       
      return seccion_gdia.departamento_id == departamento_id || seccion_gdia.departamento_id == 0;
 });
  }

  cargarGrados(escala_jerarquica_id: number){
    this.grados = grados.filter(grado => {
       
      return grado.escala_jerarquica_id == escala_jerarquica_id || grado.escala_jerarquica_id == 0;
 });
  }

  onChangeEscala(){
    const id = this.forma.get('escala_jerarquica_id')?.value;
    if(id != null){
      this.cargarGrados(parseInt(id.toString()));
      
    }
  }

  onUpload(event: File){
    try {
        console.log('DATA DEL ARCHIVO', event);
        this.fotoSubir = event;
        let id: number =  this.dataEdit.id_personal! ;
       this.fileUploadService.actualizarFotoPersonal(this.fotoSubir, id).then(respuesta => {
           if(respuesta.ok){
            Swal.fire('Actualización Exitosa!!', "La foto del Usuario ha sido cambiada con éxito","success");
           }else{
               throw new Error('Error al Actualizar la foto');
           }
       }).catch(error => {
        Swal.fire('Error', error.message, "error"); 
       });
        
    } catch (error) {
        
        Swal.fire('Error', error.message, "error");    
    }
  }

  onDateChange(nuevaFecha: Date){
    if(nuevaFecha != null){
      this.auxiliarDate = this.datePipe.transform(nuevaFecha,"yyyy-MM-dd")!;
        
    }
  }

  changeFormatoFechaGuardar(nuevaFecha: Date){
    let fechaAuxiliar:any = null;
    if(nuevaFecha != null){
      fechaAuxiliar = this.datePipe.transform(nuevaFecha,"yyyy-MM-dd")!;
      
    }
    return fechaAuxiliar;
  }
  

  submitForm(formEnviado:string){
    
    let data: Partial<Personal>;
    //crear la data
    if(formEnviado == 'laboral'){

      if(this.forma.invalid){
        Swal.fire('Formulario con errores','Complete correctamente todos los campos del formulario',"warning");
        return Object.values(this.forma.controls).forEach(control => control.markAsTouched());
      }

      data = {        
        legajo: parseInt(this.forma.get('legajo')?.value),
        apellido_1: this.forma.get('apellido_1')?.value,
        apellido_2: this.forma.get('apellido_2')?.value,
        nombre_1: this.forma.get('nombre_1')?.value,
        nombre_2: this.forma.get('nombre_2')?.value,
        nombre_3: this.forma.get('nombre_3')?.value,
        destino_id: parseInt(this.forma.get('destino_id')?.value),
        departamento_id: parseInt(this.forma.get('departamento_id')?.value),
        division_id: parseInt(this.forma.get('division_id')?.value),
        sector_id: parseInt(this.forma.get('sector_id')?.value),
        funcion: this.forma.get('funcion')?.value,
        seccion_guardia_id: parseInt(this.forma.get('seccion_guardia_id')?.value),
        escalafon_id: parseInt(this.forma.get('escalafon_id')?.value),
        escala_jerarquica_id: parseInt(this.forma.get('escala_jerarquica_id')?.value),
        grado_id: parseInt(this.forma.get('grado_id')?.value),
        ultimo_ascenso: this.auxiliarDate,
        
    }}else{

      if(this.formaFiliatorios.invalid){
        Swal.fire('Formulario con errores','Complete correctamente todos los campos del formulario',"warning");
        return Object.values(this.formaFiliatorios.controls).forEach(control => control.markAsTouched());
      }

      data = {
        dni: parseInt(this.formaFiliatorios.get('dni')?.value),
        fecha_nacimiento: this.changeFormatoFechaGuardar(this.formaFiliatorios.get('fecha_nacimiento')?.value), 
        fecha_ingreso: this.changeFormatoFechaGuardar(this.formaFiliatorios.get('fecha_ingreso')?.value), 
        cuil: this.formaFiliatorios.get('cuil')?.value,
        sexo_id: parseInt(this.formaFiliatorios.get('sexo_id')?.value),
        estado_civil_id: parseInt(this.formaFiliatorios.get('estado_civil_id')?.value),
        nacionalidad: this.formaFiliatorios.get('nacionalidad')?.value,
        domicilio: this.formaFiliatorios.get('domicilio')?.value,
        provincia_id: parseInt(this.formaFiliatorios.get('provincia_id')?.value),
        departamento_provincial_id: parseInt(this.formaFiliatorios.get('departamento_provincial_id')?.value),
        municipio_id: parseInt(this.formaFiliatorios.get('municipio_id')?.value),
        //ciudad_id: [this.dataEdit.ciudad_id],
        nivel_educativo_id: parseInt(this.formaFiliatorios.get('nivel_educativo_id')?.value),
        telefonos: this.formaFiliatorios.get('telefonos')?.value,
        email: this.formaFiliatorios.get('email')?.value,
        altura: parseInt(this.formaFiliatorios.get('altura')?.value),
        peso: parseInt(this.formaFiliatorios.get('peso')?.value),
        registrado_por: globalConstants.id_usuario,
        situacion_id: parseInt(this.formaFiliatorios.get('situacion_id')?.value),
  
      }
        
    }
                
    this.personalService.editPersonal(data,parseInt(this.dataEdit.id_personal?.toString()!))
      .subscribe(
        resultado => {                                                                
          Swal.fire('Exito',`El Registro ha sido editado con Exito`,"success");
        },
        error => {                                                                
          Swal.fire('Error',`Error al Editar el Usuario ${error.error.message}`,"error")                          
        }
      );  
    
  }

  //manejo de tabla de registros de pdfs
  crearRegistro(){
    this.newFileDialog = true;
  }
  
  grabarRegPdf(){
    this.submitted = true;
    console.log('DATA RECIBIDA PARA GRABAR', this.regPdf);
  }
  
  ocultarDialogo(){
    this.newFileDialog = false
  }  

  onUploadPdf(event: File){
    try {
      this.submitted = true;
      this.pdfSubir = event;
      let legajo: number =  this.dataEdit.legajo! ;
      let detalle: string =  this.regPdf.detalle! ;
      let fecha_pdf: Date =  this.regPdf.fecha_documento! ;
      let indice: number =  this.regPdf.indice! ;
      this.pdfService.postPdf(this.pdfSubir, legajo, detalle, fecha_pdf, indice).then(respuesta => {
         if(respuesta.ok){
          Swal.fire('Carga Exitosa!!', "El pdf del legajo digital ha sido subido  con éxito","success");
          this.submitted = false;
          this.newFileDialog = false;
             }else{
                 throw new Error(respuesta.message);
         }
     }).catch(error => {
      Swal.fire('Error', error.message, "error"); 
     });
     
      
  } catch (error) {
       Swal.fire('Error', error.message, "error");    
  }
}

async cargarPdfs(){
    const legajo = 3200;
    const respuesta = await (await this.pdfService.getxlegajo(legajo)).subscribe(res => {
      console.log('>>>>>>>>>>>>',res);
    });
     
}
}
