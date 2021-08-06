import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinoModel } from '../../models/destino.model';
import { destinos, departamentos, divisiones, estados_civil, sectores, secciones_guardia, escalaJerarquica, escalafon, grados, sexos} from 'src/app/common/data-mockeada';
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


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
     './edit.component.css'
  ]
})
export class EditComponent implements OnInit {
  forma: FormGroup;
  formaFiliatorios: FormGroup;
  dataEdit: Personal={};
  nombreCompleto: string="";
  destinos: DestinoModel[]=[];
  administrador: boolean = false;
  destino_txt: string="";
  departamentos: DepartamentoModel[]=[];
  divisiones: DivisionModel[]=[];
  estados_civil: EstadoCivilModel[]=[];
  sectores: sectorModel[]=[];
  secciones_guardia: SeccionGuardia[]=[];
  escalafones: EscalafonModel[]=[];
  escalas: EscalaJerarquicaModel[]=[];
  grados: GradoModel[]=[];
  sexos: SexoModel[]=[];
  foto_nombre: string = 'no-image.png';
  fotoSubir: File | undefined;
  modo: string = 'laboral';
  auxiliarDate: any = null;
  
  bsDatePickerConfig!: Partial<BsDatepickerConfig>;

  constructor(
    public dataService: DataService,
    private fb: FormBuilder,
    private readonly fileUploadService: FileUploadService,
    private readonly personalService: PersonalService,
    private readonly datePipe: DatePipe,
    private localeService: BsLocaleService
  ) {
    this.dataEdit= dataService.personalData;
    if(this.dataEdit.ultimo_ascenso != null){
      //debe ser MM-dd-yyyy porque el tipo Date recibe ese formato... con dd-MM-yyyy intercambia mes con dia
      let auxiliar = this.datePipe.transform(this.dataEdit.ultimo_ascenso, "MM-dd-yyyy");
      this.dataEdit.ultimo_ascenso = new Date(auxiliar!);
           
    }
     //configuracion de datepicker
     this.bsDatePickerConfig = Object.assign({}, 
      { isAnimated: true, 
        dateInputFormat: 'DD/MM/YYYY', 
        containerClass: 'theme-dark-blue' 
    
      });

      //configurar idioma bsDatepicker
      this.localeService.use('en');
    
    

    //creando el formulario
    this.forma = this.fb.group({
       id_personal: [this.dataEdit.id_personal,Validators.required],
       apellido_1: [this.dataEdit.apellido_1,Validators.required],
       apellido_2: [this.dataEdit.apellido_2],
       nombre_1: [this.dataEdit.nombre_1,Validators.required],
       nombre_2: [this.dataEdit.nombre_2],
       nombre_3: [this.dataEdit.nombre_3],
      //  dni: [this.dataEdit.dni,[Validators.required,Validators.min(1111111),Validators.max(99999999)]],
       legajo: [this.dataEdit.legajo,[Validators.required]],
       destino_id: [this.dataEdit.destino_id,[Validators.required]],
       departamento_id: [this.dataEdit.departamento_id],
       division_id: [this.dataEdit.division_id],
       sector_id: [this.dataEdit.sector_id],
       funcion: [this.dataEdit.funcion],
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
      dni: [this.dataEdit.dni,Validators.required],
      fecha_nacimiento: [this.dataEdit.fecha_nacimiento,Validators.required],
      fecha_ingreso: [this.dataEdit.fecha_ingreso],
      cuil: [this.dataEdit.cuil,Validators.required],
      sexo_id: [this.dataEdit.sexo_id],
      estado_civil_id: [this.dataEdit.estado_civil_id],
      nacionalidad: [this.dataEdit.nacionalidad,[Validators.required]],
      domicilio: [this.dataEdit.domicilio,[Validators.required]],
      provincia_id: [this.dataEdit.provincia_id],
      departamento_provincial_id: [this.dataEdit.departamento_provincial_id],
      municipio_id: [this.dataEdit.municipio_id],
      ciudad_id: [this.dataEdit.ciudad_id],
      nivel_educativo_id: [this.dataEdit.nivel_educativo_id],
      telefonos: [this.dataEdit.telefonos],
      email: [this.dataEdit.email],
      altura: [this.dataEdit.altura],
      peso: [this.dataEdit.peso],
      registrado_por: [this.dataEdit.registrado_por],
      situacion_id: [this.dataEdit.situacion_id]
     //  fecha_nacimiento:[this.dataEdit.fecha_nacimiento],
    });
    //FIN FORMULARIO DATOS FILIATORIOS
  
    //this.submitForm();
   
    let auxiliar: any;
    auxiliar = this.dataEdit.grado;
    this.nombreCompleto = (auxiliar.grado! || "") + " " + (this.dataEdit.apellido_1! || "") + " " + (this.dataEdit.apellido_2! || "") +" " + (this.dataEdit.nombre_1! || "") +" " + (this.dataEdit.nombre_2! || "") +" " + (this.dataEdit.nombre_3! || "");
    this.nombreCompleto = this.nombreCompleto.toUpperCase();
    this.administrador = (globalConstants.rol_usuario == "0")? true: false;
    auxiliar = this.dataEdit.destino;
    this.destino_txt = auxiliar.destino;
    this.estados_civil = estados_civil;
    this.cargarDepartamentos(this.dataEdit.destino_id!);
    this.cargarDivisiones(this.dataEdit.departamento_id!);
    this.cargarSeccionesGuardia(this.dataEdit.departamento_id!);
    this.escalafones = escalafon;
    this.escalas = escalaJerarquica;
    this.cargarGrados(this.dataEdit.escala_jerarquica_id!);
    this.sexos = sexos;
    console.log("sexos", this.sexos);

    if(this.dataEdit.foto){
      this.foto_nombre = this.dataEdit.foto?.toString();

    }
    
  }
  //fin constructor

