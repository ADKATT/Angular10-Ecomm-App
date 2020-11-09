import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
	selector: 'app-chat-history',
	templateUrl: './chat-history.component.html',
	styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
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
			{ "customer": "Eugene", "date": "2020-01-08 17:18:54", "customerMsg": "hello", "salesPerson": "Andy", "salesPersonMsg": "Hii"},
			{ "customer": "Eugene", "date": "2020-02-08 17:18:54", "customerMsg": "00124 Price?", "salesPerson": "Andy", "salesPersonMsg": "55.00"},
			{ "customer": "Eugene", "date": "2020-03-08 17:18:54", "customerMsg": "", "salesPerson": "Andy", "salesPersonMsg": "00124 Price? "},
			{ "customer": "Eugene", "date": "2020-04-08 17:18:54", "customerMsg": "#12138616153BR Price?", "salesPerson": "Andy", "salesPersonMsg": "12"},
			{ "customer": "Eugene", "date": "2020-05-08 17:18:54", "customerMsg": "#06H903016LR Price?", "salesPerson": "Andy", "salesPersonMsg": "123"},
			{ "customer": "Eugene", "date": "2020-06-08 17:18:54", "customerMsg": "hello", "salesPerson": "Andy", "salesPersonMsg": "Hii"},
			{ "customer": "Eugene", "date": "2020-07-08 17:18:54", "customerMsg": "#00124 Price?", "salesPerson": "Andy", "salesPersonMsg": "55"},
			{ "customer": "Eugene", "date": "2020-08-08 17:18:54", "customerMsg": "#RVJ100010 Price?", "salesPerson": "Andy", "salesPersonMsg": "11"},
			{ "customer": "Eugene", "date": "2020-09-08 17:18:54", "customerMsg": "hello", "salesPerson": "Andy", "salesPersonMsg": ""},
			{ "customer": "Eugene", "date": "2020-10-08 17:18:54", "customerMsg": "#RVJ100010 Price?", "salesPerson": "Andy", "salesPersonMsg": ""},
			{ "customer": "Eugene", "date": "2020-11-08 17:18:54", "customerMsg": "hello", "salesPerson": "Andy", "salesPersonMsg": "Hii"},
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
			return d.customer.toLowerCase().indexOf(val) !== -1 ||
			d.customerMsg.toLowerCase().indexOf(val) !== -1 ||
			d.salesPerson.toLowerCase().indexOf(val) !== -1 ||
			d.salesPersonMsg.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 || !val;
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
