import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Address, AddressData } from '../../interfaces/address';
import { OrdersList } from '../../interfaces/list';
import { Order } from '../../interfaces/order';

export interface EditProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface GetOrdersListOptions {
    page?: number;
    limit?: number;
    sort?: string;
}

export interface EditAddressData extends AddressData {
    default: boolean;
}

export abstract class AccountApi {
    abstract user: User | null;

    abstract user$: Observable<User | null>;

    abstract signIn(email: string, password: string): Observable<void>;

    abstract signUp(email: string, password: string): Observable<User>;

    abstract signOut(): Observable<void>;

    abstract validateIP(): Observable<void>;

    abstract validToken(): Observable<void>;

    abstract validToken(): Observable<void>;

    abstract getRole(): Observable<void>;

    abstract getUserId(): Observable<void>;

    abstract getcurrentUser(): Observable<void>;

    abstract get currentUserValue(): User | null;

    abstract editProfile(data: EditProfileData): Observable<User>;

    abstract changePassword(value, filter_column, filter_value): Observable<void>;

    abstract addAddress(data: EditAddressData): Observable<Address>;

    abstract editAddress(addressId: number, data: EditAddressData): Observable<Address>;

    abstract delAddress(addressId: number): Observable<void>;

    abstract getDefaultAddress(): Observable<Address>;

    abstract getAddress(addressId: number): Observable<Address>;

    abstract getAddresses(): Observable<Address[]>;

    abstract getOrdersList(options?: GetOrdersListOptions): Observable<OrdersList>;

    abstract getOrderById(id: number): Observable<Order>;

    abstract getOrderByToken(token: string): Observable<Order>;

}
