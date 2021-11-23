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

  //CALENDARIO
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

  //FIN CALENDARIO

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

  
  //GRAFICO CIRCULOS
  //ancho y alto del grafico, es una tupla de number
  view: [number,number] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };  

  onSelect(data: any): void {
    console.log(data);
  }  
  
  //FIN GRAFICO CIRCULOS..................................

  //GRAFICO BARRA VERTICAL
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  //showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Unidades';
  showYAxisLabel = true;
  yAxisLabel = 'Canidad Personal';

  colorScheme2 = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  //FIN GRAFICO BARRA VERTICAL.................................................

  //DATOS PARA GRAFICOS
  unidades = [
    {
      "name": "U.C. N° 1",
      "value": 300
    },
    {
      "name": "U.C. N° 2",
      "value": 130
    },
    {
      "name": "U.C. N° 3",
      "value": 145
    },
    {
      "name": "U.C. N° 4",
      "value": 100
    },
    {
      "name": "U.C. N° 5",
      "value": 150
    },
    {
      "name": "U.C. N° 6",
      "value": 80
    }
  ]
  //FIN DATOS PARA GRAFICOS..................................................
  
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
