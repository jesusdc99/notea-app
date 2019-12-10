import { ToastserviceService } from './../../services/toastservice.service';
import { Router } from '@angular/router';
import { AuthenticationserviceService } from './../../services/authenticationservice.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: string;
  public pass: string;

  constructor(public auth: AuthenticationserviceService,
    private router: Router,
    private toastS: ToastserviceService) { }

  ngOnInit() {
  }

  // No usado
  login() {
    this.auth.setLoggedIn(true)
    this.router.navigateByUrl("/", { skipLocationChange: true });
  }

  // No usado
  logout() {
    this.auth.setLoggedIn(false)
    this.router.navigateByUrl("/login", { skipLocationChange: true });
  }

  doLogin() {
    let success: boolean = this.auth.loginAttemp(this.user,this.pass);
    if(!success) {
      this.toastS.showOnceToast('Credenciales incorrectos');
    }
  }

}
