import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginFirebasePageRoutingModule } from './login-firebase-routing.module';

import { LoginFirebasePage } from './login-firebase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginFirebasePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginFirebasePage]
})
export class LoginFirebasePageModule {}
