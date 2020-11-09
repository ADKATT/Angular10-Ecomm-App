import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	data:any;
	row:any;
	rows: any[] = [];
	temp = [];
	temp2 = this.rows;
	tableLimit:number = 10;
	selectEntry:any = 10;
	submitted: any = false;
	tableShow: any = false;
	public searchForm: FormGroup;
	public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
	@ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
	@ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
	@ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
	bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-blue' });

    constructor(
        public url: UrlService,
		private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
		this.searchForm = this.formBuilder.group({
			CustCode: ['', Validators.required],
			StartDate: ['', Validators.required],
			EndDate: ['', Validators.required],
		});

		this.rows = [
			{ "custCode": "888", "quoteId": "202010076E2B", "date": "2020-11-05", "partNumber": "123112", "partDescription": "B/PAD TEXTAR	", "price": "12", "qty": "1", "total": "120", "status": "Emailed"},
			{ "custCode": "887", "quoteId": "102010076E2A", "date": "2020-11-06", "partNumber": "123113", "partDescription": "B/PAD TEXTAR 2	", "price": "5", "qty": "2", "total": "220", "status": "Emailed"},
			{ "custCode": "886", "quoteId": "202010076E2C", "date": "2020-11-07", "partNumber": "123114", "partDescription": "PAD TEXTAR	", "price": "14", "qty": "3", "total": "320", "status": "Emailed"},
			{ "custCode": "884", "quoteId": "202010076E2F", "date": "2020-11-08", "partNumber": "123115", "partDescription": "B/PAD TEXTAR	5", "price": "16", "qty": "2", "total": "1120", "status": "Emailed"},
			{ "custCode": "882", "quoteId": "202010076E2G", "date": "2020-11-09", "partNumber": "123116", "partDescription": "B/ TEXTAR", "price": "18", "qty": "1", "total": "110", "status": "Emailed"},
			{ "custCode": "883", "quoteId": "202010076E2H", "date": "2020-11-09", "partNumber": "123124", "partDescription": "B/PAD TEXTAR	", "price": "22", "qty": "2", "total": "220", "status": "Emailed"},
			{ "custCode": "812", "quoteId": "202010076E2BZ", "date": "2020-11-08", "partNumber": "123125", "partDescription": "B/PAD TEX", "price": "3", "qty": "1", "total": "230", "status": "Emailed"},
			{ "custCode": "828", "quoteId": "202010076E2V", "date": "2020-11-07", "partNumber": "123126", "partDescription": "B/PD TEXT", "price": "8", "qty": "3", "total": "340", "status": "Emailed"},
			{ "custCode": "838", "quoteId": "202010076E2B", "date": "2020-11-06", "partNumber": "123127", "partDescription": "B/PAD TEXTAR", "price": "10", "qty": "3", "total": "120", "status": "Emailed"},
			{ "custCode": "848", "quoteId": "202010076E2N", "date": "2020-11-05", "partNumber": "123128", "partDescription": "IGN.COIL", "price": "12", "qty": "2", "total": "320", "status": "Emailed"},
			{ "custCode": "858", "quoteId": "202010076E2A", "date": "2020-11-04", "partNumber": "123129", "partDescription": "IGN.COIL 2", "price": "8", "qty": "2", "total": "880", "status": "Emailed"},
			{ "custCode": "868", "quoteId": "202010076E2Q", "date": "2020-11-03", "partNumber": "123120", "partDescription": "IGN.COIL	3", "price": "10", "qty": "2", "total": "990", "status": "Emailed"},
			{ "custCode": "878", "quoteId": "202010076E2W", "date": "2020-11-02", "partNumber": "123333", "partDescription": "IGN.COIL", "price": "12", "qty": "1", "total": "110", "status": "Emailed"},
			{ "custCode": "898", "quoteId": "202010076E2A", "date": "2020-11-01", "partNumber": "123222", "partDescription": "IGN.COI", "price": "18", "qty": "1", "total": "120", "status": "Emailed"},
			{ "custCode": "808", "quoteId": "202010076E2H", "date": "2020-11-15", "partNumber": "123111", "partDescription": "IGN.COIL", "price": "25", "qty": "3", "total": "880", "status": "Emailed"},
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
			d.quoteId.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 ||
			d.partNumber.toLowerCase().indexOf(val) !== -1 ||
			d.partDescription.toLowerCase().indexOf(val) !== -1 ||
			d.price.toLowerCase().indexOf(val) !== -1 ||
			d.qty.toLowerCase().indexOf(val) !== -1 ||
			d.total.toLowerCase().indexOf(val) !== -1 ||
			d.status.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

	//Get all order
	allOrder() {
		this.tableShow = true;
		console.log("all orders");
	}

	//Get today's order	
	todayOrders() {
		this.tableShow = true;
		console.log("Today's orders");		
	}
	

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
