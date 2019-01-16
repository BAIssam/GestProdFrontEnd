import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class XhrInterceptor implements HttpInterceptor{
//interceptor se comporte comme un listener qui écoute le réseau. si on envoie une requete au serveur on ajoute un bout de code
//intercepte toute les requetes pour envoyer le token(username et password) dans le headers de l'url
//Les pages sont sécurisées donc il faut envoyer le token une fois on est authentifié
  constructor(private cookieService: CookieService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){

    const token = this.cookieService.get('token');

    const xhr = req.clone({
      headers: req.headers.set('authorization', `Basic ${token}`)
    });

    return next.handle(xhr);
  }

}
