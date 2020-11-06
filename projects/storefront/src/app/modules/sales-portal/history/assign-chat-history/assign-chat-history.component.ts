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
	selector: 'app-assign-chat-history',
	templateUrl: './assign-chat-history.component.html',
	styleUrls: ['./assign-chat-history.component.scss']
})
export class AssignChatHistoryComponent implements OnInit, OnDestroy {
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
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
		});

		this.rows = [
			{ "customer": "Eugene Auto", "customerMsg": "#00004330560 Price? ", "date": "06-15-2020 3:13", "salesPerson": "Eugene", "salesPersonMsg": "21"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330561 Price? ", "date": "11-15-2020 2:13", "salesPerson": "Eugene", "salesPersonMsg": "12"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330562 Price? ", "date": "05-15-2020 1:23", "salesPerson": "Eugene", "salesPersonMsg": "21"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330563 Price? ", "date": "04-15-2020 3:33", "salesPerson": "Eugene", "salesPersonMsg": "31"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330564 Price? ", "date": "03-15-2020 3:43", "salesPerson": "Eugene", "salesPersonMsg": "21"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330565 Price? ", "date": "02-15-2020 3:53", "salesPerson": "Eugene", "salesPersonMsg": "45"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330566 Price? ", "date": "01-15-2020 2:23", "salesPerson": "Eugene", "salesPersonMsg": "23"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330567 Price? ", "date": "10-15-2020 3:23", "salesPerson": "Eugene", "salesPersonMsg": "43"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330568 Price? ", "date": "09-15-2020 3:43", "salesPerson": "Eugene", "salesPersonMsg": ""},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330569 Price? ", "date": "08-15-2020 5:43", "salesPerson": "Eugene", "salesPersonMsg": "11"},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330540 Price? ", "date": "07-15-2020 6:33", "salesPerson": "Eugene", "salesPersonMsg": ""},
			{ "customer": "Eugene Auto", "customerMsg": "#00004330520 Price? ", "date": "03-15-2020 1:11", "salesPerson": "Eugene", "salesPersonMsg": ""},
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
			d.customer.toLowerCase().indexOf(val) !== -1 ||
			d.date.toLowerCase().indexOf(val) !== -1 ||
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
