import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

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
                                    .subscribe(respuesta => {
                                      Swal.fire({
                                        title: "Logeo Exitoso",
                                        text: "Ha ingresado a la Aplicación",
                                        icon: 'success'
                                        
                                      });
                                      //este codigo coloca un valor en el localStorage para validar el guard pero es temporal
                                      localStorage.setItem('validado', "true");


                                      this.router.navigateByUrl('dashboard');
                                      // console.log('EL VALOR DE RECUERDAME ES >>>>>', this.loginForm.get('recuerdame')?.value);
                                      // console.log('EL VALOR DE CORREO ES >>>>>', this.loginForm.get('correo')?.value);
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
                                      localStorage.setItem('validado', "false");
                                    });
  }

  
}
