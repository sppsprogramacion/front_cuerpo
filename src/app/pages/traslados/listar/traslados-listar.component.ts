import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { destinos, grados } from 'src/app/common/data-mockeada';
import { TrasladoModel } from 'src/app/models/traslado.model';
import { PersonalService } from 'src/app/services/personal.service';
import { TrasladosService } from 'src/app/services/traslados.service';
import Swal from 'sweetalert2';
import { Personal } from '../../../models/personal.model';
import { DestinoModel } from '../../../models/destino.model';

@Component({
  selector: 'app-traslados-listar',
  templateUrl: './traslados-listar.component.html',
  styles: [
  ]
})
export class TrasladosListarComponent implements OnInit {
  cargando: boolean = true;
  loading: boolean = true;
  colsTablaPersonalExport: any[]=[]; //array de columnas de la tabla

  grados: {label: string, value: string,img_name: string}[]=[];
  destinos: {label: string, value: string}[]=[];
  destinos_drop: DestinoModel[]=[];
  nombreCompleto: string="";
  foto_nombre: string = 'no-image.png';
  formaTraslados: FormGroup;
  formaBuscar: FormGroup;

  //variables manejo personal
  dataPersonal: Personal= new Personal();

  //variables de manejo de traslado
  dataTraslado: TrasladoModel= new TrasladoModel;
  tituloFormTraslado:string = "";
  nuevoTraslado:boolean=false;
  editarTraslado:boolean=false;
  verTraslado:boolean=false;
  newTrasladoDialog: boolean= false;
  listaTraslado: any[]=[];
  totalRecords: number = 0;

