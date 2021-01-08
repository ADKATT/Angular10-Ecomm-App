import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountApi } from '../../../../api/base';
import { merge, of, Subject } from 'rxjs';
import { OrdersList } from '../../../../interfaces/list';
import { distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UrlService } from '../../../../services/url.service';
import { ActivatedRoute } from '@angular/router';
import { CareersApplyService } from '../../../../services/careers-apply.service';

@Component({
  selector: 'app-careers-apply',
  templateUrl: './careers-apply.component.html',
  styleUrls: ['./careers-apply.component.scss']
})
export class CareersApplyComponent implements OnInit {
	career_id: string;
	career: any = [];
	constructor(
		private actRoute: ActivatedRoute,
		private accountApi: AccountApi,
        public url: UrlService,
        private careersapplyService: CareersApplyService,
		) { }

	ngOnInit(): void {
		this.actRoute.paramMap.subscribe(params => {
	  		this.career_id = params.get('id');
	  		this.getCareer(this.career_id);
		});
	}

	/**
    * Get Career
    */
    getCareer(id) {
        this.careersapplyService.getCareer(id).subscribe(
            res => {
                this.career = res.data;
                console.log(this.career);
            },
            err => {
                console.log(err);
            }
        );
    }
}
