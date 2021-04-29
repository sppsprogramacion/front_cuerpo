import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
constructor(
  private fb: FormBuilder,
  private usuario: UsuariosService
  ) { };

public formSubmitted = false;

public registerForm = this.fb.group({
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  dni: ['', Validators.required],
  correo: ['', [Validators.email, Validators.required] ],
  clave: ['', Validators.required],
  clave2: ['', Validators.required],
  
},{
  validators: this.passwordsIguales('clave','clave2')
});

crearUsuario(){
   this.formSubmitted = true;
   if(this.registerForm.invalid){
    return;
     
   }

   this.usuario.crearUsuario(this.registerForm.value)
                                         .subscribe(respuesta => {
                                              console.log(respuesta);
                                         }, (err) => {
                                           
                                          Swal.fire({
                                            title: 'Error!',
                                            text: err.error.message,
                                            icon: 'error'                                            
                                          })
                                         });
  
}

campoNoValido(campo: string): boolean{
  if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
  }else{
      return false;
  }
}

contrasenaValida(){
  const pass1 = this.registerForm.get('clave')?.value;
  const pass2 = this.registerForm.get('clave2')?.value;
  
  if((pass1 !== pass2) && (this.formSubmitted) || ((this.registerForm.get('clave')?.invalid) && (this.formSubmitted)) && (this.registerForm.get('clave2')?.invalid) && (this.formSubmitted)){
       return false;
     }
    else {
      return true;
    }
}

passwordsIguales(pas1: string, pas2: string){
  return (formGroup: FormGroup ) => {
        const pass1 = formGroup.get(pas1);
        const pass2 = formGroup.get(pas2);
        if(pass1?.value === pass2?.value){
                pass2?.setErrors(null);
        }else{
                 pass2?.setErrors({noEsIgual: true});
        }
  }
}


 }