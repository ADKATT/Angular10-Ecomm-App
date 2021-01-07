import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ShopProductsComponent } from './shop-products/shop-products.component';
import { BrandsComponent } from './brands/brands.component';
import { CarLinesComponent } from './car-lines/car-lines.component';
import { FeaturedBrandsComponent } from './featured-brands/featured-brands.component';

// modules (angular)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { TranslateModule } from '@ngx-translate/core';

// modules
import { BlocksModule } from '../../basic/blocks/blocks.module';
import { CollapseModule } from '../../basic/collapse';
import { RadioModule } from '../../basic/radio/radio.module';
import { SharedModule } from '../../basic/shared/shared.module';

// components
import { AnalogsTableComponent } from '../../basic/shop/components/analogs-table/analogs-table.component';
import { ProductSidebarComponent } from '../../basic/shop/components/product-sidebar/product-sidebar.component';
import { ProductsViewComponent } from '../../basic/shop/components/products-view/products-view.component';
import { ProductTabComponent } from '../../basic/shop/components/product-tab/product-tab.component';
import { ProductTabsComponent } from '../../basic/shop/components/product-tabs/product-tabs.component';
import { ReviewsListComponent } from '../../basic/shop/components/reviews-list/reviews-list.component';
import { ReviewsViewComponent } from '../../basic/shop/components/reviews-view/reviews-view.component';
import { ShopSidebarComponent } from '../../basic/shop/components/shop-sidebar/shop-sidebar.component';
import { SpecComponent } from '../../basic/shop/components/spec/spec.component';

// pages
import { PageCartComponent } from '../../basic/shop/pages/page-cart/page-cart.component';
import { PageCategoryComponent } from '../../basic/shop/pages/page-category/page-category.component';
import { PageCheckoutComponent } from '../../basic/shop/pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from '../../basic/shop/pages/page-compare/page-compare.component';
import { PageOrderSuccessComponent } from '../../basic/shop/pages/page-order-success/page-order-success.component';
import { PageProductComponent } from '../../basic/shop/pages/page-product/page-product.component';
import { PageShopComponent } from '../../basic/shop/pages/page-shop/page-shop.component';
import { PageTrackOrderComponent } from '../../basic/shop/pages/page-track-order/page-track-order.component';
import { PageWishlistComponent } from '../../basic/shop/pages/page-wishlist/page-wishlist.component';
import { PageCareersComponent } from '../../basic/shop/pages/page-careers/page-careers.component';

// widgets
import { WidgetCategoriesListComponent } from '../../basic/shop/widgets/widget-categories-list/widget-categories-list.component';
import { WidgetFiltersComponent } from '../../basic/shop/widgets/widget-filters/widget-filters.component';
import { WidgetProductsComponent } from '../../basic/shop/widgets/widget-products/widget-products.component';

// filters
import { FilterCategoryComponent } from '../../basic/shop/filters/filter-category/filter-category.component';
import { FilterCheckComponent } from '../../basic/shop/filters/filter-check/filter-check.component';
import { FilterColorComponent } from '../../basic/shop/filters/filter-color/filter-color.component';
import { FilterRadioComponent } from '../../basic/shop/filters/filter-radio/filter-radio.component';
import { FilterRangeComponent } from '../../basic/shop/filters/filter-range/filter-range.component';
import { FilterRatingComponent } from '../../basic/shop/filters/filter-rating/filter-rating.component';
import { FilterVehicleComponent } from '../../basic/shop/filters/filter-vehicle/filter-vehicle.component';

@NgModule({
    declarations: [
        ShopProductsComponent,
        BrandsComponent,
        CarLinesComponent,
        FeaturedBrandsComponent,
        
        // components
        AnalogsTableComponent,
        ProductSidebarComponent,
        ProductsViewComponent,
        ProductTabComponent,
        ProductTabsComponent,
        ReviewsListComponent,
        ReviewsViewComponent,
        ShopSidebarComponent,
        SpecComponent,
        // pages
        PageCartComponent,
        PageCategoryComponent,
        PageCheckoutComponent,
        PageCompareComponent,
        PageOrderSuccessComponent,
        PageProductComponent,
        PageShopComponent,
        PageTrackOrderComponent,
        PageWishlistComponent,
        // widgets
        WidgetCategoriesListComponent,
        WidgetFiltersComponent,
        WidgetProductsComponent,
        // filters
        FilterCategoryComponent,
        FilterCheckComponent,
        FilterColorComponent,
        FilterRadioComponent,
        FilterRangeComponent,
        FilterRatingComponent,
        FilterVehicleComponent,
        PageCareersComponent,
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        
        FormsModule,
        ReactiveFormsModule,
        CarouselModule,
        NgxPayPalModule,
        NgxSliderModule,
        TranslateModule.forChild(),
        BlocksModule,
        CollapseModule,
        RadioModule,
        SharedModule
    ]
})
export class ProductModule { }
