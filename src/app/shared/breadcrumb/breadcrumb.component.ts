import { Component, OnInit } from '@angular/core';
import { globalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnInit {
  destino_nombre: string="";
  destino_id!: number;
  constructor() { }

  ngOnInit(): void {
    this.destino_nombre = globalConstants.destino_nombre;
    this.destino_id = globalConstants.destino_usuario;
  }

}
