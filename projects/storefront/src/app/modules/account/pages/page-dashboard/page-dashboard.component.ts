import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountApi } from '../../../../api/base/account.api';
import { SalespersonsService } from '../../../../services/salespersons/salespersons.service';
import { Subject } from 'rxjs';
import { Address } from '../../../../interfaces/address';
import { UrlService } from '../../../../services/url.service';
import { Order } from '../../../../interfaces/order';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-page-dashboard',
	templateUrl: './page-dashboard.component.html',
	styleUrls: ['./page-dashboard.component.scss'],
})
export class PageDashboardComponent implements OnInit, OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();
	@ViewChild('flashMessage', { static: false }) flashMessage: ModalDirective;
	address: Address;
	flashMessages: any = [];
	orders: Order[] = [];
	role: any;
	currentUser: any;
	image: any = '';

	/**
	* constructor function
	*/
	constructor(
		public account: AccountApi,
		public salesperson: SalespersonsService,
		public url: UrlService,
	) { }

	/**
	* ngOnInit
	*/
	ngOnInit(): void {
		this.account.getDefaultAddress().pipe(takeUntil(this.destroy$)).subscribe(x => this.address = x);
		this.account.getOrdersList({limit: 3}).pipe(takeUntil(this.destroy$)).subscribe(x => this.orders = x.items);
		this.role = this.account.getRole();
		if(this.role == '4') {
			this.getSalesMessage(this.role);
		}
		this.getUserDetails();
	}

	/**
	* Get sales message 
	*/
	getSalesMessage(role): void {
		var filter = {'role_id': role};
		this.salesperson.getSalesMessage(filter).pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(res: any) => {
				if (res.success) {
					this.flashMessages = res.data;
					this.flashMessage.show();
					this.updateFlashMessageStatus(this.flashMessages);
				}
			},
			error => {
				console.log(error);
			},
		);
	}

	/**
	* Update flash messages seen status
	*/
	updateFlashMessageStatus(flashMessage): void {
		this.salesperson.updateFlashMessageStatus(flashMessage).pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(res: any) => {
				console.log('message has been seen by salespersons')
			},
			error => {
				console.log(error);
			},
		);
	}

	/**
	* Get Current user details
	*/
	getUserDetails(): void {
		this.account.getcurrentUser().pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(res: any) => {
				if (res.success) {
					this.currentUser = res.data;
					if (this.currentUser.image) {
						this.image = environment.apiFileUrl+'/'+this.currentUser.image;
					}
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