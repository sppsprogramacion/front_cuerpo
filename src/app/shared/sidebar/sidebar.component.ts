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
  inicialesUsuario: string = "";
  emailUsuario: string = "";
  icono: string = "";

  constructor(
    private sidebarService: SidebarService
  ) { 
   
   
    
    
    switch(parseInt(globalConstants.rol_usuario)) { 
      case 0: {
      
        this.menu = this.sidebarService.menuAdmin;
         break; 
      }
      case 2: 
        this.menu = this.sidebarService.menuUser;
         break; 
      
      case 3: 
        this.menu = this.sidebarService.menuSanciones;
         break;      
      case 4: 
        this.menu = this.sidebarService.menuLicencias;
        break;    
      case 5: 
        this.menu = this.sidebarService.menuReconocimiento;
         break;      
             
    } 

    if(globalConstants.urlImagen== 'no-image.jpg'){
      this.imgUrl='./assets/img/no-image.jpg';
    }
    else{
      this.imgUrl = globalConstants.urlImagen;
    }
    
    this.nombreUsuario = globalConstants.nombreUsuario;
    this.inicialesUsuario = globalConstants.inicialesUsuario;
    this.emailUsuario = globalConstants.emailUsuario;
    
    
  }
  //FIN CONSTRUCTOR..............................................

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');

  }
     

}
