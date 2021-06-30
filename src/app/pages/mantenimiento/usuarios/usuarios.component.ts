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
selectedProducts = [];
  
     submitted: boolean = false;

//     statuses: any[];


    openNew() {
         this.usuario = new Usuario();
         this.editando = false;
         this.submitted = false;
         this.userDialog = true;
    }

    deleteSelectedProducts() {
        // this.confirmationService.confirm({
        //     message: 'Are you sure you want to delete the selected products?',
        //     header: 'Confirm',
        //     icon: 'pi pi-exclamation-triangle',
        //     accept: () => {
        //         this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        //         this.selectedProducts = null;
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        //     }
        // });
    }

    editProduct(usuarioEdit: Usuario) {
        this.editando = true;
        this.usuario = {...usuarioEdit, fotoUrl: ""};
         this.userDialog = true;
           }

    deleteProduct(usuario: Usuario) {
        // this.confirmationService.confirm({
        //     message: 'Are you sure you want to delete ' + product.name + '?',
        //     header: 'Confirm',
        //     icon: 'pi pi-exclamation-triangle',
        //     accept: () => {
        //         this.products = this.products.filter(val => val.id !== product.id);
        //         this.product = {};
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        //     }
        // });
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

         
 

        // if (this.product.name.trim()) {
        //     if (this.product.id) {
        //         this.products[this.findIndexById(this.product.id)] = this.product;                
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        //     }
        //     else {
        //         this.product.id = this.createId();
        //         this.product.image = 'product-placeholder.svg';
        //         this.products.push(this.product);
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        //     }

        //     this.products = [...this.products];
        //     this.productDialog = false;
        //     this.product = {};
        // }
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
