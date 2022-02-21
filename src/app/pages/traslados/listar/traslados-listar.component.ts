import { Component, OnInit } from '@angular/core';
import { TrasladoModel } from 'src/app/models/traslado.model';

@Component({
  selector: 'app-traslados-listar',
  templateUrl: './traslados-listar.component.html',
  styles: [
  ]
})
export class TrasladosListarComponent implements OnInit {

  //variables de manejo de traslado
  dataTraslado: TrasladoModel= new TrasladoModel;
  listaTraslado: TrasladoModel[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