  ngOnInit(): void {
    //cargar el array de destinos
    this.destinos = destinos;

       
    
  }

  get apellido1NoValido(){
    return this.forma.get('apellido_1')?.invalid && this.forma.get('apellido_1')?.touched;
  }

  get nombre1NoValido(){
    return this.forma.get('nombre_1')?.invalid && this.forma.get('nombre_1')?.touched;
  }

  get dniNoValido(){
    return this.forma.get('dni')?.invalid && this.forma.get('dni')?.touched;
  }

  get legajoNoValido(){
    return this.forma.get('legajo')?.invalid && this.forma.get('legajo')?.touched;
  }

  get destinoNoValido(){
    return this.forma.get('destino_id')?.invalid && this.forma.get('destino_1')?.touched;
  }

  get departamentoNoValido(){
    return this.forma.get('departamento_id')?.invalid && this.forma.get('departamento_id')?.touched;
  }

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
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        this.forma.get('destino_id')?.setValue(this.dataEdit.destino_id);
        Swal.fire('Usted ha cancelado el cambio de destino', '', 'info')
      }
    })

    
  }

  cargarDivisiones(departamento_id: number){
    this.divisiones = divisiones.filter(division => {
       
      return division.departamento_id == departamento_id || division.departamento_id == 0;
 });
  }

  onChangeDepartamento(){
    const id = this.forma.get('departamento_id')?.value;
    if(id != null){
      this.cargarDivisiones(parseInt(id.toString()));
      this.cargarSeccionesGuardia(parseInt(id.toString()));
      
    }
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
    //console.log('AUXILIAR DATE', this.auxiliarDate);
    // this.forma.get('ultimo_ascenso')?.setValue(auxiliarDate);
    // let d: Date = new Date(auxiliarDate);
    // console.log('FECHA ==>>>>>>', d);
    // let v = d.toISOString();
    // console.log('TOSISOSTRING >>>>>>>', v);
    
    
  }
}
  

  submitForm(){
       if(this.forma.invalid){
                  return Object.values(this.forma.controls).forEach(control => control.markAsTouched());
              }
        
        let data: Partial<Personal>;
        //crear la data
        if(this.modo == 'laboral'){
          data = {
                legajo: this.forma.get('legajo')?.value,
                apellido_1: this.forma.get('apellido_1')?.value,
                apellido_2: this.forma.get('apellido_2')?.value,
                nombre_1: this.forma.get('nombre_1')?.value,
                nombre_2: this.forma.get('nombre_2')?.value,
                nombre_3: this.forma.get('nombre_3')?.value,
                destino_id: parseInt(this.forma.get('destino_id')?.value),
                departamento_id: parseInt(this.forma.get('departamento_id')?.value),
                division_id: parseInt(this.forma.get('division_id')?.value),
                sector_id: parseInt(this.forma.get('sector_id')?.value),
                seccion_guardia_id: parseInt(this.forma.get('seccion_guardia_id')?.value),
                escalafon_id: parseInt(this.forma.get('escalafon_id')?.value),
                escala_jerarquica_id: parseInt(this.forma.get('escala_jerarquica_id')?.value),
                grado_id: parseInt(this.forma.get('grado_id')?.value),
                ultimo_ascenso: this.auxiliarDate,
                
          }}else{
            data = {
              legajo: this.forma.get('legajo')?.value,
              apellido_1: this.forma.get('apellido_1')?.value,
              apellido_2: this.forma.get('apellido_2')?.value,
              nombre_1: this.forma.get('nombre_1')?.value,
              nombre_2: this.forma.get('nombre_2')?.value,
              nombre_3: this.forma.get('nombre_3')?.value,
              destino_id: this.forma.get('destino_id')?.value,
              departamento_id: this.forma.get('departamento_id')?.value,
              division_id: this.forma.get('division_id')?.value,
              sector_id: this.forma.get('sector_id')?.value,
              seccion_guardia_id: this.forma.get('seccion_guardia_id')?.value,
              escalafon_id: this.forma.get('escalafon_id')?.value,
              escala_jerarquica_id: this.forma.get('escala_jerarquica_id')?.value,
              grado_id: this.forma.get('grado_id')?.value,
          }
        }
                 
          this.personalService.editPersonal(data,parseInt(this.dataEdit.id_personal?.toString()!))
                                                              .subscribe(resultado => {
                                                                  Swal.fire('Exito',`El Registro ha sido editado con Exito`,"success");
                                                                  //this.actualizarUsuarios();
                                                                  //this.hideDialog();
                                                              },
                                                              error => {
                                                                  console.log("personal a editar", data);
                                                                  Swal.fire('Error',`Error al Editar el Usuario ${error.error.message}`,"error")                          
                                                              });
         
        
  
}

  

    


}
