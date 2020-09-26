import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
	//interceptor se comporte comme un listener qui écoute le réseau. 
	//si on envoie une requete au serveur on ajoute un bout de code qui
	//intercepte toute les requetes pour envoyer le token(username et password) 
	//dans le headers de l'url
	//Les pages sont sécurisées donc il faut envoyer le token une fois on est authentifié
	constructor(private cookieService: CookieService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {


		const token = this.cookieService.get('token');

		const xhr = req.clone({
			headers: req.headers.set('authorization', `Basic ${token}`)
		});

		return next.handle(xhr)
			.catch(
				(err: HttpErrorResponse) => {
					if (err.error instanceof Error) {
						// A client-side or network error occurred. Handle it accordingly.
						console.error('An error occurred:', err.error.message);
					} else {
						// The backend returned an unsuccessful response code.
						// The response body may contain clues as to what went wrong,
						console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
					}

					// ...optionally return a default fallback value so app can continue (pick one)
					// which could be a default value (which has to be a HttpResponse here)
					// return Observable.of(new HttpResponse({body: [{name: "Default value..."}]}));
					// or simply an empty observable

					return Observable.empty<HttpEvent<any>>();
				}
			);
	}

}