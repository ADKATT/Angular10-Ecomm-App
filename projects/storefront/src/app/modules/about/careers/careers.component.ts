import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountApi } from '../../../api/base';
import { merge, of, Subject } from 'rxjs';
import { OrdersList } from '../../../interfaces/list';
import { distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UrlService } from '../../../services/url.service';
import { CareersService } from '../../../services/careers.service';

@Component({
	selector: 'app-careers',
	templateUrl: './careers.component.html',
	styleUrls: ['./careers.component.scss'],
})
export class CareersComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    currentPage: FormControl = new FormControl(1);
    list: any = [];

    constructor(
        private accountApi: AccountApi,
        public url: UrlService,
        private careersService: CareersService,
    ) { }

    ngOnInit(): void {
        this.getAllCareers();
    }

    /**
    * Get Careers
    */
    getAllCareers() {
        this.careersService.getCareers().subscribe(
            res => {
                this.list = res.data.data;
            },
            err => {
                console.log(err);
            }
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
