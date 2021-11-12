import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { departamentos, departamentos_provinciales, destinos, divisiones, escalafon, escalaJerarquica, estados_civil, grados, municipios, nivelEducativo, 
         provincias, secciones_guardia, sectores, sexos, situacion, ciudades } from 'src/app/common/data-mockeada';
import { globalConstants } from 'src/app/common/global-constants';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoProvincialModel } from 'src/app/models/departamento_provincial.model';
import { DestinoModel } from 'src/app/models/destino.model';
import { DivisionModel } from 'src/app/models/division.model';
import { EscalaJerarquicaModel } from 'src/app/models/escala.model';
import { EscalafonModel } from 'src/app/models/escalafon.model';
import { EstadoCivilModel } from 'src/app/models/estado_civil.model';
import { GradoModel } from 'src/app/models/grado.model';
import { MunicipioModel } from 'src/app/models/municipio.model';
import { NivelEducativoModel } from 'src/app/models/nivel_educativo.model';
import { Personal } from 'src/app/models/personal.model';
import { ProvinciaModel } from 'src/app/models/provincia.model';
import { SeccionGuardia } from 'src/app/models/seccion_guardia.model';
import { sectorModel } from 'src/app/models/sector.model';
import { SexoModel } from 'src/app/models/sexo.model';
import { SituacionModel } from 'src/app/models/situacion.model';
import { PersonalService } from 'src/app/services/personal.service';
import Swal from 'sweetalert2';
import { CiudadModel } from '../../models/ciudad.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [
  ]
})
export class UploadComponent implements OnInit {

  forma: FormGroup;
  administrador: boolean = false;
  
  destino_txt: string="";

  ciudades: CiudadModel[]=[];
  departamentos: DepartamentoModel[]=[];
  departamentos_provinciales: DepartamentoProvincialModel[]=[];
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
  //ciudades: CiudadModel[]=[];


  foto_nombre: string = 'no-image.png';
  fotoSubir: File | undefined;
  modo: string = 'laboral';
  auxiliarDate: any = null;
  
  bsDatePickerConfig!: Partial<BsDatepickerConfig>;
  //formaFiliatorios: any;

