import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../model/commande';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CommandeService {
	
	private baseUrl = '/api/commande';
	private baseUrlLCommande = '/api/lcommandes';
	host: string = "http://localhost:8080";
	listlignesCommande: any = {};
	commande: Commande;
	choixmenu: string = "A";
	public formData: FormGroup;
	
	constructor(private http: HttpClient) { }
	
	getData(id: number): Observable<Object> {
		return this.http.get(`${this.host + this.baseUrl}/${id}`);
	}
	
	getLCommande(id: number): Observable<Object> {
		return this.http.get(`${this.host + this.baseUrlLCommande}/${id}`);
	}

	saveOrUpdate(info: Object) {

		return this.http.post(`${this.host + this.baseUrl}`, info);
	}


	//saveOrUpdate(info: Object): Observable<Object> {

	// return this.http.post(`${this.baseUrl}`, info);
	//}
	updatedata(id: number, value: any): Observable<Object> {
		return this.http.put(`${this.host + this.baseUrl}/${id}`, value);
	}

	deleteData(id: number): Observable<any> {
		return this.http.delete(`${this.host + this.baseUrl}/${id}`, { responseType: 'text' });
	}

	getAll(): Observable<any> {
		return this.http.get(`${this.host + this.baseUrl}`);
	}

	deleteAll(): Observable<any> {

		return this.http.delete(`${this.host + this.baseUrl}`, { responseType: 'text' });
	}

}
