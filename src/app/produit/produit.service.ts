import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { API_URLS } from '../config/api.url.config';
import { Produit } from '../shared/produit.model';

@Injectable()
export class ProduitService{

  constructor(private http: HttpClient){

  }

  getProduits() : Observable<any>{
    return this.http.get(API_URLS.PRODUITS_URL);
  }

  addProduit(p:Produit) : Observable<any>{
    return this.http.post(API_URLS.PRODUITS_URL, p);
  }

  updateProduit(p:Produit) : Observable<any>{
    return this.http.put(API_URLS.PRODUITS_URL, p);
  }

  deleteProduit(id:number) : Observable<any>{
    // ref de type string: return this.http.delete(API_URLS.PRODUITS_URL + '/${ref}');
     return this.http.delete(API_URLS.PRODUITS_URL + '/' + id);
  }

}
