import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ArticleService } from './service/article.service';
import { CommandeService } from './service/commande.service';
import { LcommandeService } from './service/lcommande.service';
import { FactureService } from './service/facture.service';
import { LfactureService } from './service/lfacture.service';
import { InventaireService } from './service/inventaire.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { XhrInterceptor } from './xhr.interceptor';
import { UserComponent } from './user/user.component';
import { principalReducer } from './shared/principal.reducer';
import { UserService } from './user/user.service';
import { ListeCommandeComponent } from './commande/liste-commande/liste-commande.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { AddLcommandeComponent } from './commande/add-lcommande/add-lcommande.component';
import { AddFactureComponent } from './facture/add-facture/add-facture.component';
import { AddLfactureComponent } from './facture/add-lfacture/add-lfacture.component';
import { ListeFactureComponent } from './facture/liste-facture/liste-facture.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { ListeLcommandeComponent } from './commande/liste-lcommande/liste-lcommande.component';
import { ListeLfactureComponent } from './facture/liste-lfacture/liste-lfacture.component';
import {NgxPaginationModule} from 'ngx-pagination';

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
		UserComponent,
		ListeCommandeComponent,		
		AddCommandeComponent,
		AddLcommandeComponent,
		AddFactureComponent,
		AddLfactureComponent,		
		ListeFactureComponent,
		AddArticleComponent,
		ListArticleComponent,
		InventaireComponent,
		ListeLcommandeComponent,
		ListeLfactureComponent		
	],
	entryComponents: [
		AddLcommandeComponent, 
		AddLfactureComponent,
		ListeLcommandeComponent,
		ListeLfactureComponent
		],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatDialogModule,
		StoreModule.forRoot({ principal: principalReducer }),
		ToastrModule.forRoot(),
		MatIconModule,
		MatToolbarModule,
		BrowserAnimationsModule,
		NgxPaginationModule
	],
	providers: [
		DatePipe,
		ProduitMockService,
		ProduitService,
		ArticleService,
		CommandeService,
		LcommandeService,
		LfactureService,
		FactureService,
		AppService,
		InventaireService,
		{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
		CookieService,
		UserService,
		{ provide: MAT_DIALOG_DATA, useValue: {} },
		{ provide: MatDialogRef, useValue: {} }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
