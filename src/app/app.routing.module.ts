import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { ProduitComponent } from './produit/produit.component';
import { CategorieComponent } from './categorie/categorie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

export const appRoutes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'home',
    component: HomeComponent,
    children:[
      {
        path:'produits',
        component: ProduitComponent,
        outlet: 'contentOutlet'
      },
      {
        path:'dashboard',
        component: DashboardComponent,
        outlet: 'contentOutlet'
      },
      {
        path:'categories',
        component: CategorieComponent,
        outlet: 'contentOutlet'
      },
      {
        path:'utilisateurs',
        component: UserComponent,
        outlet: 'contentOutlet'
      }
    ]
  },

  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
