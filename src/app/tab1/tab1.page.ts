import { ToastserviceService } from './../services/toastservice.service';
import { AuthenticationserviceService } from './../services/authenticationservice.service';
import { note } from './../model/note';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';
import { LoadingController } from '@ionic/angular';
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
    private flashlight: Flashlight,
    public auth: AuthenticationserviceService,
    private toastS: ToastserviceService) { }

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
        this.toastS.showOnceToast('Nota guardada');
        this.todoForm.reset();
      })
      .catch((err) => {
        this.toastS.showOnceToast('Error al guardar nota');
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

  doFlashlight(): void {
    console.log('Flashlight...');
    this.flashToggled = !this.flashToggled;
    if (this.flashToggled)
      this.flashlight.switchOn();
    else this.flashlight.switchOff();
  }
}
