import { Component, OnInit } from '@angular/core';
//import { BlogApi, ShopApi } from '../../../../api/base';
import { BlogService } from '../../../../services/blog.service';
import { ShopService } from '../../../../services/shop.service';
import { SectionHeaderGroup } from '../../../../basic/shared/components/section-header/section-header.component';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { Product } from '../../../../interfaces/product';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ShopCategory } from '../../../../interfaces/category';
import { Post } from '../../../../interfaces/post';
import { Brand } from '../../../../interfaces/brand';

interface ProductsCarouselGroup extends SectionHeaderGroup {
    products$: Observable<Product[]>;
}

interface ProductsCarouselData {
    subject$: BehaviorSubject<ProductsCarouselGroup>;
    products$: Observable<Product[]>;
    loading: boolean;
    groups: ProductsCarouselGroup[];
}

interface BlockZoneData {
    image: string;
    mobileImage: string;
    category$: Observable<ShopCategory>;
}

interface DeferredData<T> {
    loading: boolean;
    data$: Observable<T>;
}

@Component({
    selector: 'app-page-one',
    templateUrl: './page-one.component.html',
    styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent implements OnInit {
    featuredProducts: ProductsCarouselData;
	
	permission: any = {
		finder : true,
		features : true,
		products_carousel : true,
		sale_timer : true,
		blockZone : true,
		banners : true,
		products_new_arrival : true,
		posts_carousel : true,
		brands : true,
		products_columns : true,
	}

    blockSale: DeferredData<Product[]>;

    blockZones: BlockZoneData[] = [];

    newArrivals: DeferredData<Product[]>;

    latestPosts: DeferredData<Post[]>;

    brands$: Observable<Brand[]> = of([]);

    columnTopRated$: Observable<Product[]>;
    columnSpecialOffers$: Observable<Product[]>;
    columnBestsellers$: Observable<Product[]>;

    constructor(
        private shopService: ShopService,
        private blogService: BlogService,
    ) { }

    ngOnInit(): void {
        this.featuredProducts = this.makeCarouselData([
            {
                label: 'All',
                products$: this.shopService.getFeaturedProducts(null, 8),
            },
            {
                label: 'Power Tools',
                products$: this.shopService.getFeaturedProducts('power-tools', 8),
            },
            {
                label: 'Hand Tools',
                products$: this.shopService.getFeaturedProducts('hand-tools', 8),
            },
            {
                label: 'Plumbing',
                products$: this.shopService.getFeaturedProducts('plumbing', 8),
            },
        ]);

        this.blockSale = this.makeDeferredData(this.shopService.getSpecialOffers(8));

        this.blockZones = [
            {
                image: './assets/images/categories/category-overlay-1.jpg',
                mobileImage: './assets/images/categories/category-overlay-1-mobile.jpg',
                category$: this.shopService.getCategoryBySlug('tires-wheels', {depth: 1}),
            },
            {
                image: './assets/images/categories/category-overlay-2.jpg',
                mobileImage: './assets/images/categories/category-overlay-2-mobile.jpg',
                category$: this.shopService.getCategoryBySlug('interior-parts', {depth: 1}),
            },
            {
                image: './assets/images/categories/category-overlay-3.jpg',
                mobileImage: './assets/images/categories/category-overlay-3-mobile.jpg',
                category$: this.shopService.getCategoryBySlug('engine-drivetrain', {depth: 1}),
            },
        ];

        this.newArrivals = this.makeDeferredData(this.shopService.getLatestProducts(8));

        this.latestPosts = this.makeDeferredData(this.blogService.getLatestPosts(8));

        this.brands$ = this.shopService.getBrands({limit: 16});

        this.columnTopRated$ = this.shopService.getTopRatedProducts(null, 3);
        this.columnSpecialOffers$ = this.shopService.getSpecialOffers(3);
        this.columnBestsellers$ = this.shopService.getPopularProducts(null, 3);
    }

    groupChange(carousel: ProductsCarouselData, group: SectionHeaderGroup): void {
        carousel.subject$.next(group as ProductsCarouselGroup);
    }

    private makeCarouselData(groups: ProductsCarouselGroup[]): ProductsCarouselData {
        const subject = new BehaviorSubject<ProductsCarouselGroup>(groups[0]);
        const carouselData: ProductsCarouselData = {
            subject$: subject,
            products$: subject.pipe(
                filter(x => x !== null),
                tap(() => carouselData.loading = true),
                switchMap(group => group.products$),
                tap(() => carouselData.loading = false),
            ),
            loading: true,
            groups,
        };

        return carouselData;
    }

    private makeDeferredData<T>(dataSource: Observable<T>): DeferredData<T> {
        const data = {
            loading: true,
            data$: null,
        };

        data.data$ = timer(0).pipe(mergeMap(() => dataSource.pipe(tap(() => data.loading = false))));

        return data;
    }
}
