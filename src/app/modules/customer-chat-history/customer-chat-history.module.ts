import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../basic/shared/shared.module';

import { CustomerChatHistoryRoutingModule } from './customer-chat-history-routing.module';
import { CustomerChatHistoryComponent } from './customer-chat-history.component';


@NgModule({
	declarations: [CustomerChatHistoryComponent],
	imports: [
		CommonModule,
		NgxDatatableModule,
		PerfectScrollbarModule,
		SharedModule,
		TranslateModule.forChild(),
		BsDatepickerModule.forRoot(),
		CustomerChatHistoryRoutingModule
	]
})
export class CustomerChatHistoryModule { }
