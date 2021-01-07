import { Injectable } from '@angular/core';
import { ShopCategory } from '../../../interfaces/category';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
//import { ShopApi } from '../../../api';
import { ShopService } from '../../../services/shop.service';

@Injectable()
export class CategoryResolver implements Resolve<ShopCategory> {
    constructor(
        private shopService: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShopCategory> {
        return this.shopService.getCategoryBySlug(route.params.categorySlug || route.data.categorySlug, {depth: 2});
    }
}
