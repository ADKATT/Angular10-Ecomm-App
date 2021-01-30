import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
import { ApplyJobComponent } from './careers/apply-job/apply-job.component';

const routes: Routes = [
    {
        path: '',
        component: AboutUsComponent,
    },
    {
        path: 'careers',
        component: CareersComponent,
    },
    {
        path: 'careers/apply-job/:id',
        component: ApplyJobComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
