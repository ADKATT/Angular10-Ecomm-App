import { Injectable } from '@angular/core';
import { SalespersonsApi } from '../base';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
// import {
    // accountChangePassword,
    // accountEditProfile,
    // accountSignIn,
    // accountSignOut,
    // accountSignUp,
    // addAddress,
    // delAddress,
    // editAddress,
    // getAddress,
    // getAddresses,
    // getDefaultAddress,
    // getOrderById,
    // getOrderByToken,
    // getOrdersList,
// } from '../../../fake-server/endpoints';

@Injectable()
export class FakeSalespersonsApi extends SalespersonsApi {
	apiUrl: any;

	constructor(private http: HttpClient) {
		super();
		this.apiUrl = environment.apiUrl;
	}

	validateSalesMessage(): Observable<void> {
		return this.http.get<any>(`${this.apiUrl}/api/get-flash-message-for-salesperson`);
	}

	// signUp(email: string, password: string): Observable<User> {
		// return accountSignUp(email, password).pipe(
			// tap(user => this.setUser(user)),
		// );
	// }

	// signOut(): Observable<void> {
		// return accountSignOut().pipe(
			// tap(() => this.setUser(null)),
		// );
	// }

	// validateIP(): Observable<void> {
		// return this.http.get<any>(`${this.apiUrl}/api/validate-ip`)
			// .pipe(map(user => {
				// return user;
		// }));
	// }

	// validToken(): Observable<void> {
		// return this.http.post<any>(`${this.apiUrl}/api/token-validate`, {})
			// .pipe(map(user => {
				// return user;
		// }));
	// }

	private setUser(user: User): void {
		this.userSubject.next(user);

		localStorage.setItem('user', JSON.stringify(user));
	}
}
