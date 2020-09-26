import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { ListeCommandeComponent } from './commande/liste-commande/liste-commande.component';
import { AddFactureComponent } from './facture/add-facture/add-facture.component';
import { ListeFactureComponent } from './facture/liste-facture/liste-facture.component';
import { CategorieComponent } from './categorie/categorie.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { ProduitComponent } from './produit/produit.component';
import { ProduitResolver } from './produit/produit.resolver';

export const appRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: 'produits',
				component: ProduitComponent,
				resolve: {
					produits: ProduitResolver
				},
				outlet: 'contentOutlet'
			},
			{
				path: 'categories',
				component: CategorieComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'articles',
				component: AddArticleComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'listearticles',
				component: ListArticleComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'addcommandes',
				component: AddCommandeComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'listecommandes',
				component: ListeCommandeComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'addfactures',
				component: AddFactureComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'listefactures',
				component: ListeFactureComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'inventaire',
				component: InventaireComponent,
				outlet: 'contentOutlet'
			},
			{
				path: 'utilisateurs',
				component: UserComponent,
				outlet: 'contentOutlet'
			}
		]
	},

	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule],
	providers: [ProduitResolver]
})
export class AppRoutingModule {

}
