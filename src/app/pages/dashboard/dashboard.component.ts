import { DatePipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { EventoModel } from '../../models/evento.model';
import { calendar } from 'ngx-bootstrap/chronos/moment/calendar';

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
  listaEventos: any[] = [
    { title: 'event 1', date: '2021-10-19' },
    { title: 'event 2', date: '2021-10-20' }
  ];

  // calendarOptions: CalendarOptions = {
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  //   },
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: this.listaEventos,
  //   editable: true 
    
  // };

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.listaEventos, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
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

  
  view: [number,number] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  

  onSelect(data: any): void {
    console.log(event);
  }


  single = [
    {
      "name": "Germany",
      "value": 20000
    },
    {
      "name": "USA",
      "value": 10000
    },
    {
      "name": "France",
      "value": 25000
    },
    {
      "name": "UK",
      "value": 10000
    },
    {
      "name": "Italy",
      "value": 25000
    },
    {
      "name": "Spain",
      "value": 10000
    }
  ]

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
    let data;
    data = {
        title: this.regEvento.detalle,
        date: this.regEvento.fecha_inicio!
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
