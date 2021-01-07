import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopProductsComponent } from './shop-products/shop-products.component';
import { BrandsComponent } from './brands/brands.component';
import { CarLinesComponent } from './car-lines/car-lines.component';
import { FeaturedBrandsComponent } from './featured-brands/featured-brands.component';

// pages
import { PageCartComponent } from '../../basic/shop/pages/page-cart/page-cart.component';
import { PageCategoryComponent } from '../../basic/shop/pages/page-category/page-category.component';
import { PageCheckoutComponent } from '../../basic/shop/pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from '../../basic/shop/pages/page-compare/page-compare.component';
import { PageOrderSuccessComponent } from '../../basic/shop/pages/page-order-success/page-order-success.component';
import { PageProductComponent } from '../../basic/shop/pages/page-product/page-product.component';
//import { PageShopComponent } from '../../basic/shop/pages/page-shop/page-shop.component';
import { PageTrackOrderComponent } from '../../basic/shop/pages/page-track-order/page-track-order.component';
import { PageWishlistComponent } from '../../basic/shop/pages/page-wishlist/page-wishlist.component';
// resolvers
import { CategoryResolver } from '../../basic/shop/resolvers/category.resolver';
import { ProductResolver } from '../../basic/shop/resolvers/product.resolver';
import { ProductsListResolver } from '../../basic/shop/resolvers/products-list.resolver';
import { RootCategoriesResolver } from '../../basic/shop/resolvers/root-categories.resolver';
// guards
import { CheckoutGuard } from '../../basic/shop/guards/checkout.guard';
import { PageCareersComponent } from '../../basic/shop/pages/page-careers/page-careers.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'category',
    },
    {
        path: 'category',
        component: PageCategoryComponent,
        data: {
            layout: 'columns-4-sidebar',
        },
        resolve: {
            children: RootCategoriesResolver,
        },
    },
    {
        path: 'category/products',
        component: ShopProductsComponent,
        resolve: {
            productsList: ProductsListResolver,
        },
        data: {
            layout: 'grid',
            gridLayout: 'grid-4-sidebar',
            sidebarPosition: 'start',
        },
    },
    {
        path: 'category/:categorySlug',
        component: PageCategoryComponent,
        data: {
            layout: 'columns-4-sidebar',
        },
        resolve: {
            category: CategoryResolver,
        },
    },
    {
        path: 'category/:categorySlug/products',
        component: ShopProductsComponent,
        resolve: {
            category: CategoryResolver,
            productsList: ProductsListResolver,
        },
        data: {
            layout: 'grid',
            gridLayout: 'grid-4-sidebar',
            sidebarPosition: 'start',
        },
    },
    {
        path: 'products/:productSlug',
        component: PageProductComponent,
        resolve: {
            product: ProductResolver,
        },
        data: {
            layout: 'full',
            sidebarPosition: 'start',
        },
    },
    {
        path: 'cart',
        component: PageCartComponent,
    },
    {
        path: 'checkout',
        pathMatch: 'full',
        component: PageCheckoutComponent,
        canActivate: [CheckoutGuard],
    },
    {
        path: 'checkout/:orderToken',
        component: PageOrderSuccessComponent,
    },
    {
        path: 'wishlist',
        component: PageWishlistComponent,
    },
    {
        path: 'compare',
        component: PageCompareComponent,
    },
    {
        path: 'track-order',
        component: PageTrackOrderComponent,
    },
    // The following routes are only for demonstrating possible page layouts.
    {
        path: 'order-success',
        component: PageOrderSuccessComponent,
        data: {
            orderToken: 'b84486c31644eac99f6909a6e8c19101',
        },
    },
    ...[
        'columns-3-sidebar',
        'columns-4-sidebar',
        'columns-5-sidebar',
        'columns-4-full',
        'columns-5-full',
        'columns-6-full',
        'columns-7-full',
    ].map(layout => ({
        path: `category-${layout}`,
        component: PageCategoryComponent,
        data: {
            layout,
        },
        resolve: {
            children: RootCategoriesResolver,
        },
    })),
    {
        path: 'category-right-sidebar',
        component: PageCategoryComponent,
        data: {
            layout: 'columns-4-sidebar',
            sidebarPosition: 'end',
        },
        resolve: {
            children: RootCategoriesResolver,
        },
    },
    // product
    ...[
        'grid-3-sidebar',
        'grid-4-sidebar',
        'grid-4-full',
        'grid-5-full',
        'grid-6-full',
    ].map(gridLayout => ({
        path: `product-${gridLayout}`,
        component: ShopProductsComponent,
        resolve: {
            category: CategoryResolver,
            productsList: ProductsListResolver,
        },
        data: {
            layout: 'grid',
            gridLayout,
            sidebarPosition: 'start',
            categorySlug: 'headlights-lighting',
        },
    })),
    {
        path: `product-list`,
        component: ShopProductsComponent,
        resolve: {
            category: CategoryResolver,
            productsList: ProductsListResolver,
        },
        data: {
            layout: 'list',
            gridLayout: 'grid-4-sidebar',
            sidebarPosition: 'start',
            categorySlug: 'headlights-lighting',
        },
    },
    {
        path: `product-table`,
        component: ShopProductsComponent,
        resolve: {
            category: CategoryResolver,
            productsList: ProductsListResolver,
        },
        data: {
            layout: 'table',
            gridLayout: 'grid-4-sidebar',
            sidebarPosition: 'start',
            categorySlug: 'headlights-lighting',
        },
    },
	{
        path: `careers`,
        component: PageCareersComponent,
        resolve: {
            category: CategoryResolver,
            productsList: ProductsListResolver,
        },
        data: {
            layout: 'table',
            gridLayout: 'grid-4-sidebar',
            sidebarPosition: 'start',
            categorySlug: 'headlights-lighting',
        },
    },
    {
        path: `product-right-sidebar`,
        component: ShopProductsComponent,
        resolve: {
            category: CategoryResolver,
            productsList: ProductsListResolver,
        },
        data: {
            layout: 'grid',
            gridLayout: 'grid-4-sidebar',
            sidebarPosition: 'end',
            categorySlug: 'headlights-lighting',
        },
    },
    // product
    {
        path: 'product-full',
        component: PageProductComponent,
        resolve: {
            product: ProductResolver,
        },
        data: {
            layout: 'full',
            sidebarPosition: 'start',
            productSlug: 'brandix-brake-kit-bdx-750z370-s',
        },
    },
    {
        path: 'product-sidebar',
        component: PageProductComponent,
        resolve: {
            product: ProductResolver,
        },
        data: {
            layout: 'sidebar',
            sidebarPosition: 'start',
            productSlug: 'brandix-brake-kit-bdx-750z370-s',
        },
    },
	{
		path: 'brands',
		component: BrandsComponent,
	},
	{
		path: 'car-lines',
		component: CarLinesComponent,
	},
	{
		path: 'featured-brands',
		component: FeaturedBrandsComponent,
	},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CategoryResolver,
        ProductResolver,
        ProductsListResolver,
        RootCategoriesResolver,
    ],
})
export class ProductRoutingModule { }
