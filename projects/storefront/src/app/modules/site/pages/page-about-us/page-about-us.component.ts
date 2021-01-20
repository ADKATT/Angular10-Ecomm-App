import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AboutUsService } from '../../../../services/about-us.service';

@Component({
    selector: 'app-page-about-us',
    templateUrl: './page-about-us.component.html',
    styleUrls: ['./page-about-us.component.scss'],
})
export class PageAboutUsComponent implements OnInit, OnDestroy{
	private destroy$: Subject<void> = new Subject<void>();
	aboutContentData: any = [];
	pageTitle: any = '';
	pageDescription: any = '';

	/**
	* constructor function
	*/
	constructor(
		public aboutUsService: AboutUsService,
	) { }

	/**
	* ngOnInit
	*/
	ngOnInit(): void {
		this.getAboutUsContent();
	}

	/**
	* Get sales message 
	*/
	getAboutUsContent(): void {
		this.aboutUsService.getAboutUsContent().pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(res: any) => {
				console.log(res);
				if (res.success) {
					this.pageTitle = 'About Us';
					this.pageDescription = 'No Data Available.';
					this.aboutContentData = res.data;
					if((res.data).hasOwnProperty('title') && res.data.title){
						this.pageTitle = res.data.title;
					}

					if((res.data).hasOwnProperty('description') && res.data.description){
						this.pageDescription = res.data.description;
					}
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
	* ngOnDestroy
	*/
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
