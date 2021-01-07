import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentSearchesComponent } from './recent-searches.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
	{
		path: '',
		component: RecentSearchesComponent,
	},
	{
		path: 'view-product',
		component: ViewProductComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentSearchesRoutingModule { }
