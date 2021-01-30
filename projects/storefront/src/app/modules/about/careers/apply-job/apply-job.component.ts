import { Component, OnDestroy, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { merge, of, Subject } from 'rxjs';
import { finalize, map, distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fileExtensionValidator } from '../../../../_helpers/file-extension-validator';
import { CareersService } from '../../../../services/careers.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
	private destroy$: Subject<void> = new Subject<void>();

	public applyJobForm: FormGroup;
	public fileToUpload:any;
	submitted: any = false;
	job_id: string;
	jobDetails: any = [];
	jobIds: any = [];
	alreadyAppliedJobIds: any = [];
	emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
	mobNumberPattern = /^([0|\+[0-9]{1,5})?([1-9][0-9]{9})$/;
	@ViewChild('labelFileImport') labelFileImport: ElementRef;

	constructor(
		private actRoute: ActivatedRoute,
		private careersService: CareersService,
		private formBuilder: FormBuilder,
		private router: Router,
	) { }

	ngOnInit(): void {
		if (localStorage.getItem("careerJobIds") !== null) {
			this.alreadyAppliedJobIds = localStorage.getItem("careerJobIds");
		}

		this.applyJobForm = this.formBuilder.group({
			job_id: [''],
			first_name: ['', [Validators.required]],
			last_name: ['', [Validators.required]],
			email_address: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
			contact_number: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
			resume: ['', [Validators.required, fileExtensionValidator('docx, DOCX, doc, DOC, pdf, PDF')]],
		});

		this.actRoute.paramMap.subscribe(params => {
			this.job_id = params.get('id');
			this.getApplyJobById(this.job_id);
		});
	}

	/**
	* Get Career Job By Id
	*/
	getApplyJobById(id): void {
		this.careersService.getApplyJobById(id).pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(res: any) => {
				console.log(res);
				if (res.success && res.hasOwnProperty('data') && res.data) {
					this.jobDetails = res.data;
					this.applyJobForm.get("job_id").setValue(res.data.id);
				}
				else {
					console.log('Error');
				}
			},
			error => {
				console.log(error);
			},
		);
	}

   /**
	* Quote form control
	*/  
	get f() { 
		return this.applyJobForm.controls; 
	}

   /**
	* On file change
	*/
	onFileChange(files: FileList) {
		this.fileToUpload = files.item(0);
		console.log(this.fileToUpload);
	}

   /**
	* applyJobForm submit
	*/ 
	onSubmit(): void {
		this.submitted = true;
		if (this.applyJobForm.invalid) {
			return;
		}

		const formData = new FormData();
		formData.append('job_id', this.applyJobForm.value.job_id);
		formData.append('first_name', this.applyJobForm.value.first_name);
		formData.append('last_name', this.applyJobForm.value.last_name);
		formData.append('email_address', this.applyJobForm.value.email_address);
		formData.append('contact_number', this.applyJobForm.value.contact_number);
		if (this.fileToUpload) {
			this.applyJobForm.value.resume = this.fileToUpload;
			formData.append('resume', this.fileToUpload);
		}
		else {
			formData.append('resume', '');
		}

		this.careersService.applyJob(formData).pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(res: any) => {
				console.log(res);
				if (res.success) {
					const appliedJobId = this.applyJobForm.value.job_id;
					const arrA = this.jobIds;
					const arrB = JSON.parse(localStorage.getItem("careerJobIds") || "[]");
					const arr = arrA.concat(arrB.filter(x => arrA.every(y => y !== x)));
					this.jobIds = arr;

					if (this.jobIds.indexOf(appliedJobId) === -1) {
						this.jobIds.push(appliedJobId);
					}

					localStorage.setItem("careerJobIds", JSON.stringify(this.jobIds));
					this.router.navigateByUrl('/about/careers').then();
				}
				else {
					console.log('Error');
				}

				this.submitted = false;
			},
			error => {
				console.log(error);
				this.submitted = false;
			},
		);
	}

	/**
	* ngOnDestroy
	*/
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
