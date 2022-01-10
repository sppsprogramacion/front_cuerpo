import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuAdmin: any [] = [
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
      titulo: 'Sanciones',
      icono: 'fas fa-tachometer-alt',
      submenu:[
        {titulo: 'Agregar', url: 'agregar-sanciones'},
        {titulo: 'Listar', url: 'listar-sanciones'},
      ]
    },
    {
      titulo: 'Licencias',
      icono: 'fas fa-tachometer-alt',
      submenu:[
        {titulo: 'Agregar', url: 'agregar-licencias'},
        {titulo: 'Listar', url: 'listar-licencias'},
      ]
    },
    {
      titulo: 'Carpetas',
      icono: 'fas fa-tachometer-alt',
      submenu:[
        {titulo: 'Agregar', url: 'agregar-carpetas'},
        {titulo: 'Listar', url: 'listar-carpetas'},
      ]
    },
    {
      titulo: 'Usuarios',
      icono: 'fa-solid fa-user',
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
    }   
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

  constructor() { }
}
