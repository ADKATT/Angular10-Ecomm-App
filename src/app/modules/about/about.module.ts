import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '../../basic/shared/shared.module';

// about-blocks
import { BlockReviewsComponent } from './about-blocks/block-reviews/block-reviews.component';
import { BlockTeammatesComponent } from './about-blocks/block-teammates/block-teammates.component';

@NgModule({
	declarations: [
		AboutUsComponent,
		CareersComponent,
		BlockReviewsComponent,
		BlockTeammatesComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		CarouselModule,
		AboutRoutingModule
	]
})
export class AboutModule { }
