import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountApi } from '../../api/base';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from '../../interfaces/address';
import { UrlService } from '../../services/url.service';
import { Order } from '../../interfaces/order';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	row:any;
	rows: any[] = [];
	deleteRow:any;
	temp = [];
	temp2 = this.rows;
	tableLimit: number = 10;
	selectEntry: any = 10;
    address: Address;
    orders: Order[] = [];
	submitted: any = false;
	tableShow: any = false;
	public searchForm: FormGroup;
	public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
	@ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
	@ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
	@ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
	bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-blue' });

    constructor(
        public account: AccountApi,
        public url: UrlService,
		private router: Router,
		private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.account.getDefaultAddress().pipe(takeUntil(this.destroy$)).subscribe(x => this.address = x);
        this.account.getOrdersList({limit: 3}).pipe(takeUntil(this.destroy$)).subscribe(x => this.orders = x.items);

		this.searchForm = this.formBuilder.group({
			address: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
		});

		this.rows = [
			{ "orderId": "2231", "orderTotal": "3", "date": "06-15-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
			{ "orderId": "2131", "orderTotal": "2", "date": "06-16-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
			{ "orderId": "2231", "orderTotal": "1", "date": "06-17-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
			{ "orderId": "2331", "orderTotal": "4", "date": "06-18-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
			{ "orderId": "2431", "orderTotal": "8", "date": "06-19-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
			{ "orderId": "2531", "orderTotal": "6", "date": "06-18-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
			{ "orderId": "2631", "orderTotal": "4", "date": "06-17-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
			{ "orderId": "2731", "orderTotal": "1", "date": "06-16-2020", "notes": "Eugene", "dropShipAddress": "23 U.S", "status" : "Shipped"},
		];
		this.temp2 = this.rows;
    }

   /**
	* Quote form control
	*/  
	get f() { 
		return this.searchForm.controls; 
	}

   /**
	* searchForm submit
	*/ 
	onSubmit(){
		this.submitted = true;
     	if (this.searchForm.invalid) {
			return;
		}

		this.tableShow = true;
		console.log(this.searchForm);
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
			return d.orderId.toLowerCase().indexOf(val) !== -1 ||
			d.orderTotal.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 ||
			d.notes.toLowerCase().indexOf(val) !== -1 ||
			d.dropShipAddress.toLowerCase().indexOf(val) !== -1 ||
			d.status.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

	todayOrders() : void  {
		console.log("test");
	}
	
	backToCart() : void {
		this.router.navigate(['cart']);
	}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}