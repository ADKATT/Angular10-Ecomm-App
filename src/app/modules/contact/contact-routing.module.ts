import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { BusinessLocationsComponent } from './business-locations/business-locations.component';

const routes: Routes = [
	{
		path: 'contact-us',
		component: ContactUsComponent,
	},
	{
		path: 'business-locations',
		component: BusinessLocationsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactRoutingModule { }
