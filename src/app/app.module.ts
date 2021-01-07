import { NgModule } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { Router, Scroll, Event } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// modules (angular)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
// modules (third-party)
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule } from '@ngx-translate/core';
// modules
import { AppRoutingModule } from './app-routing.module';
import { CurrencyModule } from './basic/currency/currency.module';
import { FooterModule } from './basic/footer/footer.module';
import { HeaderModule } from './basic/header/header.module';
import { LanguageModule } from './basic/language/language.module';
import { MobileModule } from './basic/mobile/mobile.module';
import { SharedModule } from './basic/shared/shared.module';

// components
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';
import { ProductService } from './services/product.service';
// pages
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

@NgModule({
    declarations: [
        // components
        AppComponent,
        RootComponent,
        // pages
        PageNotFoundComponent,
    ],
    imports: [
        // modules (angular)
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        // modules (third-party)
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        TooltipModule.forRoot(),
        TranslateModule.forChild(),
        // modules
        AppRoutingModule,
        CurrencyModule.config({
            default: 'USD',
            currencies: [
                {
                    symbol: '$',
                    name: 'US Dollar',
                    code: 'USD',
                    rate: 1,
                },
                {
                    symbol: '£',
                    name: 'Pound Sterling',
                    code: 'GBP',
                    rate: 0.78,
                },
                {
                    symbol: '€',
                    name: 'Euro',
                    code: 'EUR',
                    rate: 0.92,
                },
                {
                    symbol: '₽',
                    name: 'Russian Ruble',
                    code: 'RUB',
                    rate: 64,
                    formatFn: (value) => {
                        const digits = [].slice.call(Math.round(value).toFixed()).reverse();
                        const parts = [];

                        while (digits.length) {
                            parts.push(digits.splice(0, 3).reverse().join(''));
                        }

                        return parts.reverse().join(' ') + ' руб';
                    },
                },
            ],
        }),
        FooterModule,
        HeaderModule,
        LanguageModule.config({
            default: 'en',
            languages: [
                {
                    code: 'en',
                    name: 'English',
                    image: './assets/images/languages/language-1.png',
                    direction: 'ltr',
                },
                {
                    code: 'ru',
                    name: 'Russian',
                    image: './assets/images/languages/language-2.png',
                    direction: 'ltr',
                },
                {
                    code: 'en-RTL',
                    name: 'RTL',
                    image: './assets/images/languages/language-3.png',
                    direction: 'rtl',
                },
            ],
        }),
        MobileModule,
        SharedModule,
    ],
	providers: [ProductService,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
	],
})
export class AppModule {
    constructor(router: Router, viewportScroller: ViewportScroller) {
        router.events.pipe(
            filter((e: Event): e is Scroll => e instanceof Scroll),
        ).subscribe(e => {
            if (e.position) {
                viewportScroller.scrollToPosition(e.position);
            } else if (!e.anchor) {
                viewportScroller.scrollToPosition([0, 0]);
            }
        });
    }
}