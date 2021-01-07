import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private router: Router, private http: HttpClient ){
	}
}
