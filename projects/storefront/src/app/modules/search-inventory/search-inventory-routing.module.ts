import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchInventoryComponent } from './search-inventory.component';

const routes: Routes = [
	{
        path: '',
        component: SearchInventoryComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchInventoryRoutingModule { }
