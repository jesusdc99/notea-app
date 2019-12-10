import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  public toastInstance: any;

  constructor(private toastController: ToastController) { }

  // Call this method
  showOnceToast(msg: string, color: string = 'dark', dur: number = 2000) {
    this.toastController.dismiss()
      .then((obj) => { })
      .catch(() => { })
      .finally(() => {
        this.manageToast(msg, color, dur);
      });
  }

  private manageToast(msg: string, color: string, dur: number) {
    this.toastInstance = this.toastController.create({
      message: '<ion-icon name="information-circle-outline"></ion-icon> ' + msg,
      color: color,
      duration: dur,
      animated: true,
      position: "bottom"
    }).then((obj) => {
      obj.present();
    });
  }

}