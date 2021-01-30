import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

    /*
    Get Active Job List 
    */
	getActiveJobList(): Observable<void> {
		return this.http.get<any>(`${this.apiUrl}/api/get-active-job-list`)
			.pipe(map(res => {
				return res;
		}));
	}

    /*
    Get Apply Job By Id
    */
	getApplyJobById(filter_value, contain = null): Observable<void> {
		return this.http.get<any>(`${this.apiUrl}/api/get-job-by-id?filter_column=id&filter_value=${filter_value}&contain=${contain}`)
			.pipe(map(res => {
				return res;
		}));
	}

    /*
    Apply Job
    */
	applyJob(value): Observable<void> {
		return this.http.post<any>(`${this.apiUrl}/api/apply-job`, value)
			.pipe(map(res => {
				return res;
		}));
	}
}
