import { Component} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
constructor(private fb: FormBuilder) { };

public formSubmitted = false;

public registerForm = this.fb.group({
  nombre: ['Fernando', Validators.required],
  email: ['xxavierargentino@gmail.com', [Validators.email, Validators.required] ],
  password1: ['123456', Validators.required],
  password2: ['123456', Validators.required],
  terminos: [false, Validators.required]
});

crearUsuario(){
  this.formSubmitted = true;
  console.log(this.registerForm.value);
  console.log('EL VALOR DE LA BANDERA', this.formSubmitted);
}

campoNoValido(campo: string): boolean{
  if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
  }else{
      return false;
  }
}
  

}
