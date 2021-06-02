import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const tablaScripts: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
       tablaScripts();
  }

  ngOnInit(): void {
  }

}
