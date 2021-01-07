import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchasedPriceHistoryComponent } from './purchased-price-history.component';

const routes: Routes = [
	{
		path: '',
		component: PurchasedPriceHistoryComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasedPriceHistoryRoutingModule { }
