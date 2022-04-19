import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { departamentos, departamentos_provinciales, destinos, divisiones, escalafon, escalaJerarquica, estados_civil, grados, municipios, nivelEducativo, 
         provincias, secciones_guardia, sectores, sexos, situacion, ciudades, funciones } from 'src/app/common/data-mockeada';
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
import { TrasladosService } from 'src/app/services/traslados.service';
import Swal from 'sweetalert2';
import { CiudadModel } from '../../models/ciudad.model';
import { FuncionModel } from '../../models/funcion.model';
import { TrasladoModel } from '../../models/traslado.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [
  ]
})
export class UploadComponent implements OnInit {

  //FORMULARIOS  
  forma: FormGroup;
  formaTraslados: FormGroup;

  //VARIABLES
  administrador: boolean = false;   
  nuevoPersonal: boolean = true; 
  foto_nombre: string = 'no-image.png';
  fotoSubir: File | undefined;
  modo: string = 'laboral';

  //VARIABLES AUXULIARES
  auxiliarDate: any = null;
  destino_txt: string="";
  dni_aux: number = 0;
  legajo_aux: number = 0;

  //variables de manejo de traslado
  dataTraslado: TrasladoModel= new TrasladoModel;
  listaTraslado: TrasladoModel[]=[];
  tituloFormTraslado:string = "";
  newTrasladoDialog: boolean= false;
  submitedTraslado:boolean=false;
  editandoTraslado: boolean=false;
  
  //DATEPICKER
  bsDatePickerConfig!: Partial<BsDatepickerConfig>;

  //ARRAYS DE TABLAS
  ciudades: CiudadModel[]=[];
  departamentos: DepartamentoModel[]=[];
  departamentos_provinciales: DepartamentoProvincialModel[]=[];
  destinos: DestinoModel[]=[];
  divisiones: DivisionModel[]=[];  
  escalas: EscalaJerarquicaModel[]=[];
  escalafones: EscalafonModel[]=[];
  estados_civil: EstadoCivilModel[]=[];
  funciones: FuncionModel[]=[];
  grados: GradoModel[]=[];
  municipios: MunicipioModel[]=[];
  niveles_educativo: NivelEducativoModel[]=[];
  provincias: ProvinciaModel[]=[];
  sectores: sectorModel[]=[];
  secciones_guardia: SeccionGuardia[]=[];
  sexos: SexoModel[]=[];
  situaciones: SituacionModel[]=[];
  //ciudades: CiudadModel[]=[]; 
  

