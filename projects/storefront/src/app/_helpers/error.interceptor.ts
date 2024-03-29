import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountApi } from '../api/base';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(public account: AccountApi, public router: Router) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError(err => {
			if (err.status === 401) {
				// auto logout if 401 response returned from api
				localStorage.removeItem('user');
				this.account.signOut();
				this.router.navigate(['account/login']);
			} else if (err.status === 420) {
				this.router.navigate(['ip-block']);
			}

			const error = err.error.message || err.statusText;
			return throwError(error);
		}))
	}
}