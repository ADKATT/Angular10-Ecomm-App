import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandsComponent } from './brands/brands.component';
import { CarLinesComponent } from './car-lines/car-lines.component';
import { FeaturedBrandsComponent } from './featured-brands/featured-brands.component';

const routes: Routes = [
		{
			path: 'brands',
			component: BrandsComponent,
		},
		{
			path: 'car-lines',
			component: CarLinesComponent,
		},
		{
			path: 'featured-brands',
			component: FeaturedBrandsComponent,
		},
	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
