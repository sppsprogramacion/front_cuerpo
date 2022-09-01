import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { escalafon, escalaJerarquica, grados } from 'src/app/common/data-mockeada';
import { globalConstants } from 'src/app/common/global-constants';
import { AscensoModel } from 'src/app/models/ascenso.model';
import { DestinoModel } from 'src/app/models/destino.model';
import { EscalaJerarquicaModel } from 'src/app/models/escala.model';
import { EscalafonModel } from 'src/app/models/escalafon.model';
import { GradoModel } from 'src/app/models/grado.model';
import { Personal } from 'src/app/models/personal.model';
import { AscensoService } from 'src/app/services/ascenso.service';
import { PersonalService } from 'src/app/services/personal.service';
import Swal from 'sweetalert2';
import { FechasPipe } from '../../../pipes/fechas.pipe';

@Component({
  selector: 'app-ascensos-agregar',
  templateUrl: './ascensos-agregar.component.html',
  styles: [
  ]
})
export class AscensosAgregarComponent implements OnInit {
  cargando: boolean = true;
  administrador: boolean = false;
  colsTablaPersonalExport: any[]=[]; //array de columnas de la tabla

  //FORMULARIOS  
  formaGrado: FormGroup;
  formaFiltro: FormGroup;

  //variables auxiliares
  escala_id_aux: number = 0;

  //variables manejo personal
  dataPersonal: Personal= new Personal();

  //variables de manejo de grado
  dataGrado: AscensoModel= new AscensoModel;  
  tituloFormGrado:string = "";
  newGradoDialog: boolean= false;
  nuevoGrado: boolean = false;
  submitedGradoo:boolean=false;
  guardarGrado: boolean = false;
  gradoConfigurado: boolean = false;  
  listaGrados: any[]=[];
  totalRecords: number = 0;

  //variables de manejo de filtro
  fecha_ascenso:Date= new Date();
  grado_id: number = 0;
  nombreCompleto: string="";  
  foto_nombre: string = "./assets/img/no-image.jpg";
  
  grados: GradoModel[]=[];
  escalas: EscalaJerarquicaModel[]=[];
  escalafones: EscalafonModel[]=[];
  

  //DATEPICKER
  bsDatePickerConfig!: Partial<BsDatepickerConfig>;
  
  constructor(    
    private readonly ascensoService: AscensoService,
    private readonly personalService: PersonalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private readonly datePipe: DatePipe,
  ) {
    //analizar si es administrador o no
    this.administrador = (globalConstants.rol_usuario == "0")? true: false;

    //FORMULARIO ASCENSO    
    this.formaGrado = this.fb.group({
      dni_personal: [0,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      legajo: [0,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
      escalafon_id: [3,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      escala_jerarquica_id: [3,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      grado_id: [18,[Validators.required, Validators.pattern(/^[0-9]*$/)]],      
      fecha_ascenso: [,[Validators.required]],
      instrumento: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      // vigente: [true, [Validators.required]],
      orden: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      // anio_orden: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],      
      // instrumento_orden: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      fecha_instrumento_orden: [,[Validators.required]],

      grado_apellido_nombre:[],
      dni_buscar: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      
    });
    //FIN FORMULARIO ASCENSO........................................................................................................

    //FORMULARIO TRASLADO    
    this.formaFiltro = this.fb.group({
      fecha_ascenso: [,[Validators.required]],
      id_grado: [,[Validators.required]],
      cantidad_registros: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      
    });
    //FIN FORMULARIO TRASLADO 

    this.cargarGrados(parseInt(this.formaGrado.get('escala_jerarquica_id')?.value));
    

    //this.ciudades = ciudades;
      
    this.escalafones = escalafon;
    this.escalas = escalaJerarquica;
   }

  ngOnInit(): void {

    //inicializacion de cabeceras de columnas
    this.colsTablaPersonalExport = [      
      { field: 'id_traslado', header: 'Id' },
      { field: 'grado_apellido_nombre', header: 'Personal' },
      { field: 'apellido_1', header: 'Primer Apellido' },
      { field: 'nombre_1', header: 'Primer Nombre' },
      { field: 'nombre_2', header: 'Segundo Nombre' },
      { field: 'nombre_3', header: 'Tercer Nombre' },
      { field: 'grado.grado', header: 'Grado' },
      { field: 'legajo', header: 'Legajo' },      
      { field: 'destino.destino', header: 'Destino' },      
      { field: 'vigente', header: 'vigente' },
      { field: 'confirmado', header: 'Conf.' },
      { field: 'instrumento', header: 'Instrumento' },
      { field: 'fecha', header: 'Fecha' }
    ];

    this.listarGrados(this.changeFormatoFechaGuardar(new Date("2022-01-01T00:00:00")))
  }

  

  //GRADO
  //LISTADO DE GRADOS
  listarGrados(fecha_ascenso: Date){
    console.log("fecha ascenso", fecha_ascenso);

    this.ascensoService.getListaXFechaGrado(fecha_ascenso).
      subscribe(respuesta => {
        this.totalRecords = respuesta[1];
        this.listaGrados = respuesta[0];
        this.formaFiltro.get('cantidad_registros')?.setValue(this.totalRecords);
        console.log("Grados", this.listaGrados);
        this.cargando = false;

    
      });
  }
  //FIN LISTADO DE GRADOS

  //GUARDAR GRADO
  submitFormGrado(){
    // if(this.formaGrado.invalid){
    //   Swal.fire('Formulario Grado con errores','Complete correctamente todos los campos del formulario',"warning");
    //   return Object.values(this.formaGrado.controls).forEach(control => control.markAsTouched());
    // }

    let data: AscensoModel;
     //poner destino en el personal y sin funcion 
      //this.submitForm('cambioDestino');
      let fecha_insrumento: Date = this.changeFormatoFechaGuardar(this.formaGrado.get('fecha_instrumento_orden')?.value);
      
      data = {
        legajo: parseInt(this.formaGrado.get('legajo')?.value),
        dni_personal: parseInt(this.formaGrado.get('dni_personal')?.value),
        instrumento: this.formaGrado.get('instrumento')?.value,
        grado_id: parseInt(this.formaGrado.get('grado_id')?.value),
        escalafon_id: parseInt(this.formaGrado.get('escalafon_id')?.value),        
        fecha_ascenso: this.changeFormatoFechaGuardar(this.formaGrado.get('fecha_ascenso')?.value),
        orden: parseInt(this.formaGrado.get('orden')?.value),
        instrumento_orden: this.formaGrado.get('instrumento')?.value,
        fecha_instrumento_orden:this.changeFormatoFechaGuardar(this.formaGrado.get('fecha_instrumento_orden')?.value),
        // anio_orden: fecha_insrumento.getFullYear(),
        anio_orden: 2022,
        vigente: true
      }   
      
      console.log("data grado",data);
      //GUARDAR NUEVO ASCENSO
      this.ascensoService.guardarAscenso(parseInt(this.formaGrado.get('escala_jerarquica_id')?.value),data)
      .subscribe(resultado => {
        console.log("Ascenso", resultado);
        Swal.fire('Nuevo Ascenso',`El ascenso ha sido guardado con exito`,"success");
        //this.buscarPersonal(data.legajo!);
        this.listarGrados(new Date("2022-01-01T00:00:00"))
        this.nuevaBusqueda();         
      },
      error => {
          
          Swal.fire('Nuevo asceso',`Error al guardar el ascenso: ${error.error.message}`,"error")                          
      });
      //FIN GUARDAR NUEVO ASCENSO
  }
  //FIN GUARDAR GRADO

  //ABRIR CONFIGURAR GRADO
  abrirGonfigurarGrado(){
    this.tituloFormGrado="Configurar grado"
    this.newGradoDialog = true;

    //DESHABILITAR CAMPOS EDITABLES
    // this.formaGrado.controls['dni_personal'].disable();
    // this.formaGrado.controls['legajo'].disable();
    // this.formaGrado.controls['orden'].disable();
    //DESHABILITAR CAMPOS EDITABLES
  }
  //FIN ABRIR CONFIGURAR GRADO

  //ABRIR CREAR GRADO
  abrirFormCrearGrado(){
    this.tituloFormGrado="Nuevo registro de grado"
    this.formaGrado.get('instrumento')?.setValue(this.dataGrado.instrumento);
    this.formaGrado.get('fecha_instrumento_orden')?.setValue(this.dataGrado.fecha_instrumento_orden);
    this.formaGrado.get('fecha_ascenso')?.setValue(this.dataGrado.fecha_ascenso);
    this.formaGrado.get('dni_personal')?.setValue(0);
    this.formaGrado.get('legajo')?.setValue(0);
    
    if(this.gradoConfigurado){
      this.formaGrado.get('escala_jerarquica_id')?.setValue(this.escala_id_aux);
      this.formaGrado.get('escalafon_id')?.setValue(this.dataGrado.escalafon_id);
      this.formaGrado.get('grado_id')?.setValue(this.dataGrado.grado_id);
      this.guardarGrado = true;
      this.newGradoDialog = true;
    }
    else{
      Swal.fire('Nuevo Ascenso',`Debe Configurar el grado para el ascenso`,"warning");
    }
    
  }
  //FIN ABRIR CREAR GRADO

  //CONFIGURAR ASCENSO
  configurarGrado(){
    this.dataGrado.instrumento = this.formaGrado.get('instrumento')?.value;
    this.dataGrado.fecha_instrumento_orden = this.changeFormatoFechaGuardar(this.formaGrado.get('fecha_instrumento_orden')?.value);
    this.dataGrado.fecha_ascenso = this.changeFormatoFechaGuardar(this.formaGrado.get('fecha_ascenso')?.value);
    this.dataGrado.grado_id = parseInt(this.formaGrado.get('grado_id')?.value);
    this.dataGrado.escalafon_id = parseInt(this.formaGrado.get('escalafon_id')?.value);
    this.escala_id_aux = parseInt(this.formaGrado.get('escala_jerarquica_id')?.value);
    this.gradoConfigurado = true;   
    console.log("grado", this.dataGrado);
    this.ocultarDialogoGrado();
  }
  //FIN CONFIGURAR ASCENSO

  //LIMPIAR CONFIGURAR ASCENSO
  limpiarGradoConfigurado(){
    this.dataGrado.instrumento = "";
    this.dataGrado.fecha_instrumento_orden = undefined;
    this.dataGrado.fecha_ascenso = undefined;
    this.dataGrado.grado_id = 0;
    this.dataGrado.escalafon_id = 0;    
    this.gradoConfigurado = false;

  }
  //FIN LIMPIAR CONFIGURAR ASCENSO

  //LIMPIAR FORMULARIO GRADO
  limpiarFormularioGrado(){
    this.formaGrado.get('id_ascenso')?.setValue(0);
    this.formaGrado.get('instrumento')?.setValue(""); 
    this.formaGrado.get('fecha_instrumento_orden')?.setValue(""); 
    this.formaGrado.get('fecha_ascenso')?.setValue("");
    this.formaGrado.get('escalafon_id')?.setValue(3); 
    this.formaGrado.get('escala_jerarquica_id')?.setValue(3);     
    this.formaGrado.get('grado_id')?.setValue(18);    
    this.guardarGrado = false;

    return Object.values(this.formaGrado.controls).forEach(control => control.markAsUntouched());
  }
  //FIN LIMPIAR FORMULARIO GRADO
  //..................................................................................................

  //OCULTAR FORMULARIO GRADO
  ocultarDialogoGrado(){
    this.limpiarFormularioGrado();
    this.newGradoDialog = false;
  }  
  //FIN OCULTAR FORMULARIO GRADO........................................

  //LIMPIAR FORMULARIO BUSQUEDA
  nuevaBusqueda(){
    this.formaGrado.get('grado_apellido_nombre')?.setValue("");
    this.formaGrado.get('dni_personal')?.setValue(0);
    this.formaGrado.get('dni_buscar')?.setValue("");
    this.formaGrado.get('legajo')?.setValue(0);
    this.formaGrado.get('orden')?.setValue(0);
    
    this.foto_nombre = "./assets/img/no-image.jpg";

    return Object.values(this.formaGrado.controls).forEach(control => control.markAsUntouched());
  }
  //FIN LIMPIAR FORMULARIO BUSQUEDA
  //..................................................................................................

  //ESTABLECER NOMBRE COMPLETO DEL PERSONAL
  private nombreCompletoPersonal(personal: Personal){
    let auxiliar: any;
    
    //personal = this.dataTraslado.personal;
    auxiliar = personal.grado;
    this.nombreCompleto = (auxiliar.grado! || "") + " " + (personal.apellido_1! || "") + " " + (personal.apellido_2! || "") +" " + (personal.nombre_1! || "") +" " + (personal.nombre_2! || "") +" " + (personal.nombre_3! || "");
    //this.nombreCompleto = this.nombreCompleto.toUpperCase();
  }
  //FIN ESTABLECER NOMBRE COMPLETO DEL PERSONAL...........................................................

  //buscar personal
  buscarPersonalXDni(){
    let dni: number = parseInt(this.formaGrado.get('dni_buscar')?.value);
    this.personalService.buscarPersonalXDni(dni)
      .subscribe(
        personal => {
          this.dataPersonal = personal;

          this.nombreCompletoPersonal(this.dataPersonal!);
          this.formaGrado.get('grado_apellido_nombre')?.setValue(this.nombreCompleto);
          this.formaGrado.get('legajo')?.setValue(this.dataPersonal.legajo);
          this.formaGrado.get('dni_personal')?.setValue(this.dataPersonal.dni);

          //actualizacion de foto
          if(this.dataPersonal.foto){
            if(this.dataPersonal.foto?.toString() != "no-image.png"){
              this.foto_nombre = this.dataPersonal.foto?.toString();
            }
            else{
              this.foto_nombre = "./assets/img/no-image.jpg";
            }     
      
          }
          
          //cambiar formato de fechas para mostrar
          // this.formatoFechasMostrar();
          // this.nombreCompletoPersonal();
          // this.actualizarCamposFormulario();
          // Swal.fire('Exito',`Datos actualizados en el formulario`,"success");
          
        },
        error => {        
            this.nuevaBusqueda();
            Swal.fire('Buscar personal',`No se encuentra al personal: ${error.error.message}`,"error");                          
        }
      );
      

  }
  //fin buscar personal.......................................................

  //metodos de formatos de fecha     
  changeFormatoFechaGuardar(nuevaFecha: Date){
    let fechaAuxiliar:any = null;
    if(nuevaFecha != null){
      fechaAuxiliar = this.datePipe.transform(nuevaFecha,"yyyy-MM-dd")!;
      
    }
    return fechaAuxiliar;
  }
  //fin metodos de formatos de fechas...................

  cargarGrados(escala_jerarquica_id: number){
    this.grados = grados.filter(grado => {
      
      return grado.escala_jerarquica_id == escala_jerarquica_id || grado.escala_jerarquica_id == 0;
    });
  }
  
  onChangeEscala(){
    const id = this.formaGrado.get('escala_jerarquica_id')?.value;
    if(id != null){ 
      if(id==1){
        this.formaGrado.get('grado_id')?.setValue(18); 
      }   
      if(id==2){
        this.formaGrado.get('grado_id')?.setValue(18); 
      }     
         
      this.cargarGrados(parseInt(id.toString()));
      this.formaGrado.get('grado_id')?.markAsUntouched();
      
    }
  }

}
