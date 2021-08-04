import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutsComponent} from './components/layouts/master/layouts.component';
import {NavbarComponent} from './components/layouts/master/navbar/navbar.component';
import {SidebarComponent} from './components/layouts/master/sidebar/sidebar.component';
import {LoginComponent} from './components/layouts/pages/login/login.component';
import {RegisterComponent} from './components/layouts/pages/register/register.component';
import {UserProfileComponent} from './components/users/user-profile/user-profile.component';
import {CategoryListComponent} from './components/categories/category-list/category-list.component';
import {WalletInfoComponent} from './components/wallets/wallet-info/wallet-info.component';
import {TransactionsListComponent} from './components/transactions/transactions-list/transactions-list.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {AuthInterceptor} from './AuthInterceptor/auth-interceptor/auth-interceptor.component';
import {ReactiveFormsModule} from "@angular/forms";
import {WalletDetailComponent} from './components/wallets/wallet-detail/wallet-detail.component';
import {MainContentComponent} from './components/layouts/master/main-content/main-content.component';
import {ToastrModule} from "ngx-toastr";
import {ChartsModule} from "ng2-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    TransactionsListComponent,
    WalletDetailComponent,
    MainContentComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule,
    FormsModule,
    ChartsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    JwtHelperService],

  bootstrap: [AppComponent]
})
export class AppModule {
}
