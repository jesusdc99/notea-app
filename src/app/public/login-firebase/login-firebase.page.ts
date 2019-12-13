import { Router } from '@angular/router';
import { AuthFirebaseService } from './../../services/auth-firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-firebase',
  templateUrl: './login-firebase.page.html',
  styleUrls: ['./login-firebase.page.scss'],
})
export class LoginFirebasePage implements OnInit {
  // basado en https://www.freakyjolly.com/ionic-4-firebase-login-registration-by-email-and-password/

  public validations_form: FormGroup;
  public errorMessage: string = '';

  constructor(
    private authService: AuthFirebaseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email es obligatorio.' },
      { type: 'pattern', message: 'Introduce un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contaseña debe tener al menos 5 caracteres.' }
    ]
  };


  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.router.navigateByUrl('/tabs/tab1');
      }, err => {
        this.errorMessage = err.message;
      })
  }

  goToRegisterPage() {
    this.router.navigateByUrl('/register');
  }
}
