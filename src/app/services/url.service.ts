import { Injectable } from '@angular/core';
import { Category, ShopCategory } from '../interfaces/category';
import { Address } from '../interfaces/address';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { Brand } from '../interfaces/brand';

@Injectable({
    providedIn: 'root',
})
export class UrlService {
    constructor() { }

    home(): string {
        return '/';
    }

    shop(): string {
        return '/product';
    }

    category(category: Category): string {
        if (category.type === 'product') {
            return this.shopCategory(category);
        }

        return '/';
    }

    shopCategory(category: ShopCategory): string {
        return `/product/category/${category.slug}` + (category.layout === 'products' ? '/products' : '');
    }

    allProducts(): string {
        return '/product/category/products';
    }

    product(product: Product): string {
        return `/product/products/${product.slug}`;
    }

    brand(brand: Brand): string {
        return '/';
    }

    address(address: Address): string {
        return `/account/addresses/${address.id}`;
    }

    order(order: Order): string {
        return `/account/orders/${order.id}`;
    }

    cart(): string {
        return '/product/cart';
    }

    checkout(): string {
        return '/product/checkout';
    }

    login(): string {
        return '/account/login';
    }

    contacts(): string {
        return '/site/contact-us-v1';
    }
}
