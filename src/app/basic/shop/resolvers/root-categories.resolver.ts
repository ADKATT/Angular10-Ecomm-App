import { Injectable } from '@angular/core';
//import { ShopApi } from '../../../api/base';
import { ShopService } from '../../../services/shop.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopCategory } from '../../../interfaces/category';

@Injectable()
export class RootCategoriesResolver implements Resolve<ShopCategory[]> {
    constructor(
        private shopService: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShopCategory[]> {
        return this.shopService.getCategories({depth: 1});
    }
}
