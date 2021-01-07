import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../basic/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AskPricePendingRoutingModule } from './ask-price-pending-routing.module';
import { AskPricePendingComponent } from './ask-price-pending.component';

@NgModule({
	declarations: [AskPricePendingComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxDatatableModule,
		PerfectScrollbarModule,
		SharedModule,
		TranslateModule.forChild(),
		BsDatepickerModule.forRoot(),
		AskPricePendingRoutingModule
	]
})
export class AskPricePendingModule { }
