import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { departamentos, departamentos_provincial, divisiones, escalafon, escalaJerarquica, estados_civil, grados, municipios, nivelEducativo, provincias, secciones_guardia, sectores, sexos, situacion } from 'src/app/common/data-mockeada';
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
import { ProvinciaModel } from 'src/app/models/provincia.model';
import { SeccionGuardia } from 'src/app/models/seccion_guardia.model';
import { sectorModel } from 'src/app/models/sector.model';
import { SexoModel } from 'src/app/models/sexo.model';
import { SituacionModel } from 'src/app/models/situacion.model';
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
  formaFiliatorios: any;

  constructor(
    private fb: FormBuilder,
    private readonly datePipe: DatePipe,
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
       apellido_1: [Validators.required],
       apellido_2: [],
       nombre_1: [Validators.required],
       nombre_2: [],
       nombre_3: [],
       legajo: [[Validators.required]],
       destino_id: [[Validators.required]],
       departamento_id: [],
       division_id: [],
       sector_id: [],
       funcion: [],
       seccion_guardia_id: [],
       escalafon_id: [],
       escala_jerarquica_id: [],
       grado_id: [],
       foto: [],
       ultimo_ascenso: [],

       //campos filiatorios
       dni: [Validators.required],
      fecha_nacimiento: [Validators.required],
      fecha_ingreso: [],
      cuil: [Validators.required],
      sexo_id: [],
      estado_civil_id: [],
      nacionalidad: [[Validators.required]],
      domicilio: [[Validators.required]],
      provincia_id: [],
      departamento_provincial_id: [],
      municipio_id: [],
      //ciudad_id: [this.dataEdit.ciudad_id],
      nivel_educativo_id: [],
      telefonos: [],
      email: [],
      altura: [],
      peso: [],
      //registrado_por: [],
      situacion_id: []


    });
    //fin formulario personal


    //cargar desplegables
    // this.cargarDepartamentos(this.dataEdit.destino_id!);
    // this.cargarDepartamentosProvinciales(this.dataEdit.provincia_id!)
    // this.cargarDivisiones(this.dataEdit.departamento_id!);
    // this.cargarGrados(this.dataEdit.escala_jerarquica_id!);
    // this.cargarMunicipios(this.dataEdit.departamento_provincial_id!);
    // this.cargarSeccionesGuardia(this.dataEdit.departamento_id!);

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
     const id = this.formaFiliatorios.get('provincia_id')?.value;
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
     const id = this.formaFiliatorios.get('departamento_provincial_id')?.value;
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

  //validaciones de campos de formulario
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
  //fin validaciones de campos de formulario

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

}
