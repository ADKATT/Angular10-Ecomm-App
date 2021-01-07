import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../basic/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SalesPortalRoutingModule } from './sales-portal-routing.module';
import { SalesPersonChatComponent } from './sales-person-chat/sales-person-chat.component';
import { AskPriceComponent } from './ask-price/ask-price.component';
import { CartComponent } from './cart/cart.component';
import { OrderHistoryComponent } from './history/order-history/order-history.component';
import { QuoteHistoryComponent } from './history/quote-history/quote-history.component';
import { ChatHistoryComponent } from './history/chat-history/chat-history.component';
import { SearchHistoryComponent } from './history/search-history/search-history.component';
import { AssignChatHistoryComponent } from './history/assign-chat-history/assign-chat-history.component';
import { SetStatusComponent } from './settings/set-status/set-status.component';
import { ChatEmailTimeComponent } from './settings/chat-email-time/chat-email-time.component';
import { CustomerStatsComponent } from './customer-stats/customer-stats.component';

@NgModule({
	declarations: [SalesPersonChatComponent, AskPriceComponent, CartComponent, ChatEmailTimeComponent,SetStatusComponent, OrderHistoryComponent, QuoteHistoryComponent, ChatHistoryComponent, SearchHistoryComponent, AssignChatHistoryComponent, CustomerStatsComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxDatatableModule,
		PerfectScrollbarModule,
		SharedModule,
		TranslateModule.forChild(),
		BsDatepickerModule.forRoot(),
		SalesPortalRoutingModule
	]
})
export class SalesPortalModule { }
