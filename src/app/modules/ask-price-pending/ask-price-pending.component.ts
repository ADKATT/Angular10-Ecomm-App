import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/Datepicker';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-ask-price-pending',
	templateUrl: './ask-price-pending.component.html',
	styleUrls: ['./ask-price-pending.component.scss']
})
export class AskPricePendingComponent implements OnInit, OnDestroy {
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
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
		});

		this.rows = [
			{ "item": "./assets/images/about.jpg", "date": "2020-11-05 12:00 AM", "partNumber": "123112", "partDescription": "B/PAD TEXTAR"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-06 01:00 AM", "partNumber": "123113", "partDescription": "B/PAD TEXTAR 2"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-07 02:00 AM", "partNumber": "123114", "partDescription": "PAD TEXTAR"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-08 03:00 AM", "partNumber": "123115", "partDescription": "B/PAD TEXTAR 5"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-09 04:00 AM", "partNumber": "123116", "partDescription": "B/ TEXTAR"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-09 05:00 AM", "partNumber": "123124", "partDescription": "B/PAD TEXTAR "},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-08 06:00 AM", "partNumber": "123125", "partDescription": "B/PAD TEX"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-07 07:00 AM", "partNumber": "123126", "partDescription": "B/PD TEXT"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-06 12:00 AM", "partNumber": "123127", "partDescription": "B/PAD TEXTAR"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-05 12:06 AM", "partNumber": "123128", "partDescription": "IGN.COIL"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-04 12:05 AM", "partNumber": "123129", "partDescription": "IGN.COIL 2"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-03 12:04 AM", "partNumber": "123120", "partDescription": "IGN.COIL 3"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-02 12:03 AM", "partNumber": "123333", "partDescription": "IGN.COIL"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-01 12:02 AM", "partNumber": "123222", "partDescription": "IGN.COI"},
			{ "item": "./assets/images/about.jpg", "date": "2020-11-15 12:01 AM", "partNumber": "123111", "partDescription": "IGN.COIL"},
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
	onSubmit(): void {
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

	//Filter
	updateFilter(event): void {
		const val = event.target.value.toLowerCase();

		this.rows = [...this.temp2];
		this.temp = [...this.rows];

		const temp = this.rows.filter(function (d) {
			return d.item.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 ||
			d.partNumber.toLowerCase().indexOf(val) !== -1 ||
			d.partDescription.toLowerCase().indexOf(val) !== -1 || !val;
		});

		this.rows = temp;
		//this.table.offset = 0;
	}

	//Get today's Pendings	
	todayPendings(): void {
		this.tableShow = true;
		//console.log("Today's Pendings");
	}
	
	//Get All Pendings	
	allPendings(): void {
		this.tableShow = true;
		//console.log("All Pendings");
	}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

