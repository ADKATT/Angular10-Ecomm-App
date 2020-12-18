import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../api/base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../../../services/data.service';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    isAuth$: Observable<boolean>;
    firstName$: Observable<string>;
    lastName$: Observable<string>;
    email$: Observable<string>;
    avatar$: Observable<string>;
    fullName$: Observable<string>;
    role$: any =0;
    token$: any;
    backEndUrl: any;
	apiFileUrl: any;

    form: FormGroup;

    loginInProgress = false;

    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.account-menu') classAccountMenu = true;

    constructor(
        private fb: FormBuilder,
        public account: AccountApi,
        public router: Router,
        private dataService: DataService,
    ) {
		this.apiFileUrl = environment.apiFileUrl;
		this.backEndUrl = environment.apiBckEndUrl;
        this.isAuth$ = this.account.user$.pipe(map(x => x !== null));
        this.firstName$ = this.account.user$.pipe(map(x => x ? x.firstName : null));
        this.lastName$ = this.account.user$.pipe(map(x => x ? x.lastName : null));
        this.fullName$ = this.account.user$.pipe(map(x => x ? x.user : null));
        this.email$ = this.account.user$.pipe(map(x => x ? x.email : null));
        this.avatar$ = this.account.user$.pipe(map(x => x ? x.profileImage : null)); 
        var user = JSON.parse(localStorage.getItem('user'));
        this.dataService.role.subscribe(roleId => {
            if(roleId != 'admin'){
                localStorage.setItem('role', roleId);
                this.role$ = localStorage.getItem('role');
            }
            else {
                this.role$ = (user) ? user.role: 0;
            }
        });
        this.dataService.token.subscribe(token => {
            if(token != 'token'){
                localStorage.setItem('token', token);
                this.token$ = localStorage.getItem('token');
            }
            else {
                this.token$ = (user) ? user.token: null;
            }
        });
        this.validateIP();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['admin@mailinator.com', [Validators.required, Validators.email]],
            password: ['123456', [Validators.required]],
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    validateIP(): void {
        this.account.validateIP().pipe(
            finalize(() => this.loginInProgress = false),
            takeUntil(this.destroy$),
        ).subscribe(
            (data: any) => {
                if (data.status != 'success') {
                    this.router.navigate(['ip-block']);
                }
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    this.form.setErrors({
                        server: `ERROR_API_${error.error.message}`,
                    });
                } else {
                    console.log(error);
                }
            },
        );
    }

    login(): void {
        this.form.markAllAsTouched();

        if (this.loginInProgress || this.form.invalid) {
            return;
        }

        this.loginInProgress = true;

        this.account.signIn(
            this.form.value.email,
            this.form.value.password,
        ).pipe(
            finalize(() => this.loginInProgress = false),
            takeUntil(this.destroy$),
        ).subscribe(
            () => {
                this.router.navigateByUrl('/account/dashboard').then();
                this.closeMenu.emit();
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    this.form.setErrors({
                        server: `ERROR_API_${error.error.message}`,
                    });
                } else {
                    console.log(error);
                }
            },
        );
    }

    logout(): void {
        this.account.signOut().subscribe(() => {
            this.closeMenu.emit();
            this.router.navigateByUrl('/account/login').then();
        });
    }
}
