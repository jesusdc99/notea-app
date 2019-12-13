import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFirebasePage } from './login-firebase.page';

const routes: Routes = [
  {
    path: '',
    component: LoginFirebasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginFirebasePageRoutingModule {}
