import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
// import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'chat',
	},
	{
		path: 'chat',
		component: SalesPersonChatComponent,
	},
	{
		path: 'ask-price',
		component: AskPriceComponent,
	},
	{
		path: 'cart',
		component: CartComponent,
	},
	{
		path: 'order-history',
		component: OrderHistoryComponent,
	},
	{
		path: 'quote-history',
		component: QuoteHistoryComponent,
	},
	{
		path: 'chat-history',
		component: ChatHistoryComponent,
	},
	{
		path: 'search-history',
		component: SearchHistoryComponent,
	},
	{
		path: 'assigned-chat-history',
		component: AssignChatHistoryComponent,
	},
	{
		path: 'chat-email-time',
		component: ChatEmailTimeComponent,
	},
	{
		path: 'set-status',
		component: SetStatusComponent,
	},
	{
		path: 'customer-stats',
		component: CustomerStatsComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesPortalRoutingModule { }
