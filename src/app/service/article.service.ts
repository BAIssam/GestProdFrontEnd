import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ArticleService {
	private baseUrl = '/api/articles';
	private baseUrlCodeBar = '/api/article/codebar';
	private baseUrlCode = '/api/article/code';
	host: string = "http://localhost:8080";

	choixmenu: string = 'A';
	listData: Article[];
	public formData: FormGroup;
	article: any;

	constructor(private http: HttpClient) { }

	getData(id: number): Observable<Object> {
		return this.http.get(`${this.host + this.baseUrl}/${id}`);
	}

	createData(formData: FormData): Observable<any> {
		return this.http.post(`${this.host + this.baseUrl}`, formData);
	}

	updatedata(id: number, value: any): Observable<Object> {
		return this.http.put(`${this.host + this.baseUrl}/${id}`, value);
	}

	deleteData(id: number): Observable<any> {

		return this.http.delete(`${this.host + this.baseUrl}/${id}`, { responseType: 'text' });
	}

	getAll(): Observable<any> {

		return this.http.get(`${this.host + this.baseUrl}`);
	}
	
	getArticleByCodeBar(codeBar: number): Observable<any> {
		return this.http.get(`${this.host + this.baseUrlCodeBar}/${codeBar}`);
	}
	
	getArticleByCode(code: string): Observable<any> {
		return this.http.get(`${this.host + this.baseUrlCode}/${code}`);
	}

	uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			reportProgress: true,
			responseType: 'text'
		});

		return this.http.request(req);
	}
}