  constructor(
    private fb: FormBuilder,
    private readonly datePipe: DatePipe,
    private readonly personalService: PersonalService,
    private localeService: BsLocaleService
  ) 
  {
      
    //configuracion de datepicker
    this.bsDatePickerConfig = Object.assign({}, 
      { isAnimated: true, 
        dateInputFormat: 'DD/MM/YYYY', 
        containerClass: 'theme-dark-blue' 
    
      });
      //configurar idioma bsDatepicker
      this.localeService.use('en');
    
    

    //formulario personal
    this.forma = this.fb.group({
       id_personal: [Validators.required],
       apellido_1: ["test",[Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       apellido_2: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_1: ["test",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       nombre_2: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_3: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       legajo: [3155,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
       destino_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       departamento_id: [3,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       division_id: [5,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       sector_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       funcion: ["", [Validators.minLength(1), Validators.maxLength(200)]],
       seccion_guardia_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       escalafon_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       escala_jerarquica_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
       grado_id: [,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       //foto: [],
       ultimo_ascenso: [],

       //campos filiatorios
       dni: [32505424,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      fecha_nacimiento: [],
      fecha_ingreso: [],
      cuil: ["20-32505424-8",[Validators.required, Validators.pattern(/\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/)]],
      sexo_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      estado_civil_id: [2,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      nacionalidad: ["argentino",[Validators.minLength(1), Validators.maxLength(50)]],
      domicilio: ["Barrio los gremios",[Validators.minLength(1), Validators.maxLength(300)]],
      provincia_id: [17,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      departamento_provincial_id: [212000,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      municipio_id: [3986,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      ciudad_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      nivel_educativo_id: [4,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      telefonos: ["0387154853487",[Validators.minLength(1), Validators.maxLength(300)]],
      email: ["pedrodiaz0487@gmail.com", [Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.minLength(4), Validators.maxLength(50)]],
      altura: [1.8],
      peso: [72.5],
      //registrado_por: [],
      situacion_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]]


    });
    //fin formulario personal


    //cargar desplegables
    this.cargarDepartamentos(parseInt(this.forma.get('destino_id')?.value));
    this.cargarDivisiones(parseInt(this.forma.get('departamento_id')?.value));
    this.cargarSectores(0);
    this.cargarSeccionesGuardia(0);
    this.cargarDepartamentosProvinciales(parseInt(this.forma.get('provincia_id')?.value));
    this.cargarMunicipios(parseInt(this.forma.get('departamento_provincial_id')?.value));
    this.cargarCiudades(parseInt(this.forma.get('municipio_id')?.value));
    this.cargarGrados(parseInt(this.forma.get('escala_jerarquica_id')?.value));
    

    this.administrador = (globalConstants.rol_usuario == "0")? true: false;

    //this.ciudades = ciudades;
    this.destinos = destinos;
    this.estados_civil = estados_civil;    
    this.escalafones = escalafon;
    this.escalas = escalaJerarquica;
    this.niveles_educativo = nivelEducativo;
    this.provincias = provincias;
    this.sexos = sexos;
    this.situaciones= situacion;
    
    //fin cargar desplegables



  }
  //fin constructor

  ngOnInit(): void {
  }


  //VALIDACIONES FORMULARIOS
  //mensajes de validaciones
  user_validation_messages = {
    //datos laborales
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
    'destino_id': [
      { type: 'required', message: 'El destino es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'departamento_id': [
      { type: 'required', message: 'El departamento es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'division_id': [
      { type: 'required', message: 'La division es requerida.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'sector_id': [
      { type: 'required', message: 'El sector es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'seccion_guardia_id': [
      { type: 'required', message: 'La seccion guardia es requerida.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'escalafon_id': [
      { type: 'required', message: 'El escalafon  es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'escala_jerarquica_id': [
      { type: 'required', message: 'La escala jerarquica es requerida.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'grado_id': [
      { type: 'required', message: 'El grado es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],

    //fin datos laborales
    //datos personales
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
    ],
    'sexo_id': [
      { type: 'required', message: 'El sexo es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'estado_civil_id': [
      { type: 'required', message: 'El estado civil es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'provincia_id': [
      { type: 'required', message: 'La provincia  es requerida.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'departamento_provincial_id': [
      { type: 'required', message: 'El departamento provincial  es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'municipio_id': [
      { type: 'required', message: 'El municipio es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'ciudad_id': [
      { type: 'required', message: 'La ciudad es requerida.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'nivel_educativo_id': [
      { type: 'required', message: 'El nivel educativo es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'situacion_id': [
      { type: 'required', message: 'La situacion educativo es requerida.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],

    //fin datos personales
  }
  //FIN mensajes de validaciones

  //validaciones formulario laborales
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
    return this.forma.get('destino_id')?.invalid && this.forma.get('destino_id')?.touched;
  }

  get departamentoNoValido(){
    return this.forma.get('departamento_id')?.invalid && this.forma.get('departamento_id')?.touched;
  }

  get divisionNoValido(){
    return this.forma.get('division_id')?.invalid && this.forma.get('division_id')?.touched;
  }  

  get sectorNoValido(){
    return this.forma.get('sector_id')?.invalid && this.forma.get('sector_id')?.touched;
  }

  get seccionGuardiaNoValido(){
    return this.forma.get('seccion_guardia_id')?.invalid && this.forma.get('seccion_guardia_id')?.touched;
  }

  get escalafonNoValido(){
    return this.forma.get('escalafon_id')?.invalid && this.forma.get('escalafon_id')?.touched;
  }

  get escalaJerarquicaNoValido(){
    return this.forma.get('escala_jerarquica_id')?.invalid && this.forma.get('escala_jerarquica_id')?.touched;
  }

  get gradoNoValido(){
    return this.forma.get('grado_id')?.invalid && this.forma.get('grado_id')?.touched;
  }

  

  //fin validaciones formulario laborales

  //validaciones formulario filatorios
  get dniNoValido(){
    return this.forma.get('dni')?.invalid && this.forma.get('dni')?.touched;
  }

  get cuilNoValido(){
    return this.forma.get('cuil')?.invalid && this.forma.get('cuil')?.touched;
  }

  get fechaNacimientoNoValido(){
    return this.forma.get('fecha_nacimiento')?.invalid && this.forma.get('fecha_nacimiento')?.touched;
  }

  get nacionalidadNoValido(){    
    return this.forma.get('nacionalidad')?.invalid && this.forma.get('nacionalidad')?.touched;
  }

  get domicilioNoValido(){    
    return this.forma.get('domicilio')?.invalid && this.forma.get('domicilio')?.touched;
  }

  get telefonosNoValido(){    
    return this.forma.get('telefonos')?.invalid && this.forma.get('telefonos')?.touched;
  }

  get emailNoValido(){    
    return this.forma.get('email')?.invalid && this.forma.get('email')?.touched;
  }  

  get sexoNoValido(){
    return this.forma.get('sexo_id')?.invalid && this.forma.get('sexo_id')?.touched;
  }

  get estadoCivilNoValido(){
    return this.forma.get('estado_civil_id')?.invalid && this.forma.get('estado_civil_id')?.touched;
  }

  get provinciaNoValido(){
    return this.forma.get('provincia_id')?.invalid && this.forma.get('provincia_id')?.touched;
  }

  get departamentoProvincialNoValido(){
    return this.forma.get('departamento_provincial_id')?.invalid && this.forma.get('departamento_provincial_id')?.touched;
  }

  get municipioNoValido(){
    return this.forma.get('municipio_id')?.invalid && this.forma.get('municipio_id')?.touched;
  }

  get ciudadNoValido(){
    return this.forma.get('ciudad_id')?.invalid && this.forma.get('ciudad_id')?.touched;
  }

  get nivelEducativoNoValido(){
    return this.forma.get('nivel_educativo_id')?.invalid && this.forma.get('nivel_educativo_id')?.touched;
  }

  get situacionNoValido(){
    return this.forma.get('situacion_id')?.invalid && this.forma.get('situacion_id')?.touched;
  }

  //fin validaciones formulario filatorios
  //FIN VALIDACIONES FORMULARIOS
  

  //metodos para cargar listas desplegables  
  onChangeDestino(){    
    const id = this.forma.get('destino_id')?.value;
    if(id != null){      
      this.cargarDepartamentos(parseInt(id.toString()));
      this.cargarDivisiones(3);
      this.cargarSectores(0);
      this.cargarSeccionesGuardia(0);
      this.forma.get('departamento_id')?.setValue(3);
      this.forma.get('division_id')?.setValue(5);
      this.forma.get('sector_id')?.setValue(1);
      this.forma.get('seccion_guardia_id')?.setValue(1);
    }else{
      Swal.fire('Error: repita la operación por favor', '', 'info')
    }   
    
  }
  
  cargarDepartamentos(destino_id: number){
    this.departamentos=departamentos.filter(departamento => {
      return departamento.destino_id == destino_id || departamento.destino_id == 0;
    });
  }

  onChangeDepartamento(){
    const id = this.forma.get('departamento_id')?.value;
    if(id != null){
      this.cargarDivisiones(parseInt(id.toString()));
      this.cargarSectores(0);
      this.cargarSeccionesGuardia(parseInt(id.toString()));
      this.forma.get('division_id')?.setValue(5);
      this.forma.get('sector_id')?.setValue(1);
      this.forma.get('seccion_guardia_id')?.setValue(1);   
    }
  }
  
  cargarDivisiones(departamento_id: number){
    this.divisiones = divisiones.filter(division => {
      
      return division.departamento_id == departamento_id || division.departamento_id == 0;
    });
  } 

  onChangeDivision(){
    const id = this.forma.get('division_id')?.value;
    if(id != null){
      this.cargarSectores(parseInt(id.toString()));
      this.forma.get('sector_id')?.setValue(1);
    }
  }
  
  cargarSectores(division_id: number){
    this.sectores = sectores.filter(sector => {
      
      return sector.division_id == division_id || sector.division_id == 0;
    });
  } 
  
  cargarSeccionesGuardia(departamento_id: number){
    this.secciones_guardia = secciones_guardia.filter(seccion_gdia => {
      
      return seccion_gdia.departamento_id == departamento_id || seccion_gdia.departamento_id == 0;
    });
  }  

  onChangeProvincia(){
    const id = this.forma.get('provincia_id')?.value;
    if(id != null){
      this.cargarDepartamentosProvinciales(parseInt(id.toString()));
      this.forma.get('departamento_provincial_id')?.setValue(212000);
      this.cargarMunicipios(212000);      
      this.forma.get('municipio_id')?.setValue(3986);
      
    }    
  }

  cargarDepartamentosProvinciales(provincia_id: number){
    this.departamentos_provinciales= departamentos_provinciales.filter(departamento_provincial => {
      
      return departamento_provincial.provincia_id == provincia_id || departamento_provincial.provincia_id == 25;
    });
  }

  onChangeDepartamentoProvincial(){
    const id = this.forma.get('departamento_provincial_id')?.value;
    if(id != null){
      this.cargarMunicipios(parseInt(id.toString()));
      this.forma.get('municipio_id')?.setValue(3986);
      
    }    
  }  
  
  cargarMunicipios(departamento_provincial_id: number){
    this.municipios=municipios.filter(municipio => {       
      return municipio.departamento_id == departamento_provincial_id || municipio.departamento_id == 212000;
    });
  }

  onChangeMunicipios(){
    const id = this.forma.get('municipio_id')?.value;
    if(id != null){
      this.cargarCiudades(parseInt(id.toString()));
      this.forma.get('ciudad_id')?.setValue(1);
    }    
  }

  cargarCiudades(municipio_id: number){
    this.ciudades= ciudades.filter(ciudad => {
      return ciudad.municipio_id == municipio_id || ciudad.municipio_id == 3986;
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
      this.forma.get('grado_id')?.setValue(null);      
      this.cargarGrados(parseInt(id.toString()));
      this.forma.get('grado_id')?.markAsUntouched();
      
    }
  }
  //fin metodos para cargar listas desplegables

  

  //metodos de formatos de fecha  
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
  //fin metodos de formatosd e fechas

  //guardar personal
  submitForm(){
    if(this.forma.invalid){
      Swal.fire('Formulario con errores','Complete correctamente todos los campos del formulario',"warning");
      return Object.values(this.forma.controls).forEach(control => control.markAsTouched());
    }
     
     let data: Personal;
     //crear la data
     
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
          seccion_guardia_id: parseInt(this.forma.get('seccion_guardia_id')?.value),
          escalafon_id: parseInt(this.forma.get('escalafon_id')?.value),
          escala_jerarquica_id: parseInt(this.forma.get('escala_jerarquica_id')?.value),
          grado_id: parseInt(this.forma.get('grado_id')?.value),
          ultimo_ascenso: this.auxiliarDate,          

          dni: parseInt(this.forma.get('dni')?.value),
          fecha_nacimiento: this.changeFormatoFechaGuardar(this.forma.get('fecha_nacimiento')?.value), 
          fecha_ingreso: this.changeFormatoFechaGuardar(this.forma.get('fecha_ingreso')?.value), 
          cuil: this.forma.get('cuil')?.value,
          sexo_id: parseInt(this.forma.get('sexo_id')?.value),
          estado_civil_id: parseInt(this.forma.get('estado_civil_id')?.value),
          nacionalidad: this.forma.get('nacionalidad')?.value,
          domicilio: this.forma.get('domicilio')?.value,
          provincia_id: parseInt(this.forma.get('provincia_id')?.value),
          departamento_provincial_id: parseInt(this.forma.get('departamento_provincial_id')?.value),
          municipio_id: parseInt(this.forma.get('municipio_id')?.value),
          ciudad_id: parseInt(this.forma.get('ciudad_id')?.value),
          nivel_educativo_id: parseInt(this.forma.get('nivel_educativo_id')?.value),
          telefonos: this.forma.get('telefonos')?.value,
          email: this.forma.get('email')?.value,
          altura: parseInt(this.forma.get('altura')?.value),
          peso: parseInt(this.forma.get('peso')?.value),
          registrado_por: globalConstants.id_usuario,
          situacion_id: parseInt(this.forma.get('situacion_id')?.value)
      }
              
      this.personalService.guardarPersonal(data)
              .subscribe(resultado => {
                
                  Swal.fire('Exito',`El Registro ha sido guardado con Exito`,"success");
                  
                  //this.actualizarUsuarios();
                  //this.hideDialog();
              },
              error => {
                  
                  Swal.fire('Error',`Error al cargar el nuevo personal: ${error.error.message}`,"error")                          
              });
  
  }

  //fin guardar personal

}
