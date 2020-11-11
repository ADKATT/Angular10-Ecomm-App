import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';

import { RecentSearchesRoutingModule } from './recent-searches-routing.module';
import { RecentSearchesComponent } from './recent-searches.component';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
	declarations: [RecentSearchesComponent, ViewProductComponent],
	imports: [
		CommonModule,
		NgxDatatableModule,
		PerfectScrollbarModule,
		SharedModule,
		TranslateModule.forChild(),
		BsDatepickerModule.forRoot(),
		RecentSearchesRoutingModule
	]
})
export class RecentSearchesModule { }
