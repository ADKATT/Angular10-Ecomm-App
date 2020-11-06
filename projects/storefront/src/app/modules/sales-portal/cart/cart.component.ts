import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountApi } from '../../../api/base';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from '../../../interfaces/address';
import { UrlService } from '../../../services/url.service';
import { Order } from '../../../interfaces/order';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	data:any;
	row:any;
	rows: any[] = [];
	deleteRow:any;
	temp = [];
	temp2 = this.rows;
	tableLimit:number = 10;
	selectEntry:any = 10;
    address: Address;
    orders: Order[] = [];
	public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
	@ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
	@ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
	@ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
	bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-blue' });

    constructor(
        public account: AccountApi,
        public url: UrlService,
    ) { }

    ngOnInit(): void {
        this.account.getDefaultAddress().pipe(takeUntil(this.destroy$)).subscribe(x => this.address = x);
        this.account.getOrdersList({limit: 3}).pipe(takeUntil(this.destroy$)).subscribe(x => this.orders = x.items);

		this.rows = [
			{ "custCode": "888", "date": "2020-11-05", "partNumber": "123112", "partDescription": "Testing 1", "price": "12", "qty": "1", "total": "120"},
			{ "custCode": "888", "date": "2020-11-06", "partNumber": "123113", "partDescription": "Testing 2", "price": "5", "qty": "2", "total": "120"},
			{ "custCode": "888", "date": "2020-11-07", "partNumber": "123114", "partDescription": "Testing 3", "price": "14", "qty": "3", "total": "120"},
			{ "custCode": "888", "date": "2020-11-08", "partNumber": "123115", "partDescription": "Testing 4", "price": "16", "qty": "2", "total": "120"},
			{ "custCode": "888", "date": "2020-11-09", "partNumber": "123116", "partDescription": "Testing 5", "price": "18", "qty": "1", "total": "120"},
			{ "custCode": "888", "date": "2020-11-09", "partNumber": "123124", "partDescription": "Testing 6", "price": "22", "qty": "2", "total": "120"},
			{ "custCode": "888", "date": "2020-11-08", "partNumber": "123125", "partDescription": "Testing 7", "price": "3", "qty": "1", "total": "120"},
			{ "custCode": "888", "date": "2020-11-07", "partNumber": "123126", "partDescription": "Testing 8", "price": "8", "qty": "3", "total": "120"},
			{ "custCode": "888", "date": "2020-11-06", "partNumber": "123127", "partDescription": "Testing 9", "price": "10", "qty": "3", "total": "120"},
			{ "custCode": "888", "date": "2020-11-05", "partNumber": "123128", "partDescription": "Testing 10", "price": "12", "qty": "2", "total": "120"},
			{ "custCode": "888", "date": "2020-11-04", "partNumber": "123129", "partDescription": "Testing 11", "price": "8", "qty": "2", "total": "120"},
			{ "custCode": "888", "date": "2020-11-03", "partNumber": "123120", "partDescription": "Testing 12", "price": "10", "qty": "2", "total": "120"},
			{ "custCode": "888", "date": "2020-11-02", "partNumber": "123333", "partDescription": "Testing 14", "price": "12", "qty": "1", "total": "120"},
			{ "custCode": "888", "date": "2020-11-01", "partNumber": "123222", "partDescription": "Testing 15", "price": "18", "qty": "1", "total": "120"},
			{ "custCode": "888", "date": "2020-11-15", "partNumber": "123111", "partDescription": "Testing 16", "price": "25", "qty": "3", "total": "120"},
		];
		this.temp2 = this.rows;
    }
	
	/**
	* Table limit
	*/
	setLimit(event) { 
		var totalRow = this.rows.length;
		this.selectEntry = event.target.value;

		if(event.target.value === 'all'){
			this.tableLimit = totalRow;
		}
		else{
			this.tableLimit = event.target.value;
		}
	}

	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		this.rows = [...this.temp2];
		this.temp = [...this.rows];

		const temp = this.rows.filter(function (d) {
			return d.custCode.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 ||
			d.partNumber.toLowerCase().indexOf(val) !== -1 ||
			d.partDescription.toLowerCase().indexOf(val) !== -1 ||
			d.price.toLowerCase().indexOf(val) !== -1 ||
			d.qty.toLowerCase().indexOf(val) !== -1 ||
			d.total.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}