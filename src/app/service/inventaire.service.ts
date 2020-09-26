import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InventaireService {
	private baseUrl: string = '/api/inventaire';
	private host: string = "http://localhost:8080";
	
	constructor (private http: HttpClient){}
	
	getInventaire(): Observable<any>{
		return this.http.get(this.host + this.baseUrl);
		
	}	
}