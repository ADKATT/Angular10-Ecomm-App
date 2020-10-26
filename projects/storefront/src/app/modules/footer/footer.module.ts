import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { SharedModule } from '../shared/shared.module';

// components
import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [
        // components
        FooterComponent,
    ],
    exports: [
        // components
        FooterComponent,
    ],
    imports: [
        // modules (angular)
        CommonModule,
        RouterModule,
        // modules (third-party)
        TranslateModule.forChild(),
        // modules
        SharedModule,
    ],
})
export class FooterModule { }
