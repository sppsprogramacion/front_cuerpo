import { Component, OnInit } from '@angular/core';
import { globalConstants } from './common/global-constants';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tema: boolean = globalConstants.temaOscuro;
  title = 'legajosApp';

  constructor(
    private primengConfig: PrimeNGConfig
  ){}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.tema = globalConstants.temaOscuro;
  }

}

