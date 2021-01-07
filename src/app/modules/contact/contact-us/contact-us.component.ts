import { Component } from '@angular/core';
import { theme } from '../../../interfaces/theme';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
    theme = theme;

    constructor() { }
}
