import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutsComponent} from "./components/layouts/master/layouts.component";
import {LoginComponent} from "./components/layouts/pages/login/login.component";
import {RegisterComponent} from "./components/layouts/pages/register/register.component";
import {WalletInfoComponent} from "./components/wallets/wallet-info/wallet-info.component";
import {WalletCreateComponent} from "./components/wallets/wallet-create/wallet-create.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'wallet',
        children: [
          {
            path: '',
            component: WalletInfoComponent
          },
          {
            path: 'create',
            component: WalletCreateComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
