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
   correo: ['',[Validators.required, Validators.email]],
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
                                      this.router.navigateByUrl('dashboard');
                                    }, err => {
                                      Swal.fire({
                                        title: 'Error Login!',
                                        text: err.error.message,
                                        icon: 'error'                                            
                                      })
                                    });
  }

  
}
