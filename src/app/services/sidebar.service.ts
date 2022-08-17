import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuAdmin: any [] = [
    {
      titulo: 'Personal',
      icono: 'fas fa-user-friends',
      submenu:[
        {titulo: 'Cargar', url: 'upload'},
        // {titulo: 'Editar', url: 'edit'},
        {titulo: 'Listar', url: 'list'},
      ]
    },
    {
      titulo: 'Traslados',
      icono: 'fas fa-running',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-traslados'},
        {titulo: 'Listar', url: 'listar-traslados'},
      ]
    },
    {
      titulo: 'Ascensos',
      icono: 'fas fa-running',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-ascensos'}
      ]
    },
    {
      titulo: 'Sanciones',
      icono: 'fas fa-id-badge',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-sanciones'},
        {titulo: 'Listar', url: 'listar-sanciones'},
      ]
    },
    {
      titulo: 'Licencias',
      icono: 'fas fa-file-contract',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-licencias'},
        {titulo: 'Listar', url: 'listar-licencias'},
      ]
    },
    {
      titulo: 'Reconocimiento',
      icono: 'fas fa-notes-medical',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-carpetas'},
        {titulo: 'Listar', url: 'listar-carpetas'},
      ]
    },
    {
      titulo: 'Usuarios',
      icono: 'fas fa-users',
      submenu:[
        {titulo: 'Mantenimiento', url: 'usuarios'}
            ]
    }
  ];

  menuUser: any [] = [
    {
      titulo: 'Personal',
      icono: 'fas fa-tachometer-alt',
      submenu:[
        {titulo: 'Cargar', url: 'upload'},
        // {titulo: 'Editar', url: 'edit'},
        {titulo: 'Listar', url: 'list'},
      ]
    },
    {
      titulo: 'Traslados',
      icono: 'fas fa-running',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-traslados'},
        {titulo: 'Listar', url: 'listar-traslados'},
      ]
    },   
  ];

  menuSanciones: any [] = [
    {
      titulo: 'Sanciones',
      icono: 'fas fa-tachometer-alt',
      submenu:[
        {titulo: 'Agregar', url: 'agregar-sanciones'},
        {titulo: 'Listar', url: 'listar-sanciones'},
      ]
    }   
  ];

  menuLicencias: any [] = [
    {
      titulo: 'Licencias',
      icono: 'fas fa-file-contract',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-licencias'},
        {titulo: 'Listar', url: 'listar-licencias'},
      ]
    }   
  ];

  menuReconocimiento: any [] = [
    {
      titulo: 'Reconocimiento',
      icono: 'fas fa-notes-medical',
      submenu:[
        {titulo: 'Cargar', url: 'agregar-carpetas'},
        {titulo: 'Listar', url: 'listar-carpetas'},
      ]
    }   
  ];

  constructor() { }
}
