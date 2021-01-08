import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
// import { CategoryResolver } from '../shop/resolvers/category.resolver';
// import { ProductsListResolver } from '../shop/resolvers/products-list.resolver';
import { CareersApplyComponent } from './careers/careers-apply/careers-apply.component';

const routes: Routes = [
    // {
        // path: '',
        // pathMatch: 'full',
        // redirectTo: 'about-us'
    // },
    {
        path: 'about-us',
        component: AboutUsComponent,
    },
	{
        path: 'careers',
        component: CareersComponent,
    },
	{
		path: 'careers/careers-apply/:id',
		component: CareersApplyComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
