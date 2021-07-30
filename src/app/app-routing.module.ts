import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutsComponent} from "./components/layouts/master/layouts.component";
import {LoginComponent} from "./components/layouts/pages/login/login.component";
import {RegisterComponent} from "./components/layouts/pages/register/register.component";
import {AuthGuard} from "./AuthGuard/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,

  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
