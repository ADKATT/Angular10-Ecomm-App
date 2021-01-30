import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { CareersService } from '../../../services/careers.service';

@Component({
	selector: 'app-careers',
	templateUrl: './careers.component.html',
	styleUrls: ['./careers.component.scss'],
})
export class CareersComponent implements OnInit, OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();
	careerData: any = [];
	appliedJobId: any = [];
	list: any;

	constructor(
		public careersService: CareersService,
	) { }

	ngOnInit(): void {
		if (localStorage.getItem("careerJobIds") !== null) {
			this.appliedJobId = localStorage.getItem("careerJobIds");
		}

		this.getActiveJobList();
	}

	/**
	* Get Active Job List
	*/
	getActiveJobList(): void {
		this.careersService.getActiveJobList().pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(res: any) => {
				console.log(res);
				if (res.success && (res.data).hasOwnProperty('data') && (res.data.data).length) {
					this.careerData = res.data.data;
				}
				else {
					console.log('Error');
					this.careerData = '';
				}
			},
			error => {
				console.log(error);
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
