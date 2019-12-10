import { ToastServiceService } from './../services/toast-service.service';
import { AuthenticationserviceService } from './../services/authenticationservice.service';
import { Subscription } from 'rxjs';
import { note } from './../model/note';
import { Component } from '@angular/core';
import { TodoserviceService } from '../services/todoservice.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listadoPanel: any[];
  public textoBuscar: string;

  constructor(private todoS: TodoserviceService,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    public auth: AuthenticationserviceService,
    private toastS: ToastServiceService) { }

  ngOnInit() {
    this.refrescar();
  }

  ionViewDidEnter() {
    //this.refrescar();
  }

  private refrescar(): void {
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
        console.log('Notas cargadas');
      });
    } catch (error) {
      this.loadingController.dismiss();
    }
    console.log('Petición solicitada');
  }

  editaNota(id: string): void {
    let currentNote: note;
    this.todoS.readTODOByID(id).subscribe((item) => {
      //console.log(item.data().title);
      //console.log(item.data().description);
      console.log('Editando nota');
      currentNote = {
        title: item.data().title,
        description: item.data().description
      };
      this.presentAlertPrompt(id, currentNote);
    });
  }

  borraNota(id: string): void {
    this.presentAlertConfirm(id);
  }

  irInicio(): void {
    this.router.navigateByUrl('/tabs/tab1');
  }

  async presentLoading(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
  }

  doRefresh(event): void {
    this.listadoPanel = [];
    console.log('Cargando notas');
    let myObservable = this.todoS.readTODO();
    myObservable.subscribe((lista) => {
      this.listadoPanel = [];
      lista.docs.forEach((nota) => {
        this.listadoPanel.push({ id: nota.id, ...nota.data() }); // Uso del spread operator - junta 2 objetos
      });
      event.target.complete();
      console.log('Notas cargadas');
    });
    console.log('Petición solicitada');
  }

  async presentAlertConfirm(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar nota',
      message: '¿Estás seguro que deseas eliminar <strong>permanentemente</strong> la nota? Esta acción no se puede revertir.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Borrado cancelado');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log('Borrando item');
            this.todoS.deleteTODO(id)
              .then((salida) => {
                this.refrescar();
                this.toastS.showOnceToast('Nota eliminada');
              })
              .catch((err) => {
                console.log(err);
                this.toastS.showOnceToast('Error al eliminar la nota');
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt(id: string, nota: note): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Editar nota',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: nota.title,
          placeholder: 'Título'
        },
        {
          name: 'descripcion',
          type: 'text',
          value: nota.description,
          placeholder: 'Descripción'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edicion cancelada');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {
            console.log('Edicion confirmada');
            let editedNote: note;
            editedNote = {
              title: alertData.titulo,
              description: alertData.descripcion
            };
            this.todoS.updateTODO(id, editedNote)
              .then(() => {
                this.refrescar();
                this.toastS.showOnceToast('Nota modificada correctamente');
              })
              .catch(() => {
                this.toastS.showOnceToast('Error al actualizar la nota');
              });
          }
        }
      ]
    });

    await alert.present();
  }

  buscar($event): void {
    this.textoBuscar = $event.detail.value;
  }

}