import { Observable } from 'rxjs';

export abstract class SalespersonsApi {

    abstract validateSalesMessage(): Observable<void>;

    // abstract signUp(email: string, password: string): Observable<User>;

}
