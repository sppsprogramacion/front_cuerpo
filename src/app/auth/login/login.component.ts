import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

 public loginForm = this.fb.group({
   correo: ['',Validators.required],
   clave: ['',Validators.required],
   recuerdame: [false]
 });

  constructor(
    private fb: FormBuilder,
    private loginService: UsuariosService
  ) { }

  login(){
    return this.loginService.login(this.loginForm.value)
                                    .subscribe(respuesta => {
                                      console.log('LOGEO EXITOSO!!',respuesta);
                                    }, err => {
                                      Swal.fire({
                                        title: 'Error Login!',
                                        text: err.error.message,
                                        icon: 'error'                                            
                                      })
                                    });
  }

  
}
