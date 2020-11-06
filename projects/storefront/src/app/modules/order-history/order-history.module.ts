import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
	NgxDatatableModule,
	PerfectScrollbarModule,
	SharedModule,
	TranslateModule.forChild(),
	BsDatepickerModule.forRoot(),
    OrderHistoryRoutingModule
  ]
})
export class OrderHistoryModule { }
