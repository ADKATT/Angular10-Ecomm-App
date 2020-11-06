import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountApi } from '../../../../api/base';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from '../../../../interfaces/address';
import { UrlService } from '../../../../services/url.service';
import { Order } from '../../../../interfaces/order';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-search-history',
	templateUrl: './search-history.component.html',
	styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit, OnDestroy {
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
		private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.account.getDefaultAddress().pipe(takeUntil(this.destroy$)).subscribe(x => this.address = x);
        this.account.getOrdersList({limit: 3}).pipe(takeUntil(this.destroy$)).subscribe(x => this.orders = x.items);

		this.searchForm = this.formBuilder.group({
			customer: ['', Validators.required],
			StartDate: ['', Validators.required],
			EndDate: ['', Validators.required],
		});

		this.rows = [
			{ "custCode": "888", "partNumberMatch": "202010076E2B", "date": "2020-11-05", "partNumberSearch": "123112", "customerIP": "108.162.219.037"},
			{ "custCode": "887", "partNumberMatch": "102010076E2A", "date": "2020-11-06", "partNumberSearch": "123113", "customerIP": "108.162.219.137"},
			{ "custCode": "886", "partNumberMatch": "202010076E2C", "date": "2020-11-07", "partNumberSearch": "123114", "customerIP": "108.162.219.297"},
			{ "custCode": "884", "partNumberMatch": "202010076E2F", "date": "2020-11-08", "partNumberSearch": "123115", "customerIP": "108.162.219.287"},
			{ "custCode": "882", "partNumberMatch": "202010076E2G", "date": "2020-11-09", "partNumberSearch": "123116", "customerIP": "108.162.219.277"},
			{ "custCode": "883", "partNumberMatch": "202010076E2H", "date": "2020-11-09", "partNumberSearch": "123124", "customerIP": "108.162.219.267"},
			{ "custCode": "812", "partNumberMatch": "202010076E2BZ", "date": "2020-11-08", "partNumberSearch": "123125", "customerIP": "108.162.219.257"},
			{ "custCode": "828", "partNumberMatch": "202010076E2V", "date": "2020-11-07", "partNumberSearch": "123126", "customerIP": "108.162.219.247"},
			{ "custCode": "838", "partNumberMatch": "202010076E2B", "date": "2020-11-06", "partNumberSearch": "123127", "customerIP": "108.162.219.227"},
			{ "custCode": "848", "partNumberMatch": "202010076E2N", "date": "2020-11-05", "partNumberSearch": "123128", "customerIP": "108.162.219.230"},
			{ "custCode": "858", "partNumberMatch": "202010076E2A", "date": "2020-11-04", "partNumberSearch": "123129", "customerIP": "108.162.219.231"},
			{ "custCode": "868", "partNumberMatch": "202010076E2Q", "date": "2020-11-03", "partNumberSearch": "123120", "customerIP": "108.162.219.232"},
			{ "custCode": "878", "partNumberMatch": "202010076E2W", "date": "2020-11-02", "partNumberSearch": "123333", "customerIP": "108.162.219.233"},
			{ "custCode": "898", "partNumberMatch": "202010076E2A", "date": "2020-11-01", "partNumberSearch": "123222", "customerIP": "108.162.219.234"},
			{ "custCode": "808", "partNumberMatch": "202010076E2H", "date": "2020-11-15", "partNumberSearch": "123111", "customerIP": "108.162.219.236"},
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
			return d.custCode.toLowerCase().indexOf(val) !== -1 ||
			d.partNumberMatch.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 ||
			d.partNumberSearch.toLowerCase().indexOf(val) !== -1 ||
			d.customerIP.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

	//Get export data
	exportData() {
		this.tableShow = true;
		console.log("all orders");
	}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
