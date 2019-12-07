import { note } from './../model/note';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public todoForm: FormGroup;
  public flashToggled: boolean;

  constructor(private fb: FormBuilder,
    private todoS: TodoserviceService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private flashlight: Flashlight) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
    this.flashToggled = false;
  }

  addNote(): void {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    };

    this.presentLoading();

    this.todoS.addTODO(data)
      .then((ok) => {
        this.presentToast('Nota guardada', 'dark');
        this.todoForm.reset();
      })
      .catch((err) => {
        this.presentToast('Error al guardar nota', 'dark', 4000);
      })
      .finally(() => {
        this.loadingController.dismiss();
      });
  }

  async presentLoading(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Guardando'
    });
    await loading.present();
  }

  async presentToast(msg: string, col: string, dur: number = 2000, ): Promise<void> {
    const toast = await this.toastController.create({
      message: '<ion-icon name="information-circle-outline"></ion-icon> ' + msg,
      duration: dur,
      color: col
    });
    toast.present();
  }

  doFlashlight(): void {
    console.log('Flashlight...');
    this.flashToggled = !this.flashToggled;
    if (this.flashToggled)
      this.flashlight.switchOn();
    else this.flashlight.switchOff();
  }
}
