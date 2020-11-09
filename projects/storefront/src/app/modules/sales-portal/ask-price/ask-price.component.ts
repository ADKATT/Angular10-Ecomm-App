import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-ask-price',
	templateUrl: './ask-price.component.html',
	styleUrls: ['./ask-price.component.scss']
})
export class AskPriceComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	data:any;
	row:any;
	rows: any[] = [];
	deleteRow:any;
	temp = [];
	temp2 = this.rows;
	tableLimit:number = 10;
	selectEntry:any = 10;
	public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
	@ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
	@ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
	@ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
	bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-blue' });

    constructor(
        public url: UrlService,
    ) { }

	//Init function
    ngOnInit(): void {
		this.rows = [
			{ "date": "09/30/2020", "custCode": "LN99", "customerName": "Eugene Auto", "partNumber": "06E145100T"},
			{ "date": "10/30/2020", "custCode": "LN92", "customerName": "John", "partNumber": "34216775346P"},
			{ "date": "11/30/2020", "custCode": "LN93", "customerName": "Robart", "partNumber": "34216775346P"},
			{ "date": "12/30/2020", "custCode": "LN94", "customerName": "Johnson", "partNumber": "34216775346RE"},
			{ "date": "09/01/2020", "custCode": "LN95", "customerName": "Marry", "partNumber": "06E145100T"},
			{ "date": "09/02/2020", "custCode": "LN99", "customerName": "Eugene Auto", "partNumber": "16775346P"},
			{ "date": "09/03/2020", "custCode": "LN92", "customerName": "John", "partNumber": "216775346P"},
			{ "date": "09/04/2020", "custCode": "LN99", "customerName": "Eugene Auto", "partNumber": "06E145100T"},
			{ "date": "09/05/2020", "custCode": "LN96", "customerName": "Sean", "partNumber": "342346P"},
			{ "date": "09/06/2020", "custCode": "LN99", "customerName": "Eugene Auto", "partNumber": "34216P"},
			{ "date": "09/07/2020", "custCode": "LN92", "customerName": "John", "partNumber": "34216775346P"},
			{ "date": "09/08/2020", "custCode": "LN99", "customerName": "Eugene Auto", "partNumber": "06E145100T"},
			{ "date": "09/09/2020", "custCode": "LN91", "customerName": "Lean", "partNumber": "34216775346P"},
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
	
	//Datatable filter
	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		this.rows = [...this.temp2];
		this.temp = [...this.rows];

		const temp = this.rows.filter(function (d) {
		  return d.date.toLowerCase().indexOf(val) !== -1 ||
		  d.custCode.toLowerCase().indexOf(val) !== -1 ||
		  d.customerName.toLowerCase().indexOf(val) !== -1 ||
		  d.partNumber.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

	//
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
