import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/Datepicker';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-customer-chat-history',
	templateUrl: './customer-chat-history.component.html',
	styleUrls: ['./customer-chat-history.component.scss']
})
export class CustomerChatHistoryComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

	data:any;
	row:any;
	rows: any[] = [];
	temp = [];
	temp2 = this.rows;
	tableLimit:number = 10;
	selectEntry:any = 10;
	tableShow: any = false;
	public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
	@ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
	@ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
	@ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
	bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-blue' });

    constructor(
        public url: UrlService,
    ) { }

    ngOnInit(): void {

		this.rows = [
			{ "date": "2020-11-05 12:00 AM", "customerMsg": "Hii", "salesperson": "Andy", "salespersonMsg": "Hello"},
			{ "date": "2020-11-06 01:00 AM", "customerMsg": "123113? Price", "salesperson": "Andy", "salespersonMsg": "5"},
			{ "date": "2020-11-07 02:00 AM", "customerMsg": "123114? Price", "salesperson": "PAD TEXTAR", "salespersonMsg": "14"},
			{ "date": "2020-11-08 03:00 AM", "customerMsg": "Hii", "salesperson": "Andy", "salespersonMsg": "Hello"},
			{ "date": "2020-11-09 04:00 AM", "customerMsg": "Hello", "salesperson": "Andy", "salespersonMsg": "Hello"},
			{ "date": "2020-11-09 05:00 AM", "customerMsg": "Hii", "salesperson": "Andy", "salespersonMsg": "Hello"},
			{ "date": "2020-11-08 06:00 AM", "customerMsg": "123125", "salesperson": "Andy", "salespersonMsg": "3"},
			{ "date": "2020-11-07 07:00 AM", "customerMsg": "123126 ? price", "salesperson": "Andy", "salespersonMsg": "8"},
			{ "date": "2020-11-06 12:00 AM", "customerMsg": "123127", "salesperson": "Andy", "salespersonMsg": "10"},
			{ "date": "2020-11-05 12:06 AM", "customerMsg": "123128", "salesperson": "Andy", "salespersonMsg": "12"},
			{ "date": "2020-11-04 12:05 AM", "customerMsg": "123129", "salesperson": "IGN.COIL", "salespersonMsg": "8"},
			{ "date": "2020-11-03 12:04 AM", "customerMsg": "123120", "salesperson": "IGN.COIL", "salespersonMsg": "10"},
			{ "date": "2020-11-02 12:03 AM", "customerMsg": "123333", "salesperson": "IGN.COIL", "salespersonMsg": "12"},
			{ "date": "2020-11-01 12:02 AM", "customerMsg": "123222", "salesperson": "IGN.COI", "salespersonMsg": "18"},
			{ "date": "2020-11-15 12:01 AM", "customerMsg": "123111", "salesperson": "IGN.COIL", "salespersonMsg": "25"},
		];
		this.temp2 = this.rows;
    }

	/**
	* Table limit
	*/
	setLimit(event): void { 
		var totalRow = this.rows.length;
		this.selectEntry = event.target.value;

		if(event.target.value === 'all'){
			this.tableLimit = totalRow;
		}
		else{
			this.tableLimit = event.target.value;
		}
	}

	updateFilter(event): void {
		const val = event.target.value.toLowerCase();

		this.rows = [...this.temp2];
		this.temp = [...this.rows];

		const temp = this.rows.filter(function (d) {
			return d.date.toLowerCase().indexOf(val) !== -1 ||
			d.customerMsg.toLowerCase().indexOf(val) !== -1 ||
			d.salesPerson.toLowerCase().indexOf(val) !== -1 ||
			d.salesPersonMsg.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}