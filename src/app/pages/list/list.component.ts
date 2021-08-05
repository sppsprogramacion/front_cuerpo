import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../services/personal.service';
import { Personal, IPersonalTable } from '../../models/personal.model';
import { globalConstants } from '../../common/global-constants';
import { destinos, escalafon, escalaJerarquica, grados, nivelEducativo, sexos, situacion, departamentos } from 'src/app/common/data-mockeada';
//import * as path from 'path';
import { DataService } from '../../services/data.service';
import { FotopersonalPipe } from '../../pipes/fotopersonal.pipe';

import * as printJS from 'print-js';

interface IObjectModel{
  label: string; 
  value: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
      './list.component.scss'
  ]
})
export class ListComponent implements OnInit {
  personalList: Personal[]=[];
  dataTable: IPersonalTable[]=[];
  totalRecords: number = 0;
  selectedPersonal: IPersonalTable[]=[];
  grados: {label: string, value: string,img_name: string}[]=[];
  loading: boolean = true;
  sexos: IObjectModel[]=[];
  destinos: IObjectModel[] = [];
  escalafones: IObjectModel[] = [];
  escalas: IObjectModel[] = [];
  nivel_educativo: IObjectModel[] = [];
  situacion: IObjectModel[] = [];
  departamentos: IObjectModel[] = [];
  urlEdit: string = '../edit';
    // cols: any[];

    // loading: boolean;
    
    // representatives: Representative[];

    constructor(
      private personalService: PersonalService,
      public dataService: DataService
      ) { }

  ngOnInit() {
        const destino: number = globalConstants.destino_usuario;
        this.personalService.listarPersonal(destino).
                        subscribe(respuesta => {
            this.totalRecords = respuesta[1];
            this.personalList = respuesta[0];
            const lista = respuesta[0];
            
              });

              this.grados = grados.map(respuesta => {
                    return {
                      label: respuesta.grado.toLowerCase(),
                      value: respuesta.grado,
                      img_name: respuesta.grado.replace(' ','_')
                      }
              });
              
              this.sexos = sexos.map(respuesta => {
                return {
                  label: respuesta.sexo.toLowerCase(),
                  value: respuesta.sexo,
                 }
          });

          this.destinos = destinos.map(respuesta => {
            return {
              label: respuesta.destino.toLowerCase(),
              value: respuesta.destino } 
            });
          this.escalafones = escalafon.map(respuesta => {
            return {
              label: respuesta.escalafon.toLowerCase(),
              value: respuesta.escalafon } 
            });

          this.escalas = escalaJerarquica.map(respuesta => {
            return {
              label: respuesta.escala_jerarquica.toLowerCase(),
              value: respuesta.escala_jerarquica } 
            });

          this.nivel_educativo = nivelEducativo.map(respuesta => {
            return {
              label: respuesta.nivel_educativo.toLowerCase(),
              value: respuesta.nivel_educativo } 
            });

          this.situacion = situacion.map(respuesta => {
            return {
              label: respuesta.situacion.toLowerCase(),
              value: respuesta.situacion } 
            });

          this.departamentos =  departamentos.map(respuesta => {
              return {
                label: respuesta.departamento.toLowerCase(),
                value: respuesta.departamento } 
              });

              this.loading = false;
    

     }

     EditarPersonal(data: Personal){
       this.dataService.personalData = data;
     }

     printTabla() {
      
      printJS({
        
        printable: document.getElementById('personal-table'), 
        type: 'html', 
        header: 'PrintJS - Form Element Selection'

      })
    }

    // cargarListaPersonal(event: LazyLoadEvent) {  
    //     this.loading = true;

    //     setTimeout(() => {
    //         this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
    //             this.customers = res.customers;
    //             this.totalRecords = res.totalRecords;
    //             this.loading = false;
    //         })
    //     }, 1000);
    // }

  }
