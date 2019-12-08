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
    private toastController: ToastController) { }

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
      this.presentToastLoginFailed();
    }
  }

  async presentToastLoginFailed(): Promise<void> {
    const toast = await this.toastController.create({
      message: '<ion-icon name="information-circle-outline"></ion-icon> Credenciales incorrectos',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }

}
