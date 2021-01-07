import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../interfaces/product';
//import { ShopApi } from '../../../../api/base';
import { ShopService } from '../../../../services/shop.service';
import { ShopCategory } from '../../../../interfaces/category';

@Component({
    selector: 'app-product-sidebar',
    templateUrl: './product-sidebar.component.html',
    styleUrls: ['./product-sidebar.component.scss'],
})
export class ProductSidebarComponent implements OnInit {
    categories$: Observable<ShopCategory[]>;

    latestProducts$: Observable<Product[]>;

    constructor(
        private shopService: ShopService,
    ) { }

    ngOnInit(): void {
        this.categories$ = this.shopService.getCategories({depth: 1});
        this.latestProducts$ = this.shopService.getLatestProducts(5);
    }
}
