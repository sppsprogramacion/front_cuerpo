import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { departamentos, departamentos_provincial, destinos, divisiones, escalafon, escalaJerarquica, estados_civil, grados, municipios, nivelEducativo, provincias, secciones_guardia, sectores, sexos, situacion } from 'src/app/common/data-mockeada';
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
       apellido_1: ["diaz",[Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       apellido_2: ["diaz",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_1: ["pedro",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       nombre_2: ["Pedro",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       nombre_3: ["pedro",[Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
       legajo: [3155,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
       destino_id: [1],
       departamento_id: [3],
       division_id: [5],
       sector_id: [],
       funcion: ["Celador", [Validators.minLength(1), Validators.maxLength(200)]],
       seccion_guardia_id: [1],
       escalafon_id: [1],
       escala_jerarquica_id: [1],
       grado_id: [],
       //foto: [],
       ultimo_ascenso: [],

       //campos filiatorios
       dni: [32505424,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      fecha_nacimiento: [],
      fecha_ingreso: [],
      cuil: ["20-32505424-8",[Validators.required, Validators.pattern(/\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/)]],
      sexo_id: [1],
      estado_civil_id: [2],
      nacionalidad: ["argentino",[Validators.minLength(1), Validators.maxLength(50)]],
      domicilio: ["Barrio los gremios",[Validators.minLength(1), Validators.maxLength(300)]],
      provincia_id: [1],
      departamento_provincial_id: [],
      municipio_id: [],
      //ciudad_id: [this.dataEdit.ciudad_id],
      nivel_educativo_id: [4],
      telefonos: ["0387154853487",[Validators.minLength(1), Validators.maxLength(300)]],
      email: ["pedrodiaz0487@gmail.com", [Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.minLength(4), Validators.maxLength(50)]],
      altura: [1.8],
      peso: [72.5],
      //registrado_por: [],
      situacion_id: [1]


    });
    //fin formulario personal


    //cargar desplegables
    this.cargarDepartamentos(parseInt(this.forma.get('destino_id')?.value));
    this.cargarDepartamentosProvinciales(parseInt(this.forma.get('provincia_id')?.value))
    // this.cargarDivisiones(this.dataEdit.departamento_id!);
    this.cargarGrados(parseInt(this.forma.get('escala_jerarquica_id')?.value));
    // this.cargarMunicipios(this.dataEdit.departamento_provincial_id!);
    // this.cargarSeccionesGuardia(this.dataEdit.departamento_id!);

    this.administrador = (globalConstants.rol_usuario == "0")? true: false;

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
    ]

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
    return this.forma.get('destino_id')?.invalid && this.forma.get('destino_1')?.touched;
  }

  get departamentoNoValido(){
    return this.forma.get('departamento_id')?.invalid && this.forma.get('departamento_id')?.touched;
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
  //fin validaciones formulario filatorios
  //FIN VALIDACIONES FORMULARIOS
  

  //metodos para cargar listas desplegables  
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
         this.forma.get('destino_id')?.setValue(0);
         Swal.fire('Usted ha cancelado el cambio de destino', '', 'info')
       }
     })
  
     
   }
   
   cargarDepartamentosProvinciales(provincia_id: number){
     this.departamentos_provincial=departamentos_provincial.filter(departamento_provincial => {
       
              return departamento_provincial.provincia_id == provincia_id || departamento_provincial.provincia_id == 0;
         });
   }
  
   onChangeProvincia(){
     const id = this.forma.get('provincia_id')?.value;
     if(id != null){
       this.cargarDepartamentosProvinciales(parseInt(id.toString()));
       //this.cargarSeccionesGuardia(parseInt(id.toString()));
       
     }    
   }
  
   cargarMunicipios(departamento_provincial_id: number){
     this.municipios=municipios.filter(municipio => {
       
              return municipio.departamento_id == departamento_provincial_id || municipio.departamento_id == 0;
         });
   }
  
   onChangeDepartamentoProvincial(){
     const id = this.forma.get('departamento_provincial_id')?.value;
     if(id != null){
       this.cargarMunicipios(parseInt(id.toString()));
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
  //fin metodos para cargar listas desplegables

  

  //metodos de formatos de fecha  
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
          //ciudad_id: [this.dataEdit.ciudad_id],
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
                console.log("datos nuevos enviados", data);
                  Swal.fire('Exito',`El Registro ha sido guardado con Exito`,"success");
                  
                  //this.actualizarUsuarios();
                  //this.hideDialog();
              },
              error => {
                  console.log("personal a nuevo error", data);
                  Swal.fire('Error',`Error al cargar el nuevo personal ${error.error.message}`,"error")                          
              });
  
  }

  //fin guardar personal

}
