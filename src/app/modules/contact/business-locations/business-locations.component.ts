import { Component } from '@angular/core';
import { theme } from '../../../interfaces/theme';

@Component({
    selector: 'app-business-locations',
    templateUrl: './business-locations.component.html',
    styleUrls: ['./business-locations.component.scss'],
})
export class BusinessLocationsComponent {
    theme = theme;

    constructor() { }
}
