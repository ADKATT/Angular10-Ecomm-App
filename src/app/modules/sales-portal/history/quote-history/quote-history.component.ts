import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/Datepicker';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-quote-history',
	templateUrl: './quote-history.component.html',
	styleUrls: ['./quote-history.component.scss']
})
export class QuoteHistoryComponent implements OnInit, OnDestroy {
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
			custCode: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			partNumber: ['', Validators.required],
		});

		this.rows = [
			{ "custCode": "888", "lastDate": "2020-11-05", "partNumber": "123112", "partDescription": "B/PAD TEXTAR	", "price": "12", "qty": "1"},
			{ "custCode": "887", "lastDate": "2020-11-06", "partNumber": "123113", "partDescription": "B/PAD TEXTAR 2", "price": "5", "qty": "2"},
			{ "custCode": "886", "lastDate": "2020-11-07", "partNumber": "123114", "partDescription": "PAD TEXTAR", "price": "14", "qty": "3"},
			{ "custCode": "884", "lastDate": "2020-11-08", "partNumber": "123115", "partDescription": "B/PAD TEXTAR	5", "price": "16", "qty": "2"},
			{ "custCode": "882", "lastDate": "2020-11-09", "partNumber": "123116", "partDescription": "B/ TEXTAR", "price": "18", "qty": "1"},
			{ "custCode": "883", "lastDate": "2020-11-09", "partNumber": "123124", "partDescription": "B/PAD TEXTAR	", "price": "22", "qty": "2"},
			{ "custCode": "812", "lastDate": "2020-11-08", "partNumber": "123125", "partDescription": "B/PAD TEX", "price": "3", "qty": "1"},
			{ "custCode": "828", "lastDate": "2020-11-07", "partNumber": "123126", "partDescription": "B/PD TEXT", "price": "8", "qty": "3"},
			{ "custCode": "838", "lastDate": "2020-11-06", "partNumber": "123127", "partDescription": "B/PAD TEXTAR", "price": "10", "qty": "3"},
			{ "custCode": "848", "lastDate": "2020-11-05", "partNumber": "123128", "partDescription": "IGN.COIL", "price": "12", "qty": "2"},
			{ "custCode": "858", "lastDate": "2020-11-04", "partNumber": "123129", "partDescription": "IGN.COIL 2", "price": "8", "qty": "2"},
			{ "custCode": "868", "lastDate": "2020-11-03", "partNumber": "123120", "partDescription": "IGN.COIL	3", "price": "10", "qty": "2"},
			{ "custCode": "878", "lastDate": "2020-11-02", "partNumber": "123333", "partDescription": "IGN.COIL", "price": "12", "qty": "1"},
			{ "custCode": "898", "lastDate": "2020-11-01", "partNumber": "123222", "partDescription": "IGN.COI", "price": "18", "qty": "1"},
			{ "custCode": "808", "lastDate": "2020-11-15", "partNumber": "123111", "partDescription": "IGN.COIL", "price": "25", "qty": "3"},
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
		//console.log(this.searchForm);
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
			d.lastDate.toLowerCase().indexOf(val) !== -1 ||
			d.partNumber.toLowerCase().indexOf(val) !== -1 ||
			d.partDescription.toLowerCase().indexOf(val) !== -1 ||
			d.price.toLowerCase().indexOf(val) !== -1 ||
			d.qty.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

	//Get all order
	allOrder() {
		this.tableShow = true;
		//console.log("All Quote");
	}

	//Get today's order	
	todayOrders() {
		this.tableShow = true;
		//console.log("Today's Quote");		
	}
	

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
