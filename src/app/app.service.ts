import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/finally';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';

import { API_URLS } from './config/api.url.config';
import { PrincipalState } from './shared/principal.state';
import { SAVE_PRINCIPAL } from './shared/save.principal.action';

@Injectable()
export class AppService {

  authenticated: boolean = false;

  constructor(private http:HttpClient,
              private cookieService: CookieService,
              private store: Store<PrincipalState>) { }

  authenticate (credentials, callback){
    if(credentials){
      // btoa est une methode javascript qui va crypter le username et le password
      const token = btoa(credentials.username + ':' + credentials.password);

      this.cookieService.set('token', token);

      //Puisque interceptor intercepte toutes les requetes,
      // headers est initialisé au niveau de l'intercepteor
      // donc ce n'est plus la peine de les initialiser ici
      /*const headers = new HttpHeaders({
        authorization: 'Basic ' + token
      });*/

      //this.http.get(API_URLS.USER_URL, {headers: headers}).subscribe(
      this.http.get(API_URLS.USER_URL).subscribe(
        response => {
          //si la réponse a l'attribut name
          if(response && response['name']){
            console.log(response);
            this.authenticated = true;
            //dispatch modifie le store
            //select lit le store
            this.store.dispatch({
              type: SAVE_PRINCIPAL,
              payload: response
          });
          }else{
            this.authenticated = false;
          }
          // si callback est définie alors exécuter après subscribe
          // la fonction callback est une redirection vers le copmosant produit
          return callback && callback();
        });
    }else{
      this.authenticated = false;
    }
  }

  logout(callback){
    return callback && callback();
  }

}
