import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../basic/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuoteHistoryRoutingModule } from './quote-history-routing.module';
import { QuoteHistoryComponent } from './quote-history.component';

@NgModule({
  declarations: [QuoteHistoryComponent],
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxDatatableModule,
		PerfectScrollbarModule,
		SharedModule,
		TranslateModule.forChild(),
		BsDatepickerModule.forRoot(),
		QuoteHistoryRoutingModule
  ]
})
export class QuoteHistoryModule { }
