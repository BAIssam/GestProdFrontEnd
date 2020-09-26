import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lcommande } from '../model/lcommande';

@Injectable()
export class LcommandeService {
	//formData :Lb1016;
	private baseUrladd = '/api/lcommande';
	private baseUrlget = '/api/lcommandes';
	host: string = "http://localhost:8080";

	lcommande: Lcommande = new Lcommande();
	lcommandeList: Lcommande[];

	constructor(private http: HttpClient) { }
	addLcomm(info: Object): Observable<Object> {
		return this.http.post(`${this.host + this.baseUrladd}`, info);
	}


	getAllByIdCommande(id: number): Observable<Object> {
		return this.http.get(`${this.host + this.baseUrlget}/${id}`);
	}

}
