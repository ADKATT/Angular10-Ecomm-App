import { Component, OnDestroy, OnInit } from '@angular/core';
//import { AccountApi } from '../../../../api/base';
import { UserService } from '../../../../services/user.service';
import { merge, of, Subject } from 'rxjs';
import { OrdersList } from '../../../../interfaces/list';
import { distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UrlService } from '../../../../services/url.service';

@Component({
    selector: 'app-page-orders',
    templateUrl: './page-orders.component.html',
    styleUrls: ['./page-orders.component.scss'],
})
export class PageOrdersComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    currentPage: FormControl = new FormControl(1);
    list: OrdersList;

    constructor(
        private userService: UserService,
        public url: UrlService,
    ) { }

    ngOnInit(): void {
        merge(
            of(this.currentPage.value),
            this.currentPage.valueChanges,
        ).pipe(
            distinctUntilChanged(),
            mergeMap(page => this.userService.getOrdersList({
                limit: 5,
                page,
            })),
            takeUntil(this.destroy$),
        ).subscribe(x => this.list = x);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
