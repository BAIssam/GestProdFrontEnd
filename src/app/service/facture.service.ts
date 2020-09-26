import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FactureService {
	private baseUrl = '/api/facts';
	private baseUrlLFacture = '/api/lignesFacture';
	private baseUrlNumero = '/api/fact/numero';
	host: string = "http://localhost:8080";
	listLignesFacture: any = {};
	choixmenu: string = "A";
	public formData: FormGroup;

	constructor(private http: HttpClient) { }

	getData(id: number): Observable<Object> {
		return this.http.get(`${this.host + this.baseUrl}/${id}`);
	}

	getLFacture(id: number): Observable<Object> {
		return this.http.get(`${this.host + this.baseUrlLFacture}/${id}`);
	}
	
	getAll(): Observable<any> {
		return this.http.get(`${this.host + this.baseUrl}`);
	}
	
	getBigestNumberFacture(): Observable<any> {
		return this.http.get(`${this.host + this.baseUrlNumero}`);
	}

	saveOrUpdate(info: Object): Observable<Object> {

		return this.http.post(`${this.host + this.baseUrl}`, info);
	}
	updatedata(id: number, value: any): Observable<Object> {
		return this.http.put(`${this.host + this.baseUrl}/${id}`, value);
	}

	deleteAll(id: number): Observable<any> {
		return this.http.delete(`${this.host + this.baseUrl}/${id}`, { responseType: 'text' });
	}

	
}
