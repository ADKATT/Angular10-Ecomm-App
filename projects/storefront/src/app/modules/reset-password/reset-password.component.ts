import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatchValidator } from '../../functions/validators/must-match';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AccountApi } from '../../api/base';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    form: FormGroup;

    submitted = false;

    constructor(
        private account: AccountApi,
        private toastr: ToastrService,
        private translate: TranslateService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {validators: [mustMatchValidator('newPassword', 'confirmPassword')]});
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

	get f() { 
		return this.form.controls; 
	}

    save(): void {
		this.submitted = true;

        if (this.form.invalid) {
            return;
        }
		
		console.log(this.form);
        // this.account.changePassword(
            // this.form.value.currentPassword,
            // this.form.value.newPassword,
        // ).pipe(
            // finalize(() => this.saveInProgress = false),
            // takeUntil(this.destroy$),
        // ).subscribe(
            // () => {
                // this.toastr.success(this.translate.instant('TEXT_TOAST_PASSWORD_CHANGED'));
            // },
            // error => {
                // if (error instanceof HttpErrorResponse) {
                    // this.form.setErrors({
                        // server: `ERROR_API_${error.error.message}`,
                    // });
                // } else {
                    // alert(error);
                // }
            // },
        // );
    }
}
