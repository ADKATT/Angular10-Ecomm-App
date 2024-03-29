import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { IpBlockComponent } from './modules/ip-block/ip-block.component';

const routes: Routes = [
    /**
     * ROUTES_ONLY_FOR_DEMO / START
     */
    // Desktop header variations.
    {path: 'ip-block',   component: IpBlockComponent, data: {desktopHeader: 'Block ip'}},
    // {path: 'header-spaceship-variant-three', component: RootComponent, data: {desktopHeader: 'spaceship/three'}},
    // {path: 'header-classic-variant-one',     component: RootComponent, data: {desktopHeader: 'classic/one'}},
    // {path: 'header-classic-variant-two',     component: RootComponent, data: {desktopHeader: 'classic/two'}},
    // {path: 'header-classic-variant-three',   component: RootComponent, data: {desktopHeader: 'classic/three'}},
    // {path: 'header-classic-variant-four',    component: RootComponent, data: {desktopHeader: 'classic/four'}},
    // {path: 'header-classic-variant-five',    component: RootComponent, data: {desktopHeader: 'classic/five'}},
    // Mobile header variations.
    // {path: 'mobile-header-variant-one',      component: RootComponent, data: {mobileHeader: 'one'}},
    // {path: 'mobile-header-variant-two',      component: RootComponent, data: {mobileHeader: 'two'}},
    /**
     * ROUTES_ONLY_FOR_DEMO / END
     */
    {
        path: '',
        component: RootComponent,
        data: {
            /**
             * Desktop header layout, one of:
             * - spaceship/{one, two, three}
             * - classic/{one, two, three, four, five}
             */
            desktopHeader: 'spaceship/one',
            /**
             * Mobile header layout, one of:
             * - one
             * - two
             */
            mobileHeader: 'one',
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('./modules/home-one/home-one.module').then(m => m.HomeOneModule),
            },
			{
                path: 'shop',
                loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule),
            },
            {
                path: 'blog',
                loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule),
            },
            {
                path: 'account',
                loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
            },
			{
                path: 'site',
                loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule),
            },
			{
                path: 'about',
                loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
            },
			{
                path: 'product',
                loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
            },
			{
                path: 'search-inventory',
                loadChildren: () => import('./modules/search-inventory/search-inventory.module').then(m => m.SearchInventoryModule),
            },
			{
                path: 'order-history',
                loadChildren: () => import('./modules/order-history/order-history.module').then(m => m.OrderHistoryModule),
            },
			{
                path: 'cart',
                loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule),
            },
			{
                path: 'sales-portal',
                loadChildren: () => import('./modules/sales-portal/sales-portal.module').then(m => m.SalesPortalModule),
            },
			{
                path: 'quote-history',
                loadChildren: () => import('./modules/quote-history/quote-history.module').then(m => m.QuoteHistoryModule),
            },
			{
                path: 'purchased-price-history',
                loadChildren: () => import('./modules/purchased-price-history/purchased-price-history.module').then(m => m.PurchasedPriceHistoryModule),
            },
			{
                path: 'ask-price-pending',
                loadChildren: () => import('./modules/ask-price-pending/ask-price-pending.module').then(
				m => m.AskPricePendingModule),
            },
			{
                path: 'recent-searches',
                loadChildren: () => import('./modules/recent-searches/recent-searches.module').then(
				m => m.RecentSearchesModule),
            },
			{
                path: 'customer-chat-history',
                loadChildren: () => import('./modules/customer-chat-history/customer-chat-history.module').then(
				m => m.CustomerChatHistoryModule),
            },
            {
                path: 'reset-password',
                loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'disabled',
            anchorScrolling: 'disabled',
            initialNavigation: 'enabled',
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }