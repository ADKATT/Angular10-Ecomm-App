import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { BrandsComponent } from './brands/brands.component';
import { CarLinesComponent } from './car-lines/car-lines.component';
import { FeaturedBrandsComponent } from './featured-brands/featured-brands.component';

@NgModule({
  declarations: [BrandsComponent, CarLinesComponent, FeaturedBrandsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
