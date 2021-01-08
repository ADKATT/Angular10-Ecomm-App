import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CareersService {
	apiUrl: any;

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;
	}

	/**
	* Get careers
	*/
	getCareers() {
		return this.http.get<any>(`${this.apiUrl}/api/get-job-list`);
	}

}