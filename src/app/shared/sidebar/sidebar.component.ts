import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { globalConstants } from '../../common/global-constants';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menu: any[] = [];
  imgUrl: string = "";
  nombreUsuario: string = "";
  emailUsuario: string = "";
  icono: string = "";

  constructor(
    private sidebarService: SidebarService
  ) { 
   
    if(globalConstants.rol_usuario =='0'){
      this.menu = this.sidebarService.menuAdmin;
    }else{
      this.menu = this.sidebarService.menuUser;
    }

    
    this.imgUrl = globalConstants.urlImagen;
    this.nombreUsuario = globalConstants.nombreUsuario;
    this.emailUsuario = globalConstants.emailUsuario;
    
    
  }
  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');

  }
     

}
