import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { EMPTY, Observable, throwError } from 'rxjs';
//import { ShopApi } from '../../../api/base';
import { ShopService } from '../../../services/shop.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProductResolver implements Resolve<Product> {
    constructor(
        private router: Router,
        private shopService: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const slug = route.params.productSlug || route.data.productSlug;

        return this.shopService.getProductBySlug(slug).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 404) {
               this.router.navigateByUrl('/').then();

               return EMPTY;
            }

            return throwError(error);
        }));
    }
}
