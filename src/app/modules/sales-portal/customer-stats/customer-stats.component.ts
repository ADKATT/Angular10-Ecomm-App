import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-customer-stats',
	templateUrl: './customer-stats.component.html',
	styleUrls: ['./customer-stats.component.scss']
})
export class CustomerStatsComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	onlineRows: any[] = [];
	onlineTemp = [];
	onlineTemp2 = this.onlineRows;
	onlineTableLimit: number = 10;
	onlineSelectEntry: any = 10;
	
	oflinerows: any[] = [];
	oflinetemp = [];
	oflinetemp2 = this.oflinerows;
	oflinetableLimit:number = 10;
	oflineselectEntry:any = 10;
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
			customer: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
		});

		this.onlineRows = [
			{ "seq": "1", "custCode": "330560", "customerName": "Eugene Auto", "salesCode": "Eugene001", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "2", "custCode": "4330560", "customerName": "Eugene Auto", "salesCode": "Eugene002", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "3", "custCode": "0435603", "customerName": "Eugene Auto2", "salesCode": "Eugene003", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "4", "custCode": "030560", "customerName": "Eugene", "salesCode": "Eugene001", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "5", "custCode": "004330560", "customerName": "EugeneAuto", "salesCode": "Eugene002", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "6", "custCode": "00430560", "customerName": "Eugene", "salesCode": "Eugene003", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
		];
		this.onlineTemp2 = this.onlineRows;
		
		this.oflinerows = [
			{ "seq": "1", "custCode": "330560", "customerName": "Eugene Auto", "salesCode": "Eugene001", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "2", "custCode": "4330560", "customerName": "Eugene Auto", "salesCode": "Eugene002", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "3", "custCode": "0435603", "customerName": "Eugene Auto2", "salesCode": "Eugene003", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "4", "custCode": "030560", "customerName": "Eugene", "salesCode": "Eugene001", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "5", "custCode": "004330560", "customerName": "EugeneAuto", "salesCode": "Eugene002", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
			{ "seq": "6", "custCode": "00430560", "customerName": "Eugene", "salesCode": "Eugene003", "salesPersonName": "Eugene", "todaySearch": "-", "todayChat": "-", "loginTime": "06-15-2020 3:13"},
		];
		this.oflinetemp2 = this.oflinerows;
    }

	/**
	* Table limit
	*/
	onlineSetLimit(event) { 
		var totalRow = this.onlineRows.length;
		this.onlineSelectEntry = event.target.value;

		if(event.target.value === 'all'){
			this.onlineTableLimit = totalRow;
		}
		else{
			this.onlineTableLimit = event.target.value;
		}
	}

	onlineFilter(event) {
		const val = event.target.value.toLowerCase();

		this.onlineRows = [...this.onlineTemp2];
		this.onlineTemp = [...this.onlineRows];

		const temp = this.onlineRows.filter(function (d) {
			return d.custCode.toLowerCase().indexOf(val) !== -1 ||
			d.customerName.toLowerCase().indexOf(val) !== -1 ||
			d.salesCode.toLowerCase().indexOf(val) !== -1 ||
			d.salesPersonName.toLowerCase().indexOf(val) !== -1 ||
			d.todaySearch.toLowerCase().indexOf(val) !== -1 ||
			d.todayChat.toLowerCase().indexOf(val) !== -1 ||
			d.loginTime.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.onlineRows = temp;
		//this.table.offset = 0;
	}

	/**
	* Table limit
	*/
	oflinesetLimit(event) { 
		var totalRow = this.oflinerows.length;
		this.oflineselectEntry = event.target.value;

		if(event.target.value === 'all'){
			this.oflinetableLimit = totalRow;
		}
		else{
			this.oflinetableLimit = event.target.value;
		}
	}
	
	offlineFilter(event) : void {
		const val = event.target.value.toLowerCase();
		this.oflinerows = [...this.oflinetemp2];
		this.oflinetemp = [...this.oflinerows];

		const temp = this.oflinerows.filter(function (d) {
			return d.custCode.toLowerCase().indexOf(val) !== -1 ||
			d.customerName.toLowerCase().indexOf(val) !== -1 ||
			d.salesCode.toLowerCase().indexOf(val) !== -1 ||
			d.salesPersonName.toLowerCase().indexOf(val) !== -1 ||
			d.todaySearch.toLowerCase().indexOf(val) !== -1 ||
			d.todayChat.toLowerCase().indexOf(val) !== -1 ||
			d.loginTime.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.oflinerows = temp;
	}

	refresh(): void {
		//console.log("refresh");
	}
    
	ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
