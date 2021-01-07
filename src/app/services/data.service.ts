import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    role = new BehaviorSubject('admin');
    token = new BehaviorSubject('token');
    setRole(role: string, token: string) {
        this.role.next(role);
        this.token.next(token);
    }

    getRole() {
        //return ['role' => this.role, 'token'=> this.token];
    }
}
