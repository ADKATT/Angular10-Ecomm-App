import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalespersonsService {
	apiUrl: any;

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;
	}

	/**
	* Get flash messages for salesperson
	*/
	getSalesMessage(filter) {
		return this.http.post<any>(`${this.apiUrl}/api/get-flash-message-for-salesperson`, {'filter': filter});
	}

	/**
	* Update flash messages status
	*/
	updateFlashMessageStatus(flashMessage) {
		return this.http.put<any>(`${this.apiUrl}/api/update-flash-message-status`, flashMessage);
	}
}
