import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutsComponent} from "./components/layouts/master/layouts.component";
import {LoginComponent} from "./components/layouts/pages/login/login.component";
import {RegisterComponent} from "./components/layouts/pages/register/register.component";

import {AuthGuard} from "./AuthGuard/auth.guard";
import {WalletInfoComponent} from "./components/wallets/wallet-info/wallet-info.component";
import {CategoryListComponent} from "./components/categories/category-list/category-list.component";
import {WalletDetailComponent} from "./components/wallets/wallet-detail/wallet-detail.component";
import {MainContentComponent} from "./components/layouts/master/main-content/main-content.component";
import {CategoryEditComponent} from "./components/categories/category-edit/category-edit.component";
import {TransactionsListComponent} from "./components/transactions/transactions-list/transactions-list.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'statistics',
        component: MainContentComponent
      },
      {
        path: 'wallet',
        children: [
          {
            path: 'info',
            component: WalletInfoComponent
          },
          {
            path: 'detail',
            component: WalletDetailComponent
          }
        ],
      },
      {
        path: 'category',
        children: [
          {
            path: 'info/:id',
            component: CategoryListComponent,
          },
          {
            path: 'edit',
            component: CategoryEditComponent
          }
        ]
      },
      {
        path: 'transaction',
        children: [
          {
            path: 'info/:id',
            component: TransactionsListComponent
          }
        ]
      }
    ], canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
