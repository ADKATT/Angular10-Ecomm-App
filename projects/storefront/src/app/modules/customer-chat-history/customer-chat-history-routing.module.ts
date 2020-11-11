import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerChatHistoryComponent } from './customer-chat-history.component';

const routes: Routes = [
	{
		path: '',
		component: CustomerChatHistoryComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerChatHistoryRoutingModule { }
