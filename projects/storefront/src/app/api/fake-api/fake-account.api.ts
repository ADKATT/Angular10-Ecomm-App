import { Injectable } from '@angular/core';
import { AccountApi, EditAddressData, EditProfileData, GetOrdersListOptions } from '../base';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { tap } from 'rxjs/operators';
import { Address } from '../../interfaces/address';
import { OrdersList } from '../../interfaces/list';
import { map } from 'rxjs/operators';
import { Order } from '../../interfaces/order';
import {environment} from '../../../environments/environment';
import { DataService } from '../../services/data.service';
import {
    accountChangePassword,
    accountEditProfile,
    accountSignIn,
    accountSignOut,
    accountSignUp,
    addAddress,
    delAddress,
    editAddress,
    getAddress,
    getAddresses,
    getDefaultAddress,
    getOrderById,
    getOrderByToken,
    getOrdersList,
} from '../../../fake-server/endpoints';


@Injectable()
export class FakeAccountApi extends AccountApi {
    private userSubject: BehaviorSubject<User | null>;
    apiUrl: any;
	token: any;
    get user(): User | null { return this.userSubject.value; }

    readonly user$: Observable<User | null>;

    constructor(private http: HttpClient, 
                private dataService: DataService,) {
        super();
        this.apiUrl = environment.apiUrl;
        const storedUser = localStorage.getItem('user');

        this.userSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
        this.user$ = this.userSubject.asObservable();
    }

    signIn(email: string, password: string): Observable<void> {
        // return accountSignIn(email, password).pipe(
            // tap(user => this.setUser(user)),
        // );
        return this.http.post<any>(`${this.apiUrl}/api/login`, {email: email, password: password})
            .pipe(map(user => {
                if(user.success){
					this.dataService.setRole(user.role, user.token);
                    this.setUser(user);
                }
        }));
    }

    signUp(email: string, password: string): Observable<User> {
        return accountSignUp(email, password).pipe(
            tap(user => this.setUser(user)),
        );
    }

    signOut(): Observable<void> {
        return accountSignOut().pipe(
            tap(() => this.setUser(null)),
        );
		// var user = localStorage.getItem('user');
		// if (user) {
			// this.token = user.token;
		// }
		// let headers = {
				// headers: new HttpHeaders({
					// 'Content-Type': 'application/json',
					// 'Authorization': 'bearer' +' '+ this.token
				// })
		// }
	    // this.setUser(null);
		// return this.http.post<any>(`${this.apiUrl}/api/logout`, {}, headers)
            // .pipe(map(user => {
				// console.log("test");
                // this.setUser(null);
        // }));
    }

    editProfile(data: EditProfileData): Observable<User> {
        return accountEditProfile(data).pipe(
            tap(user => this.setUser(user)),
        );
    }

    changePassword(oldPassword: string, newPassword: string): Observable<void> {
        return accountChangePassword(oldPassword, newPassword);
    }

    addAddress(data: EditAddressData): Observable<Address> {
        return addAddress(data);
    }

    editAddress(addressId: number, data: EditAddressData): Observable<Address> {
        return editAddress(addressId, data);
    }

    delAddress(addressId: number): Observable<void> {
        return delAddress(addressId);
    }

    getDefaultAddress(): Observable<Address | null> {
        return getDefaultAddress();
    }

    getAddress(addressId: number): Observable<Address> {
        return getAddress(addressId);
    }

    getAddresses(): Observable<Address[]> {
        return getAddresses();
    }

    getOrdersList(options?: GetOrdersListOptions): Observable<OrdersList> {
        return getOrdersList(options);
    }

    getOrderById(id: number): Observable<Order> {
        return getOrderById(id);
    }

    getOrderByToken(token: string): Observable<Order> {
        return getOrderByToken(token);
    }

    private setUser(user: User): void {
        this.userSubject.next(user);

        localStorage.setItem('user', JSON.stringify(user));
    }
}
