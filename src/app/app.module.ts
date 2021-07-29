import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/master/layouts.component';
import { NavbarComponent } from './components/layouts/master/navbar/navbar.component';
import { SidebarComponent } from './components/layouts/master/sidebar/sidebar.component';
import { LoginComponent } from './components/layouts/pages/login/login.component';
import { RegisterComponent } from './components/layouts/pages/register/register.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { WalletInfoComponent } from './components/wallets/wallet-info/wallet-info.component';
import { TransactionsListComponent } from './components/transactions/transactions-list/transactions-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    CategoryListComponent,
    WalletInfoComponent,
    TransactionsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
