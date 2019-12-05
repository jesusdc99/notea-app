import { map, mapTo, race } from 'rxjs/operators';
import { note } from './../model/note';
import { Observable, Subscription, interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  myCollection: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore) {
    this.myCollection = fireStore.collection<any>(environment.collection);
  }

  readTODO(): Observable<firebase.firestore.QuerySnapshot> {
    return this.myCollection.get();
  }

  addTODO(myNote: note): Promise<firebase.firestore.DocumentReference> {
    return this.myCollection.add(myNote);
  }

  readTODOByID(id: string): Observable<firebase.firestore.DocumentSnapshot> {
    return this.myCollection.doc(id).get();
  }

  // Se podria haber hecho mejor creando un campo id opcional en el tipo note
  updateTODO(id: string, data: note): Promise<void> {
    return this.myCollection.doc(id).set(data);
  }

  deleteTODO(id: string): Promise<void> {
    return this.myCollection.doc(id).delete();
  }

  // Creando un observable
  readTODO2(timer: number = 10000,): Observable<note[]> {
    return new Observable((observer) => {
      // observer.next // Devolver valor
      // observer.error() // Devolver error
      // observer.complete() // Cortar ejecucion
      let subscription: Subscription;
      let tempo = setTimeout(() => {
        subscription.unsubscribe();
        observer.error("Timeout"); // Lo que le pasamos al catch
      }, timer);
      subscription = this.readTODO().subscribe((lista) => {
        clearTimeout(tempo);
        let listado = [];
        lista.docs.forEach((nota) => {
          listado.push({ id: nota.id, ...nota.data() }); // Uso del spread operator - junta 2 objetos
        });
        observer.next(listado);
        observer.complete();
      });
    });
  }

  // Usando operadores rxjs (recomendado)
  /*readTODO_race(timer: number = 10000): Observable<firebase.firestore.DocumentSnapshot> {
    let o1 = this.myCollection.get();
    // .pipe(map((lista) => { }));
    let o2 = interval(timer).pipe(mapTo(null));
    return race(o1,o2);
  }*/

  /**
   * TAREA: read note where...
   */
   //Notas que el titulo sea compra
  readTODOByCriteria(){}

}
