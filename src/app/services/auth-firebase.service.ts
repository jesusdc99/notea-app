import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(private firebase: AngularFireAuth,
    private router: Router) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.firebase.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.firebase.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.firebase.auth.currentUser) {
        this.firebase.auth.signOut()
          .then(() => {
            console.log("LOG Out");
            this.router.navigateByUrl('login-firebase');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.firebase.auth.currentUser;
  }

  isAuthenticated() {
    const user = this.firebase.auth.currentUser;
    if(user) return true;
    return false; 
  }
}
