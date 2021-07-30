import { AfterViewInit, Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import { IUserRole } from '../../../interfaces/usuario-role.interface';
import { DestinosService } from '../../../services/destino.service';
import { DestinoModel } from '../../../models/destino.model';
import { environment } from "src/environments/environment";
import { FileUploadService } from '../../../services/file-upload.service';

const base_url = environment.URL_BASE


@Component({
  selector: 'app-usuarios',
  templateUrl:  './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
providers: [MessageService,ConfirmationService]
})
export class UsuariosComponent implements OnInit {
    total: number = 0;
    usuarios: Usuario[] = [];
    usuario: Usuario = new Usuario();
    editando: boolean=false;
    roles: IUserRole[] = [];
    destinos: DestinoModel[]=[];
    selectedDestino: number=8;
    baseUrlImg: string = `${base_url}/usuarios/foto?foto_nombre=`;
    fotoSubir: File | undefined;
    
      //usuariofrm: IUsuario = {};
  //constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  //constructor(private messageService: MessageService) { }
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly destinosService: DestinosService,
        private readonly fileUploadService: FileUploadService
    ){
        this.roles = [
            {code: 0, role_name: "admin"},
            {code: 1, role_name: "super"},
            {code: 2, role_name: "normal"},
        ]
         }

  ngOnInit() {    
        this.usuariosService.getUsuarios().subscribe(resultado => {
            this.total = resultado[1];
            this.usuarios = resultado[0];
               });
             this.destinosService.listarDestinos().
                                     subscribe((resultado: any[]) => {
                                         let destinoItem: DestinoModel;
                                         const listado: any[] = resultado[0];
                                        const destinosLista: DestinoModel[] = listado.map(item =>  {
                                            destinoItem = {...item};
                                            return destinoItem;
                                        });
                                        this.destinos =  destinosLista;
                                        });
      }
      
    public actualizarUsuarios(){
        this.usuariosService.getUsuarios().subscribe(resultado => {
            this.total = resultado[1];
            this.usuarios = resultado[0];
               });
    }

      public getRole(code: number): string {
          let valor: string = " ";
            this.roles.forEach(r => {
              if(r.code === code){
                  valor =  r.role_name
              }
          });
          return valor;
          
        }
      
   userDialog: boolean = false;
  
//   products: Product[];
products = [];
  
//   product: Product;
  
//   selectedProducts: Product[];
selectedUsuarios: Usuario[] = [];
  
     submitted: boolean = false;

//     statuses: any[];


    openNew() {
         this.usuario = new Usuario();
         this.editando = false;
         this.submitted = false;
         this.userDialog = true;
    }

    deleteSelectedUsuarios() {
      const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })

      swalWithBootstrapButtons.fire({
            title: 'Confirma el borrado de los Usuarios ',
            text: "Esta Acción no podrá revertirse!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borrar los Usuarios Seleccionados',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                      this.selectedUsuarios.forEach(usuario => {
                      const id: number = parseInt(usuario.id_usuario!.toString());
                      this.usuariosService.deleteUsuario(id)
                                    .subscribe(resultado => {},
                                    error => {
                                        Swal.fire("Error al Elimnar el Usuario", error.error.message, "error");
                                    });
             });
             this.actualizarUsuarios();
             this.selectedUsuarios = [];
 
               
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
                'Se ha cancelado la eliminación de Usuarios :)',
                'error'
              )
            }
          })

        
        
    }

    editProduct(usuarioEdit: Usuario) {
        this.editando = true;
        this.usuario = {...usuarioEdit, fotoUrl: ""};
         this.userDialog = true;
           }

    deleteUsuario(usuario: Usuario) {
        const id: number = parseInt(usuario.id_usuario!.toString());

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Confirma el borrado del Usuario: ',
            text: "Esta Acción no podrá revertirse!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borrar Usuario',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                this.usuariosService.deleteUsuario(id)
                                    .subscribe(resultado => {
                                        this.actualizarUsuarios();
                                    },
                                    error => {
                                        Swal.fire("Error al Elimnar el Usuario", error.error.message, "error");
                                    });
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'El registro de Usuario ha sido borrado.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Se ha cancelado la eliminación del Usuario :)',
                'error'
              )
            }
          })

    }

    hideDialog() {
         this.userDialog = false;
        // this.submitted = false;
    }
    
    saveProduct() {
         this.submitted = true;

         if(this.editando){
                       
            if(this.usuario.id_usuario){
                let data: Partial<Usuario>;
                data = {
                    dni: this.usuario.dni,
                    nombre: this.usuario.nombre,
                    apellido: this.usuario.apellido,
                    correo: this.usuario.correo,
                    role: this.usuario.role,
                    destino_id: this.usuario.destino_id,
                        }
                                
                this.usuariosService.editUsuario(this.usuario.id_usuario, data)
                                        .subscribe(resultado => {
                                            Swal.fire('Exito',`El Registro ha sido editado con Exito`,"success");
                                            this.actualizarUsuarios();
                                            this.hideDialog();
                                        },
                                        error => {
                                            
                                            Swal.fire('Error',`Error al Editar el Usuario ${error.error.message}`,"error")                          
                                        });
                    }else{
                   
                            Swal.fire('Error',`Error al Editar el Usuario: Faltan Datos`,"error")
                           
                    }

         }else{
            
             
             this.usuariosService.crearUsuario(this.usuario).subscribe(resultado => {
                 this.hideDialog();
                 Swal.fire("Exito","Se ha agregado un Nuevo Usuario","success")
                 this.actualizarUsuarios();
                 this.hideDialog();
            },
            error => {
                      Swal.fire('Error',`Error al agregar el Usuario ${error.error.message}`,"error")
            });
            
         }


    }

    onUpload(event: File){
            try {
                console.log('DATA DEL ARCHIVO', event);
                this.fotoSubir = event;
                let id: number =  this.usuario.id_usuario! ;
               this.fileUploadService.actualizarFoto(this.fotoSubir, id).then(respuesta => {
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



    findIndexById(/*id: string): number*/) {
        // let index = -1;
        // for (let i = 0; i < this.products.length; i++) {
        //     if (this.products[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        // return index;
    }

    createId()/*: string*/ {
        // let id = '';
        // var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // for ( var i = 0; i < 5; i++ ) {
        //     id += chars.charAt(Math.floor(Math.random() * chars.length));
        // }
        // return id;
    }
  

  

}
