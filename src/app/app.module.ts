import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProduitComponent } from './produit/produit.component';
import { AppRoutingModule } from './app.routing.module';
import { CategorieComponent } from './categorie/categorie.component';
import { ProduitMockService } from './produit/produit.mock.service';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitService } from './produit/produit.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { XhrInterceptor } from './xhr.interceptor';
import { UserComponent } from './user/user.component';
import { principalReducer } from './shared/principal.reducer';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ProduitComponent,
    CategorieComponent,
    ContentComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({principal: principalReducer})
  ],
  providers: [
    ProduitMockService,
    ProduitService,
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    CookieService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
