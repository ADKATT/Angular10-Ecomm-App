import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/Datepicker';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-recent-searches',
	templateUrl: './recent-searches.component.html',
	styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit, OnDestroy {
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
			{ "item": "assets/images/about.jpg", "date": "2020-11-05 12:00 AM", "partNumber": "123112", "partDescription": "B/PAD TEXTAR	", "price": "12"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-06 01:00 AM", "partNumber": "123113", "partDescription": "B/PAD TEXTAR 2", "price": "5"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-07 02:00 AM", "partNumber": "123114", "partDescription": "PAD TEXTAR", "price": "14"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-08 03:00 AM", "partNumber": "123115", "partDescription": "B/PAD TEXTAR	5", "price": "16"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-09 04:00 AM", "partNumber": "123116", "partDescription": "B/ TEXTAR", "price": "18"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-09 05:00 AM", "partNumber": "123124", "partDescription": "B/PAD TEXTAR	", "price": "22"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-08 06:00 AM", "partNumber": "123125", "partDescription": "B/PAD TEX", "price": "3"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-07 07:00 AM", "partNumber": "123126", "partDescription": "B/PD TEXT", "price": "8"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-06 12:00 AM", "partNumber": "123127", "partDescription": "B/PAD TEXTAR", "price": "10"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-05 12:06 AM", "partNumber": "123128", "partDescription": "IGN.COIL", "price": "12"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-04 12:05 AM", "partNumber": "123129", "partDescription": "IGN.COIL 2", "price": "8"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-03 12:04 AM", "partNumber": "123120", "partDescription": "IGN.COIL	3", "price": "10"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-02 12:03 AM", "partNumber": "123333", "partDescription": "IGN.COIL", "price": "12"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-01 12:02 AM", "partNumber": "123222", "partDescription": "IGN.COI", "price": "18"},
			{ "item": "assets/images/about.jpg", "date": "2020-11-15 12:01 AM", "partNumber": "123111", "partDescription": "IGN.COIL", "price": "25"},
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
			return d.item.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 ||
			d.partNumber.toLowerCase().indexOf(val) !== -1 ||
			d.partDescription.toLowerCase().indexOf(val) !== -1 ||
			d.price.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

