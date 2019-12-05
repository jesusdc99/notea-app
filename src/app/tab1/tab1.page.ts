import { note } from './../model/note';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public todoForm: FormGroup;

  constructor(private fb: FormBuilder,
    private todoS: TodoserviceService,
    private loadingController: LoadingController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  addNote() {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    };

    this.presentLoading();

    this.todoS.addTODO(data)
      .then((ok) => {
        this.presentToast('Nota guardada', 'success');
        this.todoForm.reset();
      })
      .catch((err) => {
        this.presentToast('Error al guardar nota', 'danger', 4000);
      })
      .finally(() => {
        this.loadingController.dismiss();
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Guardando'
    });
    await loading.present();
  }

  async presentToast(msg: string, col: string, dur: number = 2000, ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: col
    });
    toast.present();
  }

}