  constructor(
    private readonly personalService: PersonalService,
    private readonly trasladoService: TrasladosService,
    private fb: FormBuilder,

  ) { 

    //FORMULARIO TRASLADO    
    this.formaTraslados = this.fb.group({
      id_traslado: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      grado_apellido_nombre:[],
      //id_traslado: [this.dataTraslado.id_traslado,Validators.required],
      dni_buscar: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      dni_personal: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      legajo: [,[Validators.required,,Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(500000)]],
      destino: [,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      destino_id: [8,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      fecha: [,[Validators.required]],
      instrumento: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      fojas: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      vigente: [true, [Validators.required]],
      confirmado: [false, [Validators.required]]
    });
    //FIN FORMULARIO TRASLADO

    //FORMULARIO TRASLADO    
    this.formaBuscar = this.fb.group({      
      dni_personal: [,[Validators.required,Validators.pattern(/^[0-9]*$/), Validators.min(1000000), Validators.max(99000000)]],
      destino_id: [8,[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      fecha: [,[Validators.required]],
      instrumento: [,[Validators.required,Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      fojas: [0,[Validators.required, Validators.pattern(/^[0-9]*$/)]]
      
    });
    //FIN FORMULARIO TRASLADO

    this.listarTraslados()
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
    //FIN inicializacion de cabeceras de columnas
    this.grados = grados.map(respuesta => {
      return {
        label: respuesta.grado.toLowerCase(),
        value: respuesta.grado,
        img_name: respuesta.grado.replace(' ','_')
        }
    });
    this.destinos = destinos.map(respuesta => {
        return {
          label: respuesta.destino.toLowerCase(),
          value: respuesta.destino } 
        });
    
    this.destinos_drop = destinos;
  }
  //FIN ONINIT..............................................

  //LISTADO DE TRASLADOS
  listarTraslados(){
    
    this.trasladoService.getNuevosXDestino().
      subscribe(respuesta => {
        this.totalRecords = respuesta[1];
        this.listaTraslado = respuesta[0];
        this.cargando = false;       
    
      });
  }
  //FIN LISTADO DE TRASLADOS

  //ABRIR FORMULARIO NUEVO TRASLADO
  crearTraslado(){
    this.tituloFormTraslado="Nuevo Registro de Traslado"    
    this.limpiarFormularioTraslado();
    this.nuevoTraslado = true;
    this.formaTraslados.controls['confirmado'].disable();
    this.newTrasladoDialog = true;
  }
  //FIN ABRIR FORMULARIO NUEVO TRASLADO

  //GUARDAR TRASLADO  
  submitFormTraslado(){
    // if(this.formaTraslados.invalid){
    //   Swal.fire('Formulario Traslado con errores','Complete correctamente todos los campos del formulario',"warning");
    //   return Object.values(this.formaTraslados.controls).forEach(control => control.markAsTouched());
    // }

    // let data: TrasladoModel;
    //  //crear la data
    //   this.submitForm('cambioDestino');

    //   data = {

    //     legajo: parseInt(this.formaTraslados.get('legajo')?.value),
    //     dni_personal: parseInt(this.formaTraslados.get('dni_personal')?.value),
    //     destino_id: parseInt(this.formaTraslados.get('destino_id')?.value),
    //     instrumento: this.formaTraslados.get('instrumento')?.value,
    //     fecha: this.changeFormatoFechaGuardar(this.formaTraslados.get('fecha')?.value),
    //     fojas: parseInt(this.formaTraslados.get('fojas')?.value),
    //     vigente: this.formaTraslados.get('vigente')?.value,
    //     confirmado: this.formaTraslados.get('confirmado')?.value,
    //   }

    //   if(!this.editarTraslado){
    //     //CREANDO NUEVO TRASLADO

    //     //EDICION DE CAMPO VIGENTE COMO FALSO EN TODOS LOS REGISTROS DE TRASLADO DE PERSONAL
    //     let dataVigente: TrasladoModel;
    //     dataVigente={
    //       vigente: false
    //     }
    //     this.trasladoService.quitarTrasladoVigente(parseInt(this.formaTraslados.get('legajo')?.value))
    //     .subscribe(resultado => {          
            
    //         //GUARDAR NUEVO TRASLADO
    //         this.trasladoService.guardarTraslado(data)
    //           .subscribe(resultado => {
                
    //             Swal.fire('Nuevo traslado',`El Traslado ha sido guardado con exito`,"success");
    //             this.listarTraslados();
    //             this.ocultarDialogoTraslado();
                  
    //           },
    //           error => {
                  
    //               Swal.fire('Nuevo traslado',`Error al guardar el Traslado: ${error.error.message}`,"error")                          
    //           });
    //         //FIN GUARDAR NUEVO TRASLADO           
            
    //     },
    //     error => {
            
    //         Swal.fire('Quitar Traslado',`Error al quitar el ultimo traslado: ${error.error.message}`,"error");                          
    //     });

        
        
    //   }
    //   else{
    //     //ACTUALIZAR TRASLADO
    //     this.trasladoService.editarTraslado(data,parseInt(this.formaTraslados.get('id_traslado')?.value))
    //     .subscribe(resultado => {
          
    //         Swal.fire('Actualizar traslado',`El Traslado ha sido actualizado con Exito`,"success");
    //         this.listarTraslados();
    //         this.ocultarDialogoTraslado();
            
    //     },
    //     error => {
            
    //         Swal.fire('Actualizar Traslado',`Error al actualizar el Traslado: ${error.error.message}`,"error")                          
    //     });
    //     //FIN ACTUALIZAR TRASLADO
    //   }
      
  }
  //FIN GUARDAR TRASLADO


  //CONFIRMAR TRASLADO
  confirmarTraslado(){
    let id_trasladox: number= parseInt(this.formaTraslados.get('id_traslado')?.value);
    let data: Partial<TrasladoModel>;

    data={      
      confirmado: true
    }

    //ACTUALIZAR TRASLADO
    this.trasladoService.editarTraslado(data,id_trasladox)
    .subscribe(resultado => {      
        Swal.fire('Confirmar traslado',`El Traslado ha sido confirmado con Exito`,"success");
        this.listarTraslados();              
    },
    error => {        
        Swal.fire('Confirmar traslado',`Error al confirmar el traslado: ${error.error.message}`,"error")                          
    });
    //FIN ACTUALIZAR TRASLADO

  }
  //FIN CONFIRMAR TRASLADO................................................

  //ABRIR FORMULARIO MOSTRAR TRASLADO
  mostrarTraslado(traslado: TrasladoModel){
    this.nombreCompletoPersonal(traslado.personal!);
    this.tituloFormTraslado="Confirmar Traslado"
    this.formaTraslados.get('id_traslado')?.setValue(traslado.id_traslado);
    this.formaTraslados.get('grado_apellido_nombre')?.setValue(this.nombreCompleto);
    this.formaTraslados.get('dni_personal')?.setValue(traslado.dni_personal);
    this.formaTraslados.get('legajo')?.setValue(traslado.legajo);
    this.formaTraslados.get('destino_id')?.setValue(traslado.destino?.id_destino); 
    this.formaTraslados.get('instrumento')?.setValue(traslado.instrumento); 
    this.formaTraslados.get('fecha')?.setValue(traslado.fecha); 
    this.formaTraslados.get('fojas')?.setValue(traslado.fojas); 
    this.formaTraslados.get('vigente')?.setValue(traslado.vigente);
    this.formaTraslados.get('confirmado')?.setValue(traslado.confirmado);
    this.formaTraslados.controls['confirmado'].disable();
    console.log("foto", traslado.personal?.foto);
       
    if(traslado.personal?.foto){
      if(traslado.personal.foto.toString() != "no-image.png"){
        this.foto_nombre = traslado.personal.foto.toString();
      }
      else{
        this.foto_nombre = "./assets/img/no-image.jpg";
      }        

    }

    this.newTrasladoDialog = true;
  }
  //FIN ABRIR FORMULARIO MOSTRAR TRASLADO....................................

  //OCULTAR FORMULARIO TRASLADO
  ocultarDialogoTraslado(){
    this.limpiarFormularioTraslado();
    this.newTrasladoDialog = false
  }  
  //FIN OCULTAR FORMULARIO TRASLADO........................................

  //LIMPIAR FORMULARIO TRASLADO
  limpiarFormularioTraslado(){
    this.formaTraslados.get('id_traslado')?.setValue(0);
    this.formaTraslados.get('grado_apellido_nombre')?.setValue("");
    this.formaTraslados.get('dni_personal')?.setValue(0);
    this.formaTraslados.get('legajo')?.setValue(0);
    this.formaTraslados.get('destino')?.setValue(""); 
    this.formaTraslados.get('instrumento')?.setValue(""); 
    this.formaTraslados.get('fecha')?.setValue(""); 
    this.formaTraslados.get('fojas')?.setValue(""); 
    this.foto_nombre = "./assets/img/no-image.jpg";
    this.formaTraslados.get('vigente')?.setValue("");
    this.formaTraslados.get('confirmado')?.setValue("");
    this.formaTraslados.controls['confirmado'].disable();

    this.nuevoTraslado=false;

    return Object.values(this.formaTraslados.controls).forEach(control => control.markAsUntouched());
  }
  //FIN LIMPIAR FORMULARIO TRASLADO
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
    let dni: number = parseInt(this.formaTraslados.get('dni_buscar')?.value);
    this.personalService.buscarPersonalXDni(dni)
      .subscribe(
        personal => {
          this.dataPersonal = personal;

          this.nombreCompletoPersonal(this.dataPersonal!);
          this.formaTraslados.get('grado_apellido_nombre')?.setValue(this.nombreCompleto);
          this.formaTraslados.get('legajo')?.setValue(this.dataPersonal.legajo);
          this.formaTraslados.get('dni_personal')?.setValue(this.dataPersonal.dni);

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
            Swal.fire('Buscar personal',`No se encuentra al personal: ${error.error.message}`,"error")                          
        }
      );
      

  }
  //fin buscar personal.......................................................

}
