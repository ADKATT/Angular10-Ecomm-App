import { Component } from '@angular/core';
import { theme } from '../../../../interfaces/theme';

@Component({
    selector: 'app-page-contact-us-one',
    templateUrl: './page-contact-us-one.component.html',
    styleUrls: ['./page-contact-us-one.component.scss'],
})
export class PageContactUsOneComponent {
    theme = theme;

    constructor() { }
}
