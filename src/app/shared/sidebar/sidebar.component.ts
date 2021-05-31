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

  constructor(
    private sidebarService: SidebarService
  ) { 
   
    this.menu = this.sidebarService.menu;
    
    this.imgUrl = globalConstants.urlImagen;
    this.nombreUsuario = globalConstants.nombreUsuario;
    this.emailUsuario = globalConstants.emailUsuario;
    
  }
  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');

  }
     

}
