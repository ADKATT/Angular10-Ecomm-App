import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { BusinessLocationsComponent } from './business-locations/business-locations.component';
import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from '../../basic/shared/shared.module';

// contact-blocks
import { BlockMapComponent } from './block-map/block-map.component';

@NgModule({
	declarations: [
		ContactUsComponent,
		BusinessLocationsComponent,
		BlockMapComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		CarouselModule,
		ContactRoutingModule
	]
})
export class ContactModule { }
