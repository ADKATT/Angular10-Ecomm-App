import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../sales-portal/layout/layout.component';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'password',
	},
	{
		path: 'password',
		component: ResetPasswordComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
