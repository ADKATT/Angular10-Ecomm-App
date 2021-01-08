import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareersApplyService {
	apiUrl: any;

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;
	}

	/**
	* Get career
	*/
	getCareer(id) {
		return this.http.get<any>(`${this.apiUrl}/api/get-job-by-id?filter_column=id&filter_value=`+id);
	}
}
