import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLandingComponent } from './components/auth/auth-landing/auth-landing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { MainComponent } from './components/layouts/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ForbiddenComponent } from './components/error/forbidden/forbidden.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { SpinnerComponent } from './components/effect/spinner/spinner.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';

import { firebaseConfig } from './common/secret';
import { RegisterComponent } from './components/auth/register/register.component';
import { CategoryComponent } from './components/home/category/category.component';
import { CartComponent } from './components/home/cart/cart.component';
import { ProductComponent } from './components/home/product/product.component';



const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home/dashboard'
  },
  {
    path: 'auth',
    component: AuthLandingComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path:'register', component: RegisterComponent}
    ]
  },
  {
    path: 'home',
    component: MainComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path:'profile', component: ProfileComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'cart', component: CartComponent},
      {path: 'product', component: ProductComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthLandingComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    MainComponent,
    AdminHomeComponent,
    ForbiddenComponent,
    ProfileComponent,
    SpinnerComponent,
    FooterComponent,
    RegisterComponent,
    CategoryComponent,
    CartComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
