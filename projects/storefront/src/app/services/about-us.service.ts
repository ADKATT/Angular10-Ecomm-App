import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
    apiUrl: any;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getAboutUsContent(): Observable<void> {
        return this.http.get<any>(`${this.apiUrl}/api/get-about-content`)
            .pipe(map(res => {
                return res;
        }));
    }
}
