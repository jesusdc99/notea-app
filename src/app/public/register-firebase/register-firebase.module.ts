import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFirebasePageRoutingModule } from './register-firebase-routing.module';

import { RegisterFirebasePage } from './register-firebase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterFirebasePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterFirebasePage]
})
export class RegisterFirebasePageModule {}
