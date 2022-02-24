import { Component, OnInit } from '@angular/core';
import { TrasladoModel } from 'src/app/models/traslado.model';
import { PersonalService } from 'src/app/services/personal.service';
import { TrasladosService } from 'src/app/services/traslados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-traslados-listar',
  templateUrl: './traslados-listar.component.html',
  styles: [
  ]
})
export class TrasladosListarComponent implements OnInit {

  //variables de manejo de traslado
  dataTraslado: TrasladoModel= new TrasladoModel;
  listaTraslado: any[]=[];
  totalRecords: number = 0;

  constructor(
    private readonly personalService: PersonalService,
    private readonly trasladoService: TrasladosService
  ) { 
    this.listarTraslados()
  }

  ngOnInit(): void {
  }

  //LISTADO DE TRASLADOS
  listarTraslados(){
    
    this.trasladoService.getNuevosXDestino().
      subscribe(respuesta => {
        this.totalRecords = respuesta[1];
        this.listaTraslado = respuesta[0];
    
      });
  }
  //FIN LISTADO DE TRASLADOS

  //CONFIRMAR TRASLADO
  confirmarTraslado(id_trasladox: number){
    let data: Partial<TrasladoModel>;

    data={
      
      confirmado: true
    }

    //ACTUALIZAR TRASLADO
    this.trasladoService.editarTraslado(data,id_trasladox)
    .subscribe(resultado => {
      
        Swal.fire('Confirmar traslado',`El Traslado ha sido confirmado con Exito`,"success");
        this.listarTraslados();
        
        
    },
    error => {
        
        Swal.fire('Confirmar traslado',`Error al confirmar el traslado: ${error.error.message}`,"error")                          
    });
    //FIN ACTUALIZAR TRASLADO

  }

  //FIN CONFIRMAR TRASLADO

}
