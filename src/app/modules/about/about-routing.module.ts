import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';

const routes: Routes = [
	{
		path: 'about-us',
		component: AboutUsComponent,
	},
	{
		path: 'careers',
		component: CareersComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AboutRoutingModule { }
