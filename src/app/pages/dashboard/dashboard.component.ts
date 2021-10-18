import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { EventoModel } from '../../models/evento.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  newFileDialog: boolean = false;

  bsDatePickerConfig!: Partial<BsDatepickerConfig>;
  regEvento: Partial<EventoModel> = new EventoModel();
  listaEventos: Partial<EventoModel>[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { 
        title: 'event 1', 
        date: '2021-10-20' 
      },
      { 
        title: 'event 2', 
        date: '2021-10-21' 
      },
      {
        title: "evento 1",
        date: '2021-10-14',
        description: "El evento 1"

      },
      {
        title: "evento 2",
        date: '2021-10-15',
        description: "El evento 2"
      },
      {
        title: "evento 3",
        date: '2021-10-16',
        description: "El evento 3"
      }
    ],
    editable: true 
    
  };

  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
    this.regEvento.fecha_inicio= arg.dateStr;
    this.newFileDialog = true;
  }

  constructor(
    public readonly datePipe: DatePipe,
  ) 
  { 
    

    //configuracion de datepicker
    this.bsDatePickerConfig = Object.assign({}, 
      { isAnimated: true, 
        dateInputFormat: 'DD/MM/YYYY', 
        containerClass: 'theme-dark-blue' 
    
      });
  }

  ngOnInit(): void {
  }

  nuevoEvento(){
    // if(pdf.fecha_documento != null){
    //   //debe ser MM-dd-yyyy porque el tipo Date recibe ese formato... con dd-MM-yyyy intercambia mes con dia
    //   let auxiliar = this.datePipe.transform(pdf.fecha_documento, "MM-dd-yyyy");
    //   pdf.fecha_documento = new Date(auxiliar!);
           
    // }
    // this.tituloFormPdf="Editar Registro Pdf"
    // this.editandoPdf = true;
    // this.regPdf = {...pdf};
    let data: Partial<EventoModel>;
    data = {
        detalle: this.regEvento.detalle,
        indice: this.regEvento.indice,
        fecha_inicio: this.regEvento.fecha_inicio!
    }
    console.log("nuevo evento ",data);
    this.listaEventos.push(data);
    console.log("Lista Eventos", this.listaEventos);
    this.ocultarDialogo();
  }

  ocultarDialogo(){
    
    this.newFileDialog = false
  }  

}
