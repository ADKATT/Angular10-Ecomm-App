import { Component, OnDestroy, OnInit } from '@angular/core';
//import { AccountApi } from '../../../api/base';
import { UserService } from '../../../services/user.service';
import { merge, of, Subject } from 'rxjs';
import { OrdersList } from '../../../interfaces/list';
import { distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UrlService } from '../../../services/url.service';

@Component({
	selector: 'app-careers',
	templateUrl: './careers.component.html',
	styleUrls: ['./careers.component.scss'],
})
export class CareersComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    currentPage: FormControl = new FormControl(1);
    list: any;

    constructor(
        private userService: UserService,
        public url: UrlService,
    ) { }

    ngOnInit(): void {
        this.list = [
			{'location' : 'UK', 'position' : 'Manager'},
			{'location' : 'US', 'position' : 'Sales Person'},
			{'location' : 'US', 'position' : 'Manager'},
			{'location' : 'UK', 'position' : 'Sales person'},
		]
		// merge(
            // of(this.currentPage.value),
            // this.currentPage.valueChanges,
        // ).pipe(
            // distinctUntilChanged(),
            // mergeMap(page => this.userService.getOrdersList({
                // limit: 5,
                // page,
            // })),
            // takeUntil(this.destroy$),
        // ).subscribe(x => this.list = x);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
