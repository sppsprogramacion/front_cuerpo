import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { globalConstants } from '../../common/global-constants';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menu: any[] = [];
  imgUrl: string = "";

  constructor(
    private sidebarService: SidebarService
  ) { 
    this.menu = sidebarService.menu;
    this.imgUrl = globalConstants.urlImagen;
    console.log('LA IMGURL ES ', this.imgUrl);
   }
     
  ngOnInit(): void {
  }

   
  

}
