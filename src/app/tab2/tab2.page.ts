import { Subscription } from 'rxjs';
import { note } from './../model/note';
import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listadoPanel: any[];

  constructor(private todoS: TodoserviceService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.refrescar();
  }

  ionViewDidEnter() {
    //this.refrescar();
  }

  private refrescar() {
    this.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando notas");
    let subscription: Subscription;
    /*let tempo: any;
    tempo = setTimeout(() => {
      this.loadingController.dismiss();
      // Mostar error
      subscription.unsubscribe();
    }, 10000);*/
    try {
      /*subscription = this.todoS.readTODO2().subscribe((lista) => {
        // Cortar tempo porque ha llegado antes de los 10s
        clearTimeout(tempo);*/
      this.todoS.readTODO2().subscribe((lista) => {
        this.listadoPanel = lista;
        this.loadingController.dismiss();
        console.log("Notas cargadas");
      });
    } catch (error) {
      this.loadingController.dismiss();
    }
    console.log("Petición solicitada");
  }

  editaNota(id: string) { }

  borraNota(id: string) {
    console.log("Borrando item");
    this.todoS.deleteTODO(id)
      .then((salida) => {
        this.refrescar();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  irInicio(): void {
    this.router.navigateByUrl('/tabs/tab1');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
  }

  doRefresh(event) {
    this.listadoPanel = [];
    console.log("Cargando notas");
    let myObservable = this.todoS.readTODO();
    myObservable.subscribe((lista) => {
      this.listadoPanel = [];
      lista.docs.forEach((nota) => {
        this.listadoPanel.push({ id: nota.id, ...nota.data() }); // Uso del spread operator - junta 2 objetos
      });
      event.target.complete();
      console.log("Notas cargadas");
    });
    console.log("Petición solicitada");
  }


}
