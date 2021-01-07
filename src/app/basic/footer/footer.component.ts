import { Component } from '@angular/core';
import { theme } from '../../interfaces/theme';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    theme = theme;

    constructor() { }
}
