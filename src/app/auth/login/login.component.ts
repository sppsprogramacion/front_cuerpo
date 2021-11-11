import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { globalConstants } from 'src/app/common/global-constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  
  extraerData(data: any) {
      //voy a desestructurar respuesta
       const {id_usuario, apellido, correo, dni, img, nombre, role, destino_id} = data;
       const user: Usuario = new Usuario();
       user.id_usuario = id_usuario;
       user.nombre = nombre;
       user.apellido = apellido;
       user.correo = correo;
       user.img = img;
       user.role = role;
       user.destino_id = destino_id;
       let correoAux: string = "";
       if(user.correo){
         correoAux= user.correo;
       }
       globalConstants.urlImagen = user.img!;                                      
       globalConstants.nombreUsuario = user.nombre + " " + user.apellido;
       globalConstants.inicialesUsuario= user.nombre?.charAt(0).toUpperCase() + "" + user.apellido?.charAt(0).toUpperCase();
       globalConstants.emailUsuario = correoAux;
       globalConstants.destino_usuario = user.destino_id!;
      console.log("data", data);
       globalConstants.rol_usuario = user.role!;
       globalConstants.id_usuario = user.id_usuario!;
  }

 public loginForm = this.fb.group({
   correo: [localStorage.getItem('email') || ' ',[Validators.required, Validators.email]],
   clave: ['',Validators.required],
   recuerdame: [false]
 });

  constructor(
    private fb: FormBuilder,
    private loginService: UsuariosService,
    private router: Router
  ) { }

  login(){
    return this.loginService.login(this.loginForm.value)
                                    .subscribe((respuesta) => {
                                      this.extraerData(respuesta);
                                     
                                      Swal.fire({
                                        title: "Logeo Exitoso",
                                        text: "Ha ingresado a la Aplicación",
                                        icon: 'success'                                     
                                      });
                                      
                                      //este codigo modifica una variable global para que el guard permita el acceso
                                      globalConstants.validado = true;
                                      console.log('EL USUARIO QUE INGRESA TIENE ESTE ROL', globalConstants.rol_usuario);
                                      
                                      this.router.navigateByUrl('dashboard');
                                      if(this.loginForm.get('recuerdame')?.value){
                                        localStorage.setItem('email', this.loginForm.get('correo')?.value);
                                      }else{
                                        localStorage.removeItem('email');
                                      }
                                    }, err => {
                                      Swal.fire({
                                        title: 'Error Login!',
                                        text: err.error.message,
                                        icon: 'error'                                            
                                      })
                                      globalConstants.validado = false;
                                    });
  }

  
}
