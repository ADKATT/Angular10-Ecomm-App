import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteHistoryComponent } from './quote-history.component';

const routes: Routes = [
	{
		path: '',
		component: QuoteHistoryComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteHistoryRoutingModule { }
