import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Personal } from 'src/app/models/personal.model';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinoModel } from '../../models/destino.model';
import { destinos, departamentos, departamentos_provinciales, divisiones, estados_civil, municipios, nivelEducativo, sectores, secciones_guardia, situacion, escalaJerarquica, escalafon, grados, sexos, provincias, ciudades, funciones} from 'src/app/common/data-mockeada';
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

import { NgxPrintModule } from 'ngx-print' ;

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
import { Cell, Columns, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { FuncionModel } from 'src/app/models/funcion.model';
import { TrasladoModel } from '../../models/traslado.model';
import { TrasladosService } from '../../services/traslados.service';
import { PersonalFuncionModel } from '../../models/personal_funcion.model';
import { PersonalFuncionService } from '../../services/personal-funcion.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
     './edit.component.css'
  ]
})
export class EditComponent implements OnInit {
  base_url:string = environment.URL_BASE;
  
  @ViewChild('printCredencial2')
  printCredencial2!: ElementRef;
  
  
  forma: FormGroup;
  formaFiliatorios: FormGroup;
  formaTraslados: FormGroup;
  formaFuncion: FormGroup;
  dataEdit: Personal={};
  
  
  totalRecords: number = 0;
  pdfsList: PdfModel[] = [];
  loadingTablaPdfs: boolean = false;
  nombreCompleto: string="";

  administrador: boolean = false;
  destino_txt: string="";
  departamento_txt: string="";
  division_txt: string="";
  sector_txt: string="";
  seccion_guardia_txt: string="";
  funcion_txt: string="";  
  grado_txt: string=""; 
  escalafon_txt: string="";
  
  
  //variables de manejo de pdf
  tituloFormPdf:string="";
  newFileDialog: boolean = false;
  editandoPdf: boolean=false;
  url_pdf: string = "";
  regPdf: Partial<PdfModel> = new PdfModel();
  submitted: boolean = false;
  baseUrlPdf: string = `${this.base_url}/archivo/pdf`;

  //variables de manejo de traslado
  dataTraslado: TrasladoModel= new TrasladoModel;
  listaTraslado: TrasladoModel[]=[];
  tituloFormTraslado:string = "";
  newTrasladoDialog: boolean= false;
  submitedTraslado:boolean=false;
  editandoTraslado: boolean=false;

  //variables de manejo de funcion
  dataFuncion: PersonalFuncionModel= new TrasladoModel;
  listaFunciones: PersonalFuncionModel[]=[];
  tituloFormFuncion:string = "";
  confirmarTraslado: string ="";
  newFuncionDialog: boolean= false;
  submitedFuncion:boolean=false;
  editandoFuncion: boolean=false;
  

