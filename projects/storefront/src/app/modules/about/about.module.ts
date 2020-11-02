import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';

import { SharedModule } from '../shared/shared.module';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

// blocks
import { BlockMapComponent } from './blocks/block-map/block-map.component';
import { BlockReviewsComponent } from './blocks/block-reviews/block-reviews.component';
import { BlockTeammatesComponent } from './blocks/block-teammates/block-teammates.component';
import { CareersComponent } from './careers/careers.component';

@NgModule({
  declarations: [
	AboutUsComponent, 
	BlockMapComponent, 
	BlockReviewsComponent, 
	BlockTeammatesComponent, 
	CareersComponent
  ],
  imports: [
    CommonModule,
	SharedModule,
	CarouselModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
