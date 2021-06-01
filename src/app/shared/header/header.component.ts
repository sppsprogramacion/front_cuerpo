import { Component, OnInit } from '@angular/core';
import { globalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  tema: boolean = globalConstants.temaOscuro;
  constructor() { }

  ngOnInit(): void {
  }

  cambiarTema(){
    globalConstants.temaOscuro = !globalConstants.temaOscuro;
    console.log('EL VALOR DE TEMA OSCURO ES >>>>', globalConstants.temaOscuro);
  }

}
