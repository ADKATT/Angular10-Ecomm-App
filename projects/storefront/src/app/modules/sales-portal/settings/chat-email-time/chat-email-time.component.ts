import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatchValidator } from '../../../../functions/validators/must-match';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AccountApi } from '../../../../api/base';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-chat-email-time',
	templateUrl: './chat-email-time.component.html',
	styleUrls: ['./chat-email-time.component.scss']
})
export class ChatEmailTimeComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	statusForm: FormGroup;
	showTime: any = false;
    submitted = false;
	timeCounts = [5 ,10,  15, 20, 25, 30, 35, 40, 45, 50, 55 ,60]; 

    constructor(
        private account: AccountApi,
        private toastr: ToastrService,
        private translate: TranslateService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.statusForm = this.fb.group({
            chatTime: ['', Validators.required],
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

	get f() { 
		return this.statusForm.controls; 
	}

    save(): void {
		this.submitted = true;
		console.log(this.statusForm);
        if (this.statusForm.invalid) {
            return;
        }

		console.log(this.statusForm);
    }
}