import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInventoryRoutingModule } from './search-inventory-routing.module';
import { SearchInventoryComponent } from './search-inventory.component';


@NgModule({
  declarations: [SearchInventoryComponent],
  imports: [
    CommonModule,
    SearchInventoryRoutingModule
  ]
})
export class SearchInventoryModule { }
