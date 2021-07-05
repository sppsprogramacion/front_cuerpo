import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../services/personal.service';
import { Personal } from '../../models/personal.model';
import { globalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
      './list.component.scss'
  ]
})
export class ListComponent implements OnInit {

  

  personalList: Personal[]=[];
  dataTable: Partial<Personal>[]=[];
    // totalRecords: number;

    // cols: any[];

    // loading: boolean;
    
    // representatives: Representative[];

    constructor(private personalService: PersonalService) { }

    ngOnInit() {
        const destino: number = globalConstants.destino_usuario;
        this.personalService.listarPersonal(destino).
                        subscribe(respuesta => {
            this.personalList = respuesta[0];                    
            console.log('VALOR DE LA LISTA DE PERSONAL: ', this.personalList);
        });
        //     this.loading = true;
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