  constructor(
    private fb: FormBuilder,
    private readonly datePipe: DatePipe,
    private readonly personalService: PersonalService,
    private readonly trasladoService: TrasladosService,
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
       apellido_1: ["",[Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       apellido_2: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_1: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       nombre_2: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_3: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       legajo: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
       destino_id: [8,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       departamento_id: [3,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       division_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       sector_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       funcion_id: [1, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
       seccion_guardia_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       escalafon_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       escala_jerarquica_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
       grado_id: [13,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       //foto: [],
       ultimo_ascenso: [],

       //campos filiatorios
       dni: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      fecha_nacimiento: [],
      fecha_ingreso: [],
      cuil: ["",[Validators.required, Validators.pattern(/\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/)]],
      sexo_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      estado_civil_id: [2,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      nacionalidad: ["",[Validators.minLength(1), Validators.maxLength(50)]],
      domicilio: ["",[Validators.required,Validators.minLength(1), Validators.maxLength(300)]],
      provincia_id: [17,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      departamento_provincial_id: [212000,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      municipio_id: [3986,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      ciudad_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      nivel_educativo_id: [4,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      telefonos: ["",[Validators.required,Validators.minLength(1), Validators.maxLength(300)]],
      email: ["", [Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.minLength(4), Validators.maxLength(50)]],
      altura: [,[Validators.pattern(/^\d+(\.\d{1,2})$/), Validators.min(1), Validators.max(3)]],
      peso: [,[Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(20), Validators.max(400)]],
      grupo_sanguineo: [,[Validators.required,Validators.minLength(2), Validators.maxLength(15)]],
      
      //registrado_por: [],
      situacion_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]]


    });
    //fin formulario personal...............................................................................................

    //FORMULARIO TRASLADO    
    this.formaTraslados = this.fb.group({
      id_traslado: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      //id_traslado: [this.dataTraslado.id_traslado,Validators.required],
      dni_personal: [this.dni_aux,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      legajo: [this.legajo_aux,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
      destino_id: [8,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      fecha: [,[Validators.required]],
      instrumento: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      fojas: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      vigente: [true, [Validators.required]],
      confirmado: [false, [Validators.required]]
    });
    //FIN FORMULARIO TRASLADO........................................................................................................


    //cargar desplegables
    this.cargarDepartamentos(parseInt(this.forma.get('destino_id')?.value));
    this.cargarDivisiones(parseInt(this.forma.get('destino_id')?.value), parseInt(this.forma.get('departamento_id')?.value));
    this.cargarSectores(parseInt(this.forma.get('destino_id')?.value), parseInt(this.forma.get('departamento_id')?.value),parseInt(this.forma.get('division_id')?.value));
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
    this.funciones = funciones;
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
    'funcion_id': [
      { type: 'required', message: 'El destino es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
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
    'situacion_id': [
      { type: 'required', message: 'La situacion educativo es requerida.'},
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
      { type: 'required', message: 'El domicilio es requerido.'},
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 300.'}
    ],
    'telefonos': [
      { type: 'required', message: 'El telefono es requerido.'},
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 300.'}
    ],
    'email': [
      { type: 'required', message: 'El email es requerido.'},
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
    
    'altura': [

      { type: 'min', message: 'El número ingresado es bajo.(minimo: 1)' },
      { type: 'max', message: 'El número ingresado es alto (maximo: 3).'},
      { type: 'pattern', message: 'El valor ingresado no es un número correcto (use el punto (.) como separador decimal y hasta dos decimales).' }
    ],
    'peso': [
      { type: 'min', message: 'El número ingresado es bajo.(minimo: 20)' },
      { type: 'max', message: 'El número ingresado es alto (maximo: 400).'},
      { type: 'pattern', message: 'El valor ingresado no es un número correcto (use el punto (.) como separador decimal y hasta dos decimales).' }
    ],
    'grupo_sanguineo': [
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 15.'}
    ]

    //fin datos personales   


  }
  //FIN mensajes de validaciones

  //validaciones traslados
  traslado_validation_messages = {
    
    'dni_personal': [
      { type: 'required', message: 'El dni es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' },
      { type: 'min', message: 'El número ingresado es bajo.(minimo: 1000000)' },
      { type: 'max', message: 'El número ingresado es alto (maximo: 99000000).'} 
    ],
    'legajo': [
      { type: 'required', message: 'El legajo es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' },
      { type: 'min', message: 'El número ingresado es bajo.(minimo: 1)' },
      { type: 'max', message: 'El número ingresado es alto (maximo: 500000).'} 
    ],
    'destino_id': [
      { type: 'required', message: 'El destino es requerido.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    ],
    'fecha': [
      { type: 'required', message: 'La Fecha es requerida' }
      
    ],
    'instrumento': [
      { type: 'required', message: 'El instrumento es requerido' },
      { type: 'pattern', message: 'Solo se pueden ingresar letras, nùmeros, espacios, puntos y barra diagonal(/).' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 100.' }
    ],
    'fojas': [
      { type: 'required', message: 'La cantidad de foja es requerida.'},
      { type: 'pattern', message: 'El valor ingresado no es un número.' }
    
    ],
    'vigente': [
      { type: 'required', message: 'El vigente es requerido.'}
    ]
  }
  //fin validaciones traslados

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
    return this.forma.get('funcion_id')?.invalid && this.forma.get('funcion_id')?.touched;
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

  get situacionNoValido(){
    return this.forma.get('situacion_id')?.invalid && this.forma.get('situacion_id')?.touched;
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

  get alturaNoValido(){
    return this.forma.get('altura')?.invalid && this.forma.get('altura')?.touched;
  }

  get pesoNoValido(){
    return this.forma.get('peso')?.invalid && this.forma.get('peso')?.touched;
  }

  get grupoSanguineoNoValido(){
    return this.forma.get('grupo_sanguineo')?.invalid && this.forma.get('grupo_sanguineo')?.touched;
  } 

  //fin validaciones formulario filatorios

  //VALIDACIONES 2 FORMULARIO TRASLADO
  get dniTrasNoValido(){
    return this.formaTraslados.get('dni_personal')?.invalid && this.formaTraslados.get('dni_personal')?.touched;
  }
    
  get legajoTrasNoValido(){
    return this.formaTraslados.get('legajo')?.invalid && this.formaTraslados.get('legajo')?.touched;
  }

  get destinoTrasNoValido(){
    return this.formaTraslados.get('destino_id')?.invalid && this.formaTraslados.get('destino_id')?.touched;
  }

  get fechaTrasNoValido(){
    return this.formaTraslados.get('fecha')?.invalid && this.formaTraslados.get('fecha')?.touched;
  }

  get instrumentoTrasNoValido(){
    return this.formaTraslados.get('instrumento')?.invalid && this.formaTraslados.get('instrumento')?.touched;
  }

  get fojasTrasNoValido(){
    return this.formaTraslados.get('fojas')?.invalid && this.formaTraslados.get('fojas')?.touched;
  }

  get vigenteTrasNoValido(){
    return this.formaTraslados.get('vigente')?.invalid && this.formaTraslados.get('vigente')?.touched;
  }
  //FIN VALIDACIONES 2 FORMULARIO TRASLADO
  //FIN VALIDACIONES FORMULARIOS
  

  //metodos para cargar listas desplegables  
  onChangeDestino(){    
    const id = this.forma.get('destino_id')?.value;
    if(id != null){      
      this.cargarDepartamentos(parseInt(id.toString()));
      this.cargarDivisiones(parseInt(id.toString()),3);
      this.cargarSectores(id,3,1);
      this.cargarSeccionesGuardia(0);
      this.forma.get('departamento_id')?.setValue(3);
      this.forma.get('division_id')?.setValue(1);
      this.forma.get('sector_id')?.setValue(1);
      this.forma.get('seccion_guardia_id')?.setValue(1);
      this.forma.get('funcion_id')?.setValue(1);
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
    const id_destino_aux = this.forma.get('destino_id')?.value;
    const id_departamento_aux = this.forma.get('departamento_id')?.value;
    const id_sector_aux = this.forma.get('sector_id')?.value;
    if(id_departamento_aux != null && id_destino_aux!= null){
      this.cargarDivisiones(parseInt(id_destino_aux.toString()), parseInt(id_departamento_aux.toString()));
      this.cargarSectores(parseInt(id_destino_aux.toString()), parseInt(id_departamento_aux.toString()),1);      
      this.cargarSeccionesGuardia(1);
      this.forma.get('division_id')?.setValue(1);
      this.forma.get('sector_id')?.setValue(1);
      this.forma.get('seccion_guardia_id')?.setValue(1);  
      this.forma.get('funcion_id')?.setValue(1);
    }
  }
  
  cargarDivisiones(destino_id: number,departamento_id: number){
    this.divisiones = divisiones.filter(division => {
      
      if(departamento_id == 3){
        return (division.destino_id == destino_id || division.destino_id == 0) && (division.departamento_id == 3 || division.departamento_id == 0);
      }
      else{
        return division.departamento_id == departamento_id || division.departamento_id == 0;
      }
      
    });
  } 

  onChangeDivision(){
    const id_destino_aux = this.forma.get('destino_id')?.value;
    const id_departamento_aux = this.forma.get('departamento_id')?.value;
    const id = this.forma.get('division_id')?.value;
    if(id != null){
      this.cargarSectores(parseInt(id_destino_aux.toString()),parseInt(id_departamento_aux.toString()),parseInt(id.toString()));
      this.cargarSeccionesGuardia(1);
      this.forma.get('sector_id')?.setValue(1);
      this.forma.get('seccion_guardia_id')?.setValue(1);  
      this.forma.get('funcion_id')?.setValue(1);
    }
  }
  
  cargarSectores(destino_id: number,departamento_id: number,division_id: number){
    this.sectores = sectores.filter(sector => {
      if(division_id == 1){
        if(departamento_id == 3){
          return (sector.destino_id == destino_id || sector.destino_id == 0 )&& (sector.departamento_id ==3 || sector.departamento_id== 0) && (sector.division_id == 1 || sector.division_id == 0);
        }
        else{
          return (sector.departamento_id == departamento_id || sector.departamento_id == 0) && (sector.division_id == 1 || sector.division_id == 0);
        }
        
      }
      else{
        return sector.division_id == division_id || sector.division_id == 0;
      }
      
    });
  } 

  onChangeSector(){
    
    const id_sector_aux = this.forma.get('sector_id')?.value;
    if(id_sector_aux != null){
      this.cargarSeccionesGuardia(parseInt(id_sector_aux.toString()));
      this.forma.get('seccion_guardia_id')?.setValue(1);  
      this.forma.get('funcion_id')?.setValue(1);
    }
  }
  
  cargarSeccionesGuardia(sector_id: number){
    this.secciones_guardia = secciones_guardia.filter(seccion_gdia => {
      
      return seccion_gdia.sector_id == sector_id || seccion_gdia.sector_id == 0;
    });
  }  

  onChangeSeccionesGuardia(){
    this.forma.get('funcion_id')?.setValue(1);
    
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
      if(id==1){
        this.forma.get('grado_id')?.setValue(13); 
      }   
      if(id==2){
        this.forma.get('grado_id')?.setValue(1); 
      }     
         
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
     let data_destino: TrasladoModel;
     //crear la data
     
      data = {
          legajo: parseInt(this.forma.get('legajo')?.value),
          apellido_1: this.primeraMayuscula(this.forma.get('apellido_1')?.value),
          apellido_2: this.primeraMayuscula(this.forma.get('apellido_2')?.value),
          nombre_1: this.primeraMayuscula(this.forma.get('nombre_1')?.value),
          nombre_2: this.primeraMayuscula(this.forma.get('nombre_2')?.value),
          nombre_3: this.primeraMayuscula(this.forma.get('nombre_3')?.value),
          // destino_id: parseInt(this.forma.get('destino_id')?.value),
          // departamento_id: parseInt(this.forma.get('departamento_id')?.value),
          // division_id: parseInt(this.forma.get('division_id')?.value),
          // sector_id: parseInt(this.forma.get('sector_id')?.value),
          // seccion_guardia_id: parseInt(this.forma.get('seccion_guardia_id')?.value),
          // funcion_id: parseInt(this.forma.get('funcion_id')?.value),
          destino_id: 8,
          departamento_id: 3,
          division_id: 1,
          sector_id: 1,
          seccion_guardia_id: 1,
          funcion_id: 1,
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
          grupo_sanguineo: this.forma.get('grupo_sanguineo')?.value,
          registrado_por: globalConstants.id_usuario,
          situacion_id: parseInt(this.forma.get('situacion_id')?.value)
      }
      
      

      console.log("dni_Aux", this.dni_aux);
                    
      this.personalService.guardarPersonal(data)
              .subscribe(resultado => {
                
                  Swal.fire('Exito',`El Registro ha sido guardado con Exito`,"success");
                  //guardar variable auxiliar
                  this.dni_aux = parseInt(this.forma.get('dni')?.value);
                  this.legajo_aux = parseInt(this.forma.get('legajo')?.value);
                  this.nuevoPersonal=false;

                  //this.limpiarFormulario();
              },
              error => {
                  
                  Swal.fire('Error',`Error al cargar el nuevo personal: ${error.error.message}`,"error")                          
              });
  
  }

  //fin guardar personal..............................................................................

  //GUARDAR TRASLADO  
  submitFormTraslado(){
    if(this.formaTraslados.invalid){
      Swal.fire('Formulario Traslado con errores','Complete correctamente todos los campos del formulario',"warning");
      return Object.values(this.formaTraslados.controls).forEach(control => control.markAsTouched());
    }

    let data: TrasladoModel;
     //poner destino en el personal y sin funcion 
      //this.submitForm('cambioDestino');

      data = {

        legajo: parseInt(this.formaTraslados.get('legajo')?.value),
        dni_personal: parseInt(this.formaTraslados.get('dni_personal')?.value),
        destino_id: parseInt(this.formaTraslados.get('destino_id')?.value),
        instrumento: this.formaTraslados.get('instrumento')?.value,
        fecha: this.changeFormatoFechaGuardar(this.formaTraslados.get('fecha')?.value),
        fojas: parseInt(this.formaTraslados.get('fojas')?.value),
        vigente: this.formaTraslados.get('vigente')?.value,
        confirmado: this.formaTraslados.get('confirmado')?.value,
      }      
        
      //GUARDAR NUEVO TRASLADO
      this.trasladoService.guardarTraslado(data)
      .subscribe(resultado => {
        
        Swal.fire('Nuevo traslado',`El Traslado ha sido guardado con exito`,"success");
        //this.buscarPersonal(data.legajo!);
        this.ocultarDialogoTraslado();            
      },
      error => {
          
          Swal.fire('Nuevo traslado',`Error al guardar el Traslado: ${error.error.message}`,"error")                          
      });
      //FIN GUARDAR NUEVO TRASLADO        
        
            
      
  }
  //FIN GUARDAR TRASLADO

  //ABRIR FORMULARIO NUEVO TRASLADO
  crearTraslado(){
    this.tituloFormTraslado="Nuevo Registro de Traslado"
    this.formaTraslados.get('dni_personal')?.setValue(this.dni_aux);
    this.formaTraslados.get('legajo')?.setValue(this.legajo_aux);
    this.newTrasladoDialog = true;
  }
  //FIN ABRIR FORMULARIO NUEVO TRASLADO

  //OCULTAR FORMULARIO TRASLADO
  ocultarDialogoTraslado(){
    this.limpiarFormularioTraslado();
    this.newTrasladoDialog = false
  }  
  //FIN OCULTAR FORMULARIO TRASLADO............................................

  //LIMPIAR FORMULARIO TRASLADO
  limpiarFormularioTraslado(){
    this.formaTraslados.get('id_traslado')?.setValue(0);
    this.formaTraslados.get('destino_id')?.setValue(8); 
    this.formaTraslados.get('instrumento')?.setValue(""); 
    this.formaTraslados.get('fecha')?.setValue(""); 
    this.formaTraslados.get('fojas')?.setValue(0);
    this.formaTraslados.get('vigente')?.setValue(true);

    return Object.values(this.formaTraslados.controls).forEach(control => control.markAsUntouched());
  }
  //FIN LIMPIAR FORMULARIO TRASLADO
  //..................................................................................................


  //CAMBIAR NOMBRES Y APELLIDOS PRIMERA LETRA A MAYUSCULA
  private primeraMayuscula(palabra: string){
    if (!palabra) return palabra;
    return palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();

  }
  //FIN CAMBIAR NOMBRES Y APELLIDOS PRIMERA LETRA A MAYUSCULA.............................


  //limpiar formulario
  limpiarFormulario() {
    //console.log("clear clicked")
    //this.forma.reset();
    //formulario personal
    this.forma = this.fb.group({
      id_personal: [Validators.required],
       apellido_1: ["",[Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       apellido_2: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_1: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       nombre_2: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_3: ["",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       legajo: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
       destino_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       departamento_id: [3,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       division_id: [5,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       sector_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       funcion: ["", [Validators.minLength(1), Validators.maxLength(200)]],
       seccion_guardia_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       escalafon_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       escala_jerarquica_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
       grado_id: [13,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       //foto: [],
       ultimo_ascenso: [],

       //campos filiatorios
       dni: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      fecha_nacimiento: [],
      fecha_ingreso: [],
      cuil: ["",[Validators.required, Validators.pattern(/\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/)]],
      sexo_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      estado_civil_id: [2,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      nacionalidad: ["",[Validators.minLength(1), Validators.maxLength(50)]],
      domicilio: ["",[Validators.required,Validators.minLength(1), Validators.maxLength(300)]],
      provincia_id: [17,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      departamento_provincial_id: [212000,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      municipio_id: [3986,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      ciudad_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      nivel_educativo_id: [4,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      telefonos: ["",Validators.required,[Validators.minLength(1), Validators.maxLength(300)]],
      email: ["", [Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.minLength(4), Validators.maxLength(50)]],
      altura: [,[Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      peso: [,[Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      //registrado_por: [],
      situacion_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]]


   });
   //fin formulario personal
    
   this.nuevoPersonal=true;

  }
  //fin limpiar formulario

}
