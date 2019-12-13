import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFirebasePage } from './register-firebase.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFirebasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFirebasePageRoutingModule {}
