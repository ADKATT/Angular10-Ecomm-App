import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatchValidator } from '../../../../functions/validators/must-match';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
	selector: 'app-set-status',
	templateUrl: './set-status.component.html',
	styleUrls: ['./set-status.component.scss']
})
export class SetStatusComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	assignForm: FormGroup;
    statusForm: FormGroup;
	showTime: any = false;
    submitted = false;
	submitted1 = false;
	bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-blue' });

    constructor(
        private toastr: ToastrService,
        private translate: TranslateService,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.statusForm = this.fb.group({
            status: ['', Validators.required],
			hours: ['01:00'],
        });
		
		this.assignForm = this.fb.group({
            email: ['', Validators.required],
			email_communications: [''],
			chat_communications: [''],
			fromDate: ['' , Validators.required],
			toDate: ['', Validators.required],
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

	onChange(event): void {  // event will give you full breif of action
		this.submitted = false;
		const newVal = event.target.value;
		if (newVal === 'time') {
			this.showTime = true;
			// this.statusForm.controls["hours"].setValidators([Validators.required]);
		} else {
			this.showTime = false;
			// this.statusForm.controls["hours"].clearValidators([Validators.required]);
		}
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

	get g() { 
		return this.assignForm.controls; 
	}
	
	assignMessage(): void {
		this.submitted1 = true;

        if (this.assignForm.invalid) {
            return;
        }

		console.log(this.assignForm);		
	}
}