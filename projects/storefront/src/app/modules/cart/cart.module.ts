import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
	SharedModule,
	TranslateModule.forChild(),
    CartRoutingModule
  ]
})
export class CartModule { }
