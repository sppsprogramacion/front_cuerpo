 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { DashboardComponent } from './dashboard/dashboard.component';
 import { PagesComponent } from './pages.component';
 import { SharedModule } from '../shared/shared.module';
 import { RouterModule } from '@angular/router';
 import { HttpClientModule } from '@angular/common/http';
import { EditModule } from './edit/edit.module';
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { UsuariosModule } from './mantenimiento/usuarios.module';
import { ngPrimeModule } from '../ngprime.module';
import { FotopersonalPipe } from '../pipes/fotopersonal.pipe';
import { PipesModule } from '../pipes/pipes.module';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// If any issue using previous fonts import. you can try this:
// import pdfFonts from "pdfmake/build/vfs_fonts";

// registrar las fuentes
PdfMakeWrapper.setFonts(pdfFonts);

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);



 @NgModule({
  declarations: [
     DashboardComponent,
     PagesComponent    
   ],
   exports: [
     DashboardComponent,
     PagesComponent,
     ngPrimeModule,
     PipesModule
      ],
   imports: [
     CommonModule,
     SharedModule,
     RouterModule,
     EditModule,
     ListModule,
     UploadModule,
     UsuariosModule,
     HttpClientModule,
     ngPrimeModule,
     PipesModule,
     FullCalendarModule
   ]
 })
export class PagesModule { }
