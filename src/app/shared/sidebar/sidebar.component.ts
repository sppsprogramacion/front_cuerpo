import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import Swal from 'sweetalert2';
import { globalConstants } from '../../common/global-constants';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menu: any[] = [];
  imgUrl: string = "";
  nombreUsuario: string = "";
  emailUsuario: string = "";

  constructor(
    private sidebarService: SidebarService
  ) { 
   
    this.menu = sidebarService.menu;
   
    // this.imgUrl = globalConstants.urlImagen;
    // this.nombreUsuario = globalConstants.nombreUsuario;
    // this.emailUsuario = globalConstants.emailUsuario;
      
   }
     

}
