import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CustomerRoutingModule } from './customer-routing.module';
import { SearchInventoryComponent } from './search-inventory/search-inventory.component';


@NgModule({
  declarations: [SearchInventoryComponent],
  imports: [
    CommonModule,	
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
