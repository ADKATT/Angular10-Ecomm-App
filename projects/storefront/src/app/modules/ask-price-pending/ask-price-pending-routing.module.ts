import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskPricePendingComponent } from './ask-price-pending.component';

const routes: Routes = [
	{
		path: '',
		component: AskPricePendingComponent,
	},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AskPricePendingRoutingModule { }
