import { AfterViewInit, Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../../models/usuario.model';



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
    //usuariofrm: IUsuario = {};
  //constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  //constructor(private messageService: MessageService) { }
    constructor(
        private readonly usuariosService: UsuariosService
    ){}
  ngOnInit() {
    
        this.usuariosService.getUsuarios().subscribe(resultado => {
            this.total = resultado[1];
            this.usuarios = resultado[0];
                console.log(this.usuarios);
             });
    //   this.statuses = [
    //       {label: 'INSTOCK', value: 'instock'},
    //       {label: 'LOWSTOCK', value: 'lowstock'},
    //       {label: 'OUTOFSTOCK', value: 'outofstock'}
    //   ];
  }
   productDialog: boolean = false;
  
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
         this.productDialog = true;
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

    editProduct(usuario: Usuario) {
        this.editando = true;
        // this.product = {...product};
        this.usuario = {...usuario, fotoUrl: ""};
         this.productDialog = true;
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
         this.productDialog = false;
        // this.submitted = false;
    }
    
    saveProduct() {
         this.submitted = true;

         if(this.editando){
            console.log('ENTRANDO A MODO EDICION');
         }else{
             console.log('ENTRANDO A MODO CARGA DE DATO NUEVO');
             
            const nuevo =  this.usuariosService.crearUsuario(this.usuario).subscribe(resultado => {
                console.log(resultado);
            },
            error => {
                console.log('HA OCURRIDO UN ERROR', error);
            }
            );
            
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