  //manejo de forumulario de personal
  departamentos: DepartamentoModel[]=[];
  departamentos_provincial: DepartamentoProvincialModel[]=[];
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
    private readonly trasladoService: TrasladosService,
    private readonly personalFuncionService: PersonalFuncionService,
    public readonly datePipe: DatePipe,
    private localeService: BsLocaleService,
    private pdfService: PdfService
  ) {
    this.dataEdit= dataService.personalData;
    this.regPdf.legajo_personal = this.dataEdit.legajo!;  

    //cambiar formato de fechas para mostrarlas en datepicker
    this.formatoFechasMostrar();

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
       apellido_1: [this.dataEdit.apellido_1,[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       apellido_2: [this.dataEdit.apellido_2,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_1: [this.dataEdit.nombre_1,[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       nombre_2: [this.dataEdit.nombre_2,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_3: [this.dataEdit.nombre_3,[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       legajo: [this.dataEdit.legajo,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
       escalafon_id: [this.dataEdit.escalafon_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       escala_jerarquica_id: [this.dataEdit.escala_jerarquica_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       grado_id: [this.dataEdit.grado_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
       foto: [this.dataEdit.foto],
       fecha_ingreso: [this.dataEdit.fecha_ingreso, ],
       ultimo_ascenso: [this.dataEdit.ultimo_ascenso],
      //  fecha_nacimiento:[this.dataEdit.fecha_nacimiento],
    });

  

    //FORMULARIO DATOS FILIATORIOS
    this.formaFiliatorios = this.fb.group({   
      dni: [this.dataEdit.dni,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      fecha_nacimiento: [this.dataEdit.fecha_nacimiento,[Validators.required]],
      
      cuil: [this.dataEdit.cuil,[Validators.required, Validators.pattern(/\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/)]],
      sexo_id: [this.dataEdit.sexo_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      estado_civil_id: [this.dataEdit.estado_civil_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      nacionalidad: [this.dataEdit.nacionalidad,[Validators.minLength(1), Validators.maxLength(50)]],
      domicilio: [this.dataEdit.domicilio,[Validators.required,Validators.minLength(1), Validators.maxLength(300)]],
      provincia_id: [this.dataEdit.provincia_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      departamento_provincial_id: [this.dataEdit.departamento_provincial_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      municipio_id: [this.dataEdit.municipio_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      ciudad_id: [this.dataEdit.ciudad_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      nivel_educativo_id: [this.dataEdit.nivel_educativo_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      telefonos: [this.dataEdit.telefonos,[Validators.required,Validators.minLength(1), Validators.maxLength(300)]],
      email: [this.dataEdit.email,[Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.minLength(4), Validators.maxLength(50)]],
      altura: [this.dataEdit.altura,[Validators.pattern(/^\d+(\.\d{1,2})$/), Validators.min(1), Validators.max(3)]],
      peso: [this.dataEdit.peso,[Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(20), Validators.max(400)]],
      registrado_por: [this.dataEdit.registrado_por],
      situacion_id: [this.dataEdit.situacion_id,[Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
    //FIN FORMULARIO DATOS FILIATORIOS

    //FORMULARIO TRASLADO    
    this.formaTraslados = this.fb.group({
      id_traslado: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      //id_traslado: [this.dataTraslado.id_traslado,Validators.required],
      dni_personal: [this.dataEdit.dni,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      legajo: [this.dataEdit.legajo,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
      destino_id: [8,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      fecha: [,[Validators.required]],
      instrumento: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      fojas: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      vigente: [true, [Validators.required]],
      confirmado: [false, [Validators.required]]
    });
    //FIN FORMULARIO TRASLADO

    //FORMULARIO FUNCION    
    this.formaFuncion = this.fb.group({
      id_personal_funcion: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      legajo: [this.dataEdit.legajo,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
      destino_id: [8,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      departamento_id: [3,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      division_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      sector_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      funcion_id: [1, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      seccion_guardia_id: [1,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      fecha: [,[Validators.required]],
      instrumento: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      fojas: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      vigente: [true, [Validators.required]]
    });
    //FIN FORMULARIO FUNCION

   
    let auxiliar: any;
    
    //establecer nombre completo del personal
    this.nombreCompletoPersonal();
    
    //analizar si es administrador o no
    this.administrador = (globalConstants.rol_usuario == "0")? true: false;
    this.deshabilitarCampos(this.administrador);
    auxiliar = this.dataEdit.destino;    

    this.cargarDepartamentos(this.dataEdit.destino_id!);       
    this.cargarDivisiones(this.dataEdit.destino_id!,3);
    this.cargarSectores(this.dataEdit.destino_id!,3,1);      
    this.cargarSeccionesGuardia(this.dataEdit.sector_id!);
    
    this.cargarDepartamentosProvinciales(this.dataEdit.provincia_id!)    
    this.cargarMunicipios(this.dataEdit.departamento_provincial_id!);
    this.cargarCiudades(this.dataEdit.municipio_id!);
    this.cargarGrados(this.dataEdit.escala_jerarquica_id!);
    
    
    
    //Datos de destino
    this.destino_txt= (this.dataEdit.destino)?(JSON.parse(JSON.stringify(this.dataEdit.destino))).destino:"sin destino";
    this.departamento_txt= (this.dataEdit.departamento)?(JSON.parse(JSON.stringify(this.dataEdit.departamento))).departamento:"sin departamento",
    this.division_txt= (this.dataEdit.division)?(JSON.parse(JSON.stringify(this.dataEdit.division))).division:"sin división";
    this.sector_txt= (this.dataEdit.sector)?(JSON.parse(JSON.stringify(this.dataEdit.sector))).sector:"sin sector";
    this.seccion_guardia_txt= (this.dataEdit.seccion_guardia)?(JSON.parse(JSON.stringify(this.dataEdit.seccion_guardia))).seccion:"sin sección guardia";
    this.funcion_txt= (this.dataEdit.funcion)?(JSON.parse(JSON.stringify(this.dataEdit.funcion))).funcion:"sin sector"; 
    this.grado_txt= (this.dataEdit.grado)?(JSON.parse(JSON.stringify(this.dataEdit.grado))).grado:"sin sector"; 
    this.escalafon_txt= (this.dataEdit.escalafon)?(JSON.parse(JSON.stringify(this.dataEdit.escalafon))).escalafon:"sin sector"; 
      
    //cargar los arrays
    this.destinos = destinos;      
    this.estados_civil = estados_civil;    
    this.escalafones = escalafon;
    this.escalas = escalaJerarquica;
    this.funciones = funciones;
    this.niveles_educativo = nivelEducativo;
    this.provincias = provincias;
    this.sexos = sexos;
    this.situaciones= situacion;

    if(this.dataEdit.foto){
      if(this.dataEdit.foto?.toString() != "no-image.png"){
        this.foto_nombre = this.dataEdit.foto?.toString();
      }
      else{
        this.foto_nombre = "./assets/img/no-image.jpg";
      }     

    }

    

  }
  //fin constructor...............................................................


  ngOnInit(): void {
       
    }  

  // async descargarPdf(url: string){
  //   console.log('LA URL ES: ', url);
  //   await  this.pdfService.getPdf(url).then();   
  // }
  
  

  //VALIDACIONES FORMULARIOS
  //mensajes de validaciones LABORALES Y FILIATORIOS
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
    'funcion_id': [
      { type: 'required', message: 'El destino es requerido.'},
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
    'situacion_id': [
      { type: 'required', message: 'La situacion educativo es requerida.'},
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
    ]

    //fin Formulario datos personales
  }
  //FIN /mensajes de validaciones LABORALES Y FILIATORIOS

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
  
  //validaciones traslados
  funcion_validation_messages = {
    
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
    'funcion_id': [
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
  
  //FIN VALIDACIONES FORMULARIOS................................................................................

  //VALIDACION 2 DATOS LABORALES
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

  get destinoNoValido(){
    return this.forma.get('destino_id')?.invalid && this.forma.get('destino_1')?.touched;
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

  get funcionNoValido(){    
    return this.forma.get('funcion_id')?.invalid && this.forma.get('funcion_id')?.touched;
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

  //FIN VALIDACION 2 DATOS LABORALES

  //VALIDACION 2 FORMULARIOS FLIATORIOS
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

  get sexoNoValido(){
    return this.formaFiliatorios.get('sexo_id')?.invalid && this.formaFiliatorios.get('sexo_id')?.touched;
  }

  get estadoCivilNoValido(){
    return this.formaFiliatorios.get('estado_civil_id')?.invalid && this.formaFiliatorios.get('estado_civil_id')?.touched;
  }

  get provinciaNoValido(){
    return this.formaFiliatorios.get('provincia_id')?.invalid && this.formaFiliatorios.get('provincia_id')?.touched;
  }

  get departamentoProvincialNoValido(){
    return this.formaFiliatorios.get('departamento_provincial_id')?.invalid && this.formaFiliatorios.get('departamento_provincial_id')?.touched;
  }

  get municipioNoValido(){
    return this.formaFiliatorios.get('municipio_id')?.invalid && this.formaFiliatorios.get('municipio_id')?.touched;
  }

  get ciudadNoValido(){
    return this.formaFiliatorios.get('ciudad_id')?.invalid && this.formaFiliatorios.get('ciudad_id')?.touched;
  }

  get nivelEducativoNoValido(){
    return this.formaFiliatorios.get('nivel_educativo_id')?.invalid && this.formaFiliatorios.get('nivel_educativo_id')?.touched;
  }

  get situacionNoValido(){
    return this.formaFiliatorios.get('situacion_id')?.invalid && this.formaFiliatorios.get('situacion_id')?.touched;
  }

  get alturaNoValido(){
    return this.formaFiliatorios.get('altura')?.invalid && this.formaFiliatorios.get('altura')?.touched;
  }

  get pesoNoValido(){
    return this.formaFiliatorios.get('peso')?.invalid && this.formaFiliatorios.get('peso')?.touched;
  }  
  //FIN VALIDACION 2 FORMULARIOS FILIATORIOS

  
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

  //VALIDACIONES 2 FORMULARIO FUNCION     
  get legajoFuncionNoValido(){
    return this.formaFuncion.get('legajo')?.invalid && this.formaFuncion.get('legajo')?.touched;
  }

  get destinoFuncionNoValido(){
    return this.formaFuncion.get('destino_id')?.invalid && this.formaFuncion.get('destino_id')?.touched;
  }

  get depatamentoFuncionNoValido(){
    return this.formaFuncion.get('departamento_id')?.invalid && this.formaFuncion.get('departamento_id')?.touched;
  }

  get divisionFuncionNoValido(){
    return this.formaFuncion.get('division_id')?.invalid && this.formaFuncion.get('division_id')?.touched;
  }

  get sectorFuncionNoValido(){
    return this.formaFuncion.get('sector_id')?.invalid && this.formaFuncion.get('sector_id')?.touched;
  }

  get funcionFuncionNoValido(){
    return this.formaFuncion.get('funcion_id')?.invalid && this.formaFuncion.get('funcion_id')?.touched;
  }

  get seccionGuardiaFuncionNoValido(){
    return this.formaFuncion.get('seccion_guardia_id')?.invalid && this.formaFuncion.get('seccion_guardia_id')?.touched;
  }

  get fechaFuncionNoValido(){
    return this.formaFuncion.get('fecha')?.invalid && this.formaFuncion.get('fecha')?.touched;
  }

  get instrumentoFuncionNoValido(){
    return this.formaFuncion.get('instrumento')?.invalid && this.formaFuncion.get('instrumento')?.touched;
  }

  get fojasFuncionNoValido(){
    return this.formaFuncion.get('fojas')?.invalid && this.formaFuncion.get('fojas')?.touched;
  }

  get vigenteFuncionNoValido(){
    return this.formaFuncion.get('vigente')?.invalid && this.formaFuncion.get('vigente')?.touched;
  }
  //FIN VALIDACIONES 2 FORMULARIO FUNCION


  
  //metodos para cargar listas desplegables  
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
        const id = this.formaFuncion.get('destino_id')?.value;
        if(id != null){
          this.cargarDepartamentos(parseInt(id.toString()));
          this.cargarDivisiones(parseInt(id.toString()),3);
          this.cargarSectores(id,3,1);
          this.cargarSeccionesGuardia(0);
          this.formaFuncion.get('departamento_id')?.setValue(3);
          this.formaFuncion.get('division_id')?.setValue(1);
          this.formaFuncion.get('sector_id')?.setValue(1);
          this.formaFuncion.get('seccion_guardia_id')?.setValue(1);
          this.formaFuncion.get('funcion_id')?.setValue(1);
              
        }else{
          Swal.fire('Error: repita la operación por favor', '', 'info')
        }
        Swal.fire('Exito!', '', 'success')
      } else if (result.isDenied) {
        this.formaFuncion.get('destino_id')?.setValue(this.dataEdit.destino_id);
        Swal.fire('Usted ha cancelado el cambio de destino', '', 'info')
      }
    })    
  }

  cargarDepartamentos(destino_id: number){
    this.departamentos=departamentos.filter(departamento => {       
      return departamento.destino_id == destino_id || departamento.destino_id == 0;
    });
  }

  onChangeDepartamento(){
    const id_destino_aux = this.formaFuncion.get('destino_id')?.value;
    const id_departamento_aux = this.formaFuncion.get('departamento_id')?.value;
    if(id_departamento_aux != null && id_destino_aux!= null){
      this.cargarDivisiones(parseInt(id_destino_aux.toString()), parseInt(id_departamento_aux.toString()));
      this.cargarSectores(parseInt(id_destino_aux.toString()), parseInt(id_departamento_aux.toString()),1);      
      this.cargarSeccionesGuardia(1);
      this.formaFuncion.get('division_id')?.setValue(1);
      this.formaFuncion.get('sector_id')?.setValue(1);
      this.formaFuncion.get('seccion_guardia_id')?.setValue(1);
      this.formaFuncion.get('funcion_id')?.setValue(1);  
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
    const id_destino_aux = this.formaFuncion.get('destino_id')?.value;
    const id_departamento_aux = this.formaFuncion.get('departamento_id')?.value;
    const id_division_aux = this.formaFuncion.get('division_id')?.value;
    if(id_division_aux != null){
      this.cargarSectores(parseInt(id_destino_aux.toString()),parseInt(id_departamento_aux.toString()),parseInt(id_division_aux.toString()));
      this.cargarSeccionesGuardia(1);
      this.formaFuncion.get('sector_id')?.setValue(1);
      this.formaFuncion.get('seccion_guardia_id')?.setValue(1);  
      this.formaFuncion.get('funcion_id')?.setValue(1);
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
    
    const id_sector_aux = this.formaFuncion.get('sector_id')?.value;
    if(id_sector_aux != null){
      this.cargarSeccionesGuardia(parseInt(id_sector_aux.toString()));
      this.formaFuncion.get('seccion_guardia_id')?.setValue(1);  
      this.formaFuncion.get('funcion_id')?.setValue(1);
    }
  }

  cargarSeccionesGuardia(sector_id: number){
    this.secciones_guardia = secciones_guardia.filter(seccion_gdia => {
      
      return seccion_gdia.sector_id == sector_id || seccion_gdia.sector_id == 0;
    });
  }  

  onChangeSeccionesGuardia(){
    this.formaFuncion.get('funcion_id')?.setValue(1);
    
  }
  
  
  onChangeProvincia(){
    const id = this.formaFiliatorios.get('provincia_id')?.value;
    if(id != null){
      this.cargarDepartamentosProvinciales(parseInt(id.toString()));
      this.formaFiliatorios.get('departamento_provincial_id')?.setValue(212000);
      this.cargarMunicipios(212000);      
      this.formaFiliatorios.get('municipio_id')?.setValue(3986);           
    }    
  }

  cargarDepartamentosProvinciales(provincia_id: number){
    this.departamentos_provincial=departamentos_provinciales.filter(departamento_provincial => {      
      return departamento_provincial.provincia_id == provincia_id || departamento_provincial.provincia_id == 25;
    });
  }

  onChangeDepartamentoProvincial(){
    const id = this.formaFiliatorios.get('departamento_provincial_id')?.value;
    if(id != null){
      this.cargarMunicipios(parseInt(id.toString()));
      this.formaFiliatorios.get('municipio_id')?.setValue(3986);
           
    }    
  }

  cargarMunicipios(departamento_provincial_id: number){
    this.municipios=municipios.filter(municipio => {
      return municipio.departamento_id == departamento_provincial_id || municipio.departamento_id == 212000;
    });
  }  

  onChangeMunicipios(){
    const id = this.formaFiliatorios.get('municipio_id')?.value;
    if(id != null){
      this.cargarCiudades(parseInt(id.toString()));
      this.formaFiliatorios.get('ciudad_id')?.setValue(1);
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
  //Fin metodos para cargar listas desplegables  

  //guardar imagen
  onUpload(event: File){
    try {
      console.log('DATA DEL ARCHIVO', event);
      this.fotoSubir = event;
      let id: number =  this.dataEdit.id_personal! ;
      this.fileUploadService.actualizarFotoPersonal(this.fotoSubir, id).then((respuesta: any) => {
        if(respuesta.ok){
          Swal.fire('Actualización Exitosa!!', "La foto del Usuario ha sido cambiada con éxito","success");
          this.buscarPersonal(this.dataEdit.legajo!)
        }else{
          throw new Error('Error al Actualizar la foto');
        }
      }).catch(error => {
        Swal.fire('Error', error.message, "error"); 
      });
        
    } catch (error: any) {
        
      Swal.fire('Error', error.message, "error");    
    }
  }
  //Fin guardar imagen..................................

  
  
  //enviar formulario
  submitForm(formEnviado:string){
    
    let data: Partial<Personal>= new Personal;
    //crear la data
    if(formEnviado == 'laboral'){

      if(this.forma.invalid){
        Swal.fire('Formulario con errores','Complete correctamente todos los campos del formulario',"warning");
        return Object.values(this.forma.controls).forEach(control => control.markAsTouched());
      }

      data = {        
        legajo: parseInt(this.forma.get('legajo')?.value),
        apellido_1: this.primeraMayuscula(this.forma.get('apellido_1')?.value),
        apellido_2: this.primeraMayuscula(this.forma.get('apellido_2')?.value),
        nombre_1: this.primeraMayuscula(this.forma.get('nombre_1')?.value),
        nombre_2: this.primeraMayuscula(this.forma.get('nombre_2')?.value),
        nombre_3: this.primeraMayuscula(this.forma.get('nombre_3')?.value),
        escalafon_id: parseInt(this.forma.get('escalafon_id')?.value),
        escala_jerarquica_id: parseInt(this.forma.get('escala_jerarquica_id')?.value),
        grado_id: parseInt(this.forma.get('grado_id')?.value),
        ultimo_ascenso: this.auxiliarDate,
        fecha_ingreso: this.changeFormatoFechaGuardar(this.forma.get('fecha_ingreso')?.value),
      }
    }

    if(formEnviado == 'filiatorios'){

      if(this.formaFiliatorios.invalid){
        Swal.fire('Formulario con errores','Complete correctamente todos los campos del formulario',"warning");
        return Object.values(this.formaFiliatorios.controls).forEach(control => control.markAsTouched());
      }

      data = {
        dni: parseInt(this.formaFiliatorios.get('dni')?.value),
        fecha_nacimiento: this.changeFormatoFechaGuardar(this.formaFiliatorios.get('fecha_nacimiento')?.value), 
         
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
          Swal.fire('Exito',`El Personal ha sido editado.`,"success");
          this.buscarPersonal(this.dataEdit.legajo!);         
          
          
        },
        error => {                                                                
          Swal.fire('Error error',`Error al Editar el Usuario ${error.error.message}`,"error")                          
        }
      );  
    
  }
  //fin enviar formulario

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

      if(!this.editandoTraslado){
        
        //GUARDAR NUEVO TRASLADO
        this.trasladoService.guardarTraslado(data)
        .subscribe(resultado => {
          
          Swal.fire('Nuevo traslado',`El Traslado ha sido guardado con exito`,"success");
          this.buscarPersonal(data.legajo!);
          this.listarTraslados();
          this.ocultarDialogoTraslado();            
        },
        error => {
            
            Swal.fire('Nuevo traslado',`Error al guardar el Traslado: ${error.error.message}`,"error")                          
        });
      //FIN GUARDAR NUEVO TRASLADO        
        
      }
      else{
        //ACTUALIZAR TRASLADO
        this.trasladoService.editarTraslado(data,parseInt(this.formaTraslados.get('id_traslado')?.value))
        .subscribe(resultado => {
          
            Swal.fire('Actualizar traslado',`El Traslado ha sido actualizado con Exito`,"success");
            this.listarTraslados();
            this.ocultarDialogoTraslado();
            
        },
        error => {
            
            Swal.fire('Actualizar Traslado',`Error al actualizar el Traslado: ${error.error.message}`,"error")                          
        });
        //FIN ACTUALIZAR TRASLADO
      }
      
  }
  //FIN GUARDAR TRASLADO

  //LISTADO DE TRASLADOS
  listarTraslados(){
    let legajo: number = parseInt(this.formaTraslados.get('legajo')?.value);
    this.trasladoService.getxlegajo(legajo).
              subscribe(respuesta => {
                this.totalRecords = respuesta[1];
                this.listaTraslado = respuesta[0];
            
              });
  }
  //FIN LISTADO DE TRASLADOS

  //ABRIR FORMULARIO NUEVO TRASLADO
  crearTraslado(){
    this.tituloFormTraslado="Nuevo Registro de Traslado"
    
    this.newTrasladoDialog = true;
  }
  //FIN ABRIR FORMULARIO NUEVO TRASLADO

  //ABRIR FORMULARIO EDITAR TRASLADO
  editarTraslado(traslado: TrasladoModel){
    this.tituloFormTraslado="Editar Registro Traslado"
    this.editandoTraslado = true;
    this.formaTraslados.get('id_traslado')?.setValue(traslado.id_traslado); 
    this.formaTraslados.get('destino_id')?.setValue(traslado.destino_id); 
    this.formaTraslados.get('instrumento')?.setValue(traslado.instrumento); 
    this.formaTraslados.get('fecha')?.setValue(traslado.fecha); 
    this.formaTraslados.get('fojas')?.setValue(traslado.fojas); 
    this.formaTraslados.get('vigente')?.setValue(traslado.vigente);
    this.formaTraslados.get('confirmado')?.setValue(traslado.confirmado);

    this.formaTraslados.controls['confirmado'].enable();
    //this.regPdf = {...pdf};
    this.newTrasladoDialog = true;
  }
  //FIN ABRIR FORMULARIO EDITAR TRASLADO......................................

  //OCULTAR FORMULARIO TRASLADO
  ocultarDialogoTraslado(){
    this.editandoTraslado = false;
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
  //...................................................................................................


  //GUARDAR FUNCION  
  submitFormFuncion(){
    if(this.formaFuncion.invalid){
      Swal.fire('Formulario Funcion con errores','Complete correctamente todos los campos del formulario',"warning");
      return Object.values(this.formaFuncion.controls).forEach(control => control.markAsTouched());
    }

    if(parseInt(this.formaFuncion.get('destino_id')?.value)==8){
      Swal.fire('Guardar funcion','No tiene un destino asignado',"warning");
      return ;
    }

    let data: PersonalFuncionModel;
      //cambiar funcion el la tabla personal
      //this.submitForm('cambioFuncion');

    data = {

      legajo: parseInt(this.formaFuncion.get('legajo')?.value),
      destino_id: parseInt(this.formaFuncion.get('destino_id')?.value),
      departamento_id: parseInt(this.formaFuncion.get('departamento_id')?.value),
      division_id: parseInt(this.formaFuncion.get('division_id')?.value),
      sector_id: parseInt(this.formaFuncion.get('sector_id')?.value),
      funcion_id:parseInt(this.formaFuncion.get('funcion_id')?.value),
      seccion_guardia_id: parseInt(this.formaFuncion.get('seccion_guardia_id')?.value),
      instrumento: this.formaFuncion.get('instrumento')?.value,
      fecha: this.changeFormatoFechaGuardar(this.formaFuncion.get('fecha')?.value),
      fojas: parseInt(this.formaFuncion.get('fojas')?.value),
      vigente: this.formaFuncion.get('vigente')?.value
    }

    if(!this.editandoFuncion){
      //CREANDO NUEVA FUNCION
      
      //GUARDAR NUEVA FUNCION
      this.personalFuncionService.guardarFuncion(data)
      .subscribe(resultado => {
        
          Swal.fire('Exito nueva función',`La función ha sido guardada con Exito`,"success");
          //this.limpiarFormulario();
          this.listarFunciones();
          this.buscarPersonal(this.dataEdit.legajo!);
          this.actualizarCamposFormulario();
          this.ocultarDialogoFuncion();      
      },
      error => {          
          Swal.fire('Error nueva función',`Error al guardar la funcion: ${error.error.message}`,"error")                          
      });
      //FIN GUARDAR NUEVA FUNCION      
    }
    else{
      //ACTUALIZANDO FUNCION
      this.personalFuncionService.editarFuncion(data,parseInt(this.formaFuncion.get('id_personal_funcion')?.value))
        .subscribe(resultado => {
          
            Swal.fire('Exito al actualizar funcion',`La función ha sido actualizada con exito`,"success");
            //this.limpiarFormulario();
            this.listarFunciones();
            this.actualizarCamposFormulario();
            this.ocultarDialogoFuncion();              
            
        },
        error => {
          
          Swal.fire('Error al actualizar función',`Error al actualizar la función: ${error.error.message}`,"error")                          
      });
      //FIN ACTUALIZAR TRASLADO
    }
      
  }
  //FIN GUARDAR FUNCION

  //LISTADO DE FUNCION
  listarFunciones(){
    let legajo: number = parseInt(this.formaFuncion.get('legajo')?.value);
    this.personalFuncionService.getxlegajo(legajo).
      subscribe(respuesta => {
        this.totalRecords = respuesta[1];
        this.listaFunciones = respuesta[0];    
      });
  }
  //FIN LISTADO DE FUNCION

  //ABRIR FORMULARIO NUEVO FUNCION
  crearFuncion(){
    this.tituloFormFuncion="Nuevo Registro de Función";
    this.inicializarFormularioFuncion();
    this.newFuncionDialog = true;
  }

  //FIN ABRIR FORMULARIO NUEVO FUNCION

  //ABRIR FORMULARIO EDITAR FUNCION
  editarFuncion(funcion: PersonalFuncionModel){
    this.tituloFormFuncion="Editar Registro Función"
    this.editandoFuncion = true;
    
    this.formaFuncion.get('id_personal_funcion')?.setValue(funcion.id_personal_funcion); 
    this.formaFuncion.get('destino_id')?.setValue(funcion.destino_id); 

    this.cargarDepartamentos(funcion.destino_id!);              
    this.cargarDivisiones(funcion.destino_id!,funcion.departamento_id!);    
    this.cargarSectores(funcion.destino_id!,funcion.departamento_id!,funcion.division_id!); 
    this.cargarSeccionesGuardia(funcion.sector_id!);

    this.formaFuncion.get('departamento_id')?.setValue(funcion.departamento_id);  
    this.formaFuncion.get('division_id')?.setValue(funcion.division_id);
    this.formaFuncion.get('sector_id')?.setValue(funcion.sector_id); 
    this.formaFuncion.get('seccion_guardia_id')?.setValue(funcion.seccion_guardia_id);
    this.formaFuncion.get('funcion_id')?.setValue(funcion.funcion_id);
    this.formaFuncion.get('instrumento')?.setValue(funcion.instrumento); 
    this.formaFuncion.get('fecha')?.setValue(funcion.fecha); 
    this.formaFuncion.get('fojas')?.setValue(funcion.fojas); 
    this.formaFuncion.get('vigente')?.setValue(funcion.vigente);
    //this.regPdf = {...pdf};
    this.newFuncionDialog = true;
  }
  //FIN ABRIR FORMULARIO EDITAR FUNCION

  //OCULTAR FORMULARIO FUNCION
  ocultarDialogoFuncion(){
    this.editandoFuncion = false;
    this.inicializarFormularioFuncion();
    this.newFuncionDialog = false
  }  
  //FIN OCULTAR FORMULARIO FUNCION

  //LIMPIAR FORMULARIO FUNCION
  inicializarFormularioFuncion(){
    this.cargarDepartamentos(this.dataEdit.destino_id!);       
    this.cargarDivisiones(this.dataEdit.destino_id!,3);
    this.cargarSectores(this.dataEdit.destino_id!,3,1);      
    this.cargarSeccionesGuardia(this.dataEdit.sector_id!);
    

    this.formaFuncion.get('id_personal_funcion')?.setValue(0);
    this.formaFuncion.get('destino_id')?.setValue(this.dataEdit.destino_id); 
    this.formaFuncion.get('departamento_id')?.setValue(3); 
    this.formaFuncion.get('division_id')?.setValue(1); 
    this.formaFuncion.get('sector_id')?.setValue(1);     
    this.formaFuncion.get('funcion_id')?.setValue(1); 
    this.formaFuncion.get('instrumento')?.setValue(""); 
    this.formaFuncion.get('fecha')?.setValue(""); 
    this.formaFuncion.get('fojas')?.setValue(0);
    this.formaFuncion.get('vigente')?.setValue(true);
    
    return Object.values(this.formaFuncion.controls).forEach(control => control.markAsUntouched());
  }
  //FIN LIMPIAR FORMULARIO FUNCION
  //...................................................................
  //...................................................................
  

  //buscar personal
  buscarPersonal(legajo: number){
    this.personalService.buscarPersonal(legajo)
      .subscribe(
        personal => {
          this.dataEdit = personal;

          //actualizacion de foto
          if(this.dataEdit.foto){
            if(this.dataEdit.foto?.toString() != "no-image.png"){
              this.foto_nombre = this.dataEdit.foto?.toString();
            }
            else{
              this.foto_nombre = "./assets/img/no-image.jpg";
            }     
      
          }
          
          //cambiar formato de fechas para mostrar
          this.formatoFechasMostrar();
          this.nombreCompletoPersonal();
          this.actualizarCamposFormulario();
          Swal.fire('Exito',`Datos actualizados en el formulario`,"success");
          
        }
      )
  }
  //fin buscar personal

  //manejo de tabla de registros de pdfs
  crearRegistro(){
    this.tituloFormPdf="Nuevo Registro Pdf"
    this.newFileDialog = true;
  }
  
  grabarRegPdf(){
    this.submitted = true;
    console.log('DATA RECIBIDA PARA GRABAR', this.regPdf);
  }
  
  ocultarDialogo(){
    this.editandoPdf = false;
    this.regPdf = new PdfModel();
    this.newFileDialog = false
  }  

  editRegPdf(pdf: PdfModel){
    if(pdf.fecha_documento != null){
      //debe ser MM-dd-yyyy porque el tipo Date recibe ese formato... con dd-MM-yyyy intercambia mes con dia
      let auxiliar = this.datePipe.transform(pdf.fecha_documento, "MM-dd-yyyy");
      pdf.fecha_documento = new Date(auxiliar!);
           
    }
    this.tituloFormPdf="Editar Registro Pdf"
    this.editandoPdf = true;
    this.regPdf = {...pdf};
    this.newFileDialog = true;
  }

  //DESCARGAR PDF
  descargarPdf(key: string){
    console.log("key", key);
    this.pdfService.getPDF(key)    
    .subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);

    // if you want to open PDF in new tab
        window.open(fileURL); 
        var a         = document.createElement('a');
        //a.href        = fileURL; 
        a.target      = '_blank';
        //a.download    = 'bill.pdf';
        //document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ',error);
      }
    );
  }
  //DESCARGAR PDF..................................................................


  onEditPdf(){
    this.submitted = true;
    if(this.editandoPdf){
      let legajo: number =  this.dataEdit.legajo! ;
                       
      if(this.regPdf.id_archivo){
        let data: Partial<PdfModel>;
        data = {
            detalle: this.regPdf.detalle,
            indice: this.regPdf.indice,
            fecha_documento: this.changeFormatoFechaGuardar(this.regPdf.fecha_documento!)
        }
                          
        this.pdfService.editPdf(this.regPdf.id_archivo, data)
            .subscribe(
              resultado => {
                Swal.fire('Exito',`El pdf del legajo digital ha sido editado con éxito`,"success");
                // this.actualizarUsuarios();
                // this.hideDialog();
                this.listarPdfs(legajo);    
                this.submitted = false;
                this.ocultarDialogo();
                
              },
              error => {
                  
                  Swal.fire('Error',`Error al Editar el Usuario ${error.error.message}`,"error")                          
              });
      }else{
      
              Swal.fire('Error',`Error al Editar el Usuario: Faltan Datos`,"error")
              
      }

    }
  }

  

  onUploadPdf(event: File){
    try {
      this.submitted = true;
      this.pdfSubir = event;
      let legajo: number =  this.dataEdit.legajo! ;
      let detalle: string =  this.regPdf.detalle! ;
      let fecha_pdf: Date =  this.regPdf.fecha_documento! ;
      let indice: number =  this.regPdf.indice! ;
      this.pdfService.postPdf(this.pdfSubir, legajo, detalle, fecha_pdf, indice).then((respuesta: any) => {
         if(respuesta.ok){
          Swal.fire('Carga Exitosa!!', "El pdf del legajo digital ha sido subido  con éxito","success");
          this.listarPdfs(legajo);    
          this.submitted = false;
          this.newFileDialog = false;
          this.regPdf = new PdfModel();
             }else{
                 throw new Error(respuesta.message);
         }
     }).catch(error => {
      Swal.fire('Error', error.message, "error"); 
     });
     
      
    } catch (error: any) {
          Swal.fire('Error', error.message, "error");    
    }
  }
  
  listarPdfs(numLegajo: number){
      
      const respuesta =  (this.pdfService.getxlegajo(numLegajo)).subscribe((res: {ok: boolean,total: number,  pdfs: PdfModel[]}) => {
         this.pdfsList = res.pdfs;
      });
       
  }



  deletePdf(pdf: PdfModel){
    const idPdf: number = parseInt(pdf.id_archivo.toString());
    let legajo: number =  this.dataEdit.legajo!;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })  
    swalWithBootstrapButtons.fire({
      title: 'Confirma el borrado de los Archivo ',
      text: "Esta Acción no podrá revertirse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar el Archivo PDF Seleccionado',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.pdfService.deletePdf(idPdf)
        .subscribe(
          resultado => {
            this.listarPdfs(legajo);
           }
          ,error => {                                                                
            Swal.fire('Error',`Error al Eliminar el Archivo ${error.error.message}`,"error")                          
          }
      );
          
         
        swalWithBootstrapButtons.fire(
          'Eliminados!',
          'Los Registros Seleccionados han sido borrados.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Se ha cancelado la eliminación deL Archivo :)',
          'error'
        )
      }
    })

  
  }

  //ESTABLECER NOMBRE COMPLETO DEL PERSONAL
  private nombreCompletoPersonal(){
    let auxiliar: any;
    auxiliar = this.dataEdit.grado;
    this.nombreCompleto = (this.dataEdit.apellido_1! || "") + " " + (this.dataEdit.apellido_2! || "") +" " + (this.dataEdit.nombre_1! || "") +" " + (this.dataEdit.nombre_2! || "") +" " + (this.dataEdit.nombre_3! || "");
    this.nombreCompleto = this.nombreCompleto.toUpperCase();
  }
  //FIN ESTABLECER NOMBRE COMPLETO DEL PERSONAL...........................................................
  
  //CAMBIAR NOMBRES Y APELLIDOS PRIMERA LETRA A MAYUSCULA
  private primeraMayuscula(palabra: string){
    if (!palabra) return palabra;
    return palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();

  }
  //FIN CAMBIAR NOMBRES Y APELLIDOS PRIMERA LETRA A MAYUSCULA.............................

  //ACTUALIZAR DATOS EN FORMULARIO
  private actualizarCamposFormulario(){
    this.forma.controls['apellido_1'].setValue(this.dataEdit.apellido_1);
    this.forma.controls['apellido_2'].setValue(this.dataEdit.apellido_2);
    this.forma.controls['nombre_1'].setValue(this.dataEdit.nombre_1);
    this.forma.controls['nombre_2'].setValue(this.dataEdit.nombre_2);
    this.forma.controls['nombre_3'].setValue(this.dataEdit.nombre_3);

    //Datos de destino
    this.destino_txt= (this.dataEdit.destino)?(JSON.parse(JSON.stringify(this.dataEdit.destino))).destino:"sin destino";
    this.departamento_txt= (this.dataEdit.departamento)?(JSON.parse(JSON.stringify(this.dataEdit.departamento))).departamento:"sin departamento",
    this.division_txt= (this.dataEdit.division)?(JSON.parse(JSON.stringify(this.dataEdit.division))).division:"sin división";
    this.sector_txt= (this.dataEdit.sector)?(JSON.parse(JSON.stringify(this.dataEdit.sector))).sector:"sin sector";
    this.seccion_guardia_txt= (this.dataEdit.seccion_guardia)?(JSON.parse(JSON.stringify(this.dataEdit.seccion_guardia))).seccion:"sin sección guardia";
    this.funcion_txt= (this.dataEdit.funcion)?(JSON.parse(JSON.stringify(this.dataEdit.funcion))).funcion:"sin sector"; 
        
  }

  //FIN ACTUALIZAR DATOS EN FORMULARIO

  //DESHABILITAR CAMPOS
  private deshabilitarCampos(valor: boolean){
    if(valor==false){
      this.forma.controls['apellido_1'].disable();
      this.forma.controls['apellido_2'].disable();
      this.forma.controls['nombre_1'].disable();
      this.forma.controls['nombre_2'].disable();
      this.forma.controls['nombre_3'].disable();
      this.forma.controls['legajo'].disable();
      //this.forma.controls['destino_id'].disable();
      this.forma.controls['escalafon_id'].disable();
      this.forma.controls['escala_jerarquica_id'].disable();
      this.forma.controls['grado_id'].disable();
      this.forma.controls['ultimo_ascenso'].disable();
      
    }
  }
  
  //FIN DESHABILITAR CAMPOS....................................

  //FORMATO FECHAS PARA NOSTRAR DATEPICKER
  private formatoFechasMostrar(){
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
  }
   //FIN FORMATO FECHAS PARA NOSTRAR DATEPICKER.................................................................

  onDateChange(nuevaFecha: Date){
    if(nuevaFecha != null){
      this.auxiliarDate = this.datePipe.transform(nuevaFecha,"yyyy-MM-dd")!;
        
    }
  }

  //FORMATO FECHAS PARA GUARDAR
  changeFormatoFechaGuardar(nuevaFecha: Date){
    let fechaAuxiliar:any = null;
    if(nuevaFecha != null){
      fechaAuxiliar = this.datePipe.transform(nuevaFecha,"yyyy-MM-dd")!;
      
    }
    return fechaAuxiliar;
  }
  //FIN FORMATO FECHAS PARA GUARDAR.........................................................................


  //GENERAL PDF  CON DATOS PERSONALES
  async generarPdfDatosPersonal() {
    let meses_texto=["Enero", "Febrero","Marzo","Abril","Mayo","Junio", "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    //fecha completa
    let fecha_hoy: Date = new Date();
    let fecha_completa: string;
    let anio:number= fecha_hoy.getFullYear(); 
    let mes: number= fecha_hoy.getMonth();
    let dia: number= fecha_hoy.getDate();
    fecha_completa = "Salta, " + dia + " de " + meses_texto[mes] + " de " +  anio;

    //fin fecha completa
    const pdf = new PdfMakeWrapper();
    pdf.add(
      new Table([
        [ 
          new Cell (await new Img('../../../../assets/img/logo-spps-transp-text.png').fit([130,130]).alignment('left').build()).end
        ],
        [ 
          new Txt(globalConstants.destino_corto).fontSize(9).alignment('center').end
          
        ]
      ]).widths([130])
      .layout('noBorders').end
    );
    
    pdf.add(
      new Txt(fecha_completa).fontSize(11).alignment('right').end
    );
    pdf.add(' ');
 
    pdf.add(
      new Txt('Datos del personal').bold().fontSize(13).alignment('center').end
    );

    pdf.add(' ');  

    pdf.add(
      new Table([
        [ 
          await new Img(this.foto_nombre).fit([100,100]).alignment('center').build(), 
          
          new Table([            
            [ 
              " Grado, apellido y nombre: "+ this.nombreCompleto
            ],
            
            [ 
              " Legajo Personal: "+ this.dataEdit.legajo
            ],
            [ 
              " D.N.I. Nº: "+ this.dataEdit.dni
            ],
            [ 
              " Escala Jerarquica: "+ ((this.dataEdit.escala_jerarquica)?(JSON.parse(JSON.stringify(this.dataEdit.escala_jerarquica))).escala_jerarquica:'')
            ],
            [ 
              " Escalafón: "+ ((this.dataEdit.escalafon)?(JSON.parse(JSON.stringify(this.dataEdit.escalafon))).escalafon:'')
            ],
            [" "]

          ]).layout("lightHorizontalLines").end
        ]
      ]).widths([110,390]).layout("noBorders").fontSize(11).end
    );

    pdf.add(' ');

    pdf.add(
      new Table([
        [ 
          new Cell (new Txt('Destino').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,
          new Cell (new Txt('Departamento').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,
          new Cell (new Txt('División').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end
        ],
        [ 
          new Txt((this.dataEdit.destino)?(JSON.parse(JSON.stringify(this.dataEdit.destino))).destino:"sin destino").bold().fontSize(10).alignment('center').end,
          new Txt((this.dataEdit.departamento)?(JSON.parse(JSON.stringify(this.dataEdit.departamento))).departamento:"sin departamento").bold().fontSize(10).alignment('center').end,
          new Txt((this.dataEdit.division)?(JSON.parse(JSON.stringify(this.dataEdit.division))).division:"sin división").bold().fontSize(10).alignment('center').end,
          
        ]
      ]).widths([170,170,160])
      .layout('noBorders').end
    );

    pdf.add(' ');

    pdf.add(
      new Table([
        [ 
          new Cell (new Txt('Sector').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,
          new Cell (new Txt('Función').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,
          new Cell (new Txt('Sección guardia').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end
        ],
        [ 
          new Txt((this.dataEdit.sector)?(JSON.parse(JSON.stringify(this.dataEdit.sector))).sector:"sin sector").bold().fontSize(10).alignment('center').end,
          new Txt((this.dataEdit.funcion)?(JSON.parse(JSON.stringify(this.dataEdit.funcion))).funcion:"sin sector").bold().fontSize(10).alignment('center').end,
          //new Txt((this.dataEdit.funcion)?this.dataEdit.funcion:"sin función").bold().fontSize(10).alignment('center').end,
          new Txt((this.dataEdit.seccion_guardia)?(JSON.parse(JSON.stringify(this.dataEdit.seccion_guardia))).seccion:"sin sección guardia").bold().fontSize(10).alignment('center').end,
          
        ]
      ]).widths([150,150,200])
      .layout('noBorders').end
    );

    pdf.add(' ');

    pdf.add(
      new Table([
        [ 
          new Cell (new Txt('Fecha ingreso').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,          
          new Cell (new Txt('Ultimo ascenso').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,
          new Cell (new Txt('Situación').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end
        ],
        [ 
          new Txt(((this.dataEdit.fecha_ingreso!=null)?this.datePipe.transform(this.dataEdit.fecha_ingreso, "dd/MM/yyyy"):'')|| "").fontSize(10).alignment('center').end,
          new Txt(((this.dataEdit.ultimo_ascenso!=null)?this.datePipe.transform(this.dataEdit.ultimo_ascenso, "dd/MM/yyyy"):'')|| "").fontSize(10).alignment('center').end,
          new Txt((this.dataEdit.situacion)?(JSON.parse(JSON.stringify(this.dataEdit.situacion))).situacion:"sin situación").bold().fontSize(10).alignment('center').end,
          
        ]
      ]).widths([150,150,200])
      .layout('noBorders').end
    );

    pdf.add(' ');

    pdf.add(
      new Table([
        [ 
          new Cell (new Txt('Sexo').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,          
          new Cell (new Txt('Estado Civil').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,
          new Cell (new Txt('Fecha Nacimiento').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end,
          new Cell (new Txt('Nacionalidad').bold().fontSize(11).alignment('center').end).fillColor('#CCCCCC').end
        ],
        [ 
          new Txt((this.dataEdit.sexo)?(JSON.parse(JSON.stringify(this.dataEdit.sexo))).sexo:"sin sexo").bold().fontSize(10).alignment('center').end,
          new Txt((this.dataEdit.estado_civil)?(JSON.parse(JSON.stringify(this.dataEdit.estado_civil))).estado_civil:"sin estado civil").fontSize(10).alignment('center').end,
          new Txt(((this.dataEdit.fecha_nacimiento!=null)?this.datePipe.transform(this.dataEdit.fecha_nacimiento, "dd/MM/yyyy"):'')|| "").fontSize(10).alignment('center').end,
          new Txt((this.dataEdit.nacionalidad)?this.dataEdit.nacionalidad:"sin nacionalidad").bold().fontSize(10).alignment('center').end,          
        ]
      ]).widths([100,125,125,150])
      .layout('noBorders').end
    );

    
    
    pdf.create().open();
                             
  }
  //FIN GENERAL PDF  CON DATOS PERSONALES..............................................................................................

  
}
