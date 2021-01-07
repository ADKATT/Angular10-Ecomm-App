import { Injectable, Injector } from '@angular/core';
import { map, shareReplay, switchMap, takeUntil, tap, mergeMap, finalize } from 'rxjs/operators';
import { merge, BehaviorSubject, Observable, of, throwError, timer, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpXhrBackend } from '@angular/common/http';
import { BaseCategory, BlogCategory, Category, ShopCategory } from '../interfaces/category';
import { Product, ProductAttribute } from '../interfaces/product';
import { Filter, VehicleFilter, VehicleFilterValue, CategoryFilter, RangeFilter, BaseFilterItem, CheckFilter, RadioFilter, RatingFilter, RatingFilterItem, ColorFilter, ColorFilterItem } from '../interfaces/filter';
import { Brand } from '../interfaces/brand';
import { ProductsList, ReviewsList } from '../interfaces/list';
import { Review } from '../interfaces/review';
import { Order, OrderItem, OrderTotal } from '../interfaces/order';
import { Address, AddressData } from '../interfaces/address';
import { Vehicle } from '../interfaces/vehicle';
import { ProductService } from './product.service';
import {environment} from '../../environments/environment';

let lastId = 0;

export interface CategoryDef {
    name: string;
    slug: string;
    image?: string;
    items?: number;
    layout?: 'categories' | 'products';
    children?: CategoryDef[];
}

function makeShopCategory(def: CategoryDef, parent: ShopCategory): ShopCategory {
    return {
        id: ++lastId,
        type: 'product',
        name: def.name,
        slug: def.slug,
        image: def.image,
        items: def.items,
        parent,
        children: [],
        layout: def.layout ? def.layout : 'products',
        customFields: {},
    };
}

function makeBlogCategory(def: CategoryDef, parent: BlogCategory): BlogCategory {
    return {
        id: ++lastId,
        type: 'blog',
        name: def.name,
        slug: def.slug,
        image: def.image,
        items: def.items,
        parent,
        children: [],
        customFields: {},
    };
}

function makeCategories<T extends BaseCategory>(
    makeFn: (def: CategoryDef, parent: T) => T,
    defs: CategoryDef[],
    parent: T = null,
): T[] {
    const categories: T[] = [];

    defs.forEach(def => {
        const category: T = makeFn(def, parent);

        if (def.children) {
            category.children = makeCategories(makeFn, def.children, category);
        }

        categories.push(category);
    });

    return categories;
}

function flatTree<T extends Category>(categories: T[]): T[] {
    let result = [];

    categories.forEach(category => result = [...result, category, ...flatTree(category.children as Category[])]);

    return result;
}

const shopCategoriesDef: CategoryDef[] = [
    {
        name: 'Headlights & Lighting',
        slug: 'headlights-lighting',
        image: './assets/images/categories/category-1.jpg',
        items: 131,
        children: [
            {name: 'Turn Signals', slug: 'turn-signals'},
            {name: 'Fog Lights', slug: 'fog-lights'},
            {name: 'Headlights', slug: 'headlights'},
            {name: 'Switches & Relays', slug: 'switches-relays'},
            {name: 'Tail Lights', slug: 'tail-lights'},
            {name: 'Corner Lights', slug: 'corner-lights'},
            {name: 'Off-Road Lighting', slug: 'off-road-lighting'},
            {name: 'Lighting Accessories', slug: 'lighting-accessories'},
        ],
    },
    {
        name: 'Fuel System',
        slug: 'fuel-system',
        image: './assets/images/categories/category-2.jpg',
        items: 356,
        children: [
            {name: 'Fuel Pumps', slug: 'fuel-pumps'},
            {name: 'Motor Oil', slug: 'motor-oil'},
            {name: 'Gas Caps', slug: 'gas-caps'},
            {name: 'Fuel Injector', slug: 'fuel-injector'},
            {name: 'Control Motor', slug: 'control-motor'},
        ],
    },
    {
        name: 'Body Parts',
        slug: 'body-parts',
        image: './assets/images/categories/category-3.jpg',
        items: 54,
        children: [
            {name: 'Bumpers', slug: 'bumpers'},
            {name: 'Hoods', slug: 'hoods'},
            {name: 'Grilles', slug: 'grilles'},
            {name: 'Fog Lights', slug: 'fog-lights'},
            {name: 'Door Handles', slug: 'door-handles'},
        ],
    },
    {
        name: 'Interior Parts',
        slug: 'interior-parts',
        image: './assets/images/categories/category-4.jpg',
        items: 274,
        children: [
            {name: 'Dashboards', slug: 'dashboards'},
            {name: 'Seat Covers', slug: 'seat-covers'},
            {name: 'Floor Mats', slug: 'floor-mats'},
            {name: 'Sun Shades', slug: 'sun-shades'},
            {name: 'Visors', slug: 'visors'},
            {name: 'Car Covers', slug: 'car-covers'},
            {name: 'Accessories', slug: 'interior-parts-accessories'},
        ],
    },
    {
        name: 'Tires & Wheels',
        slug: 'tires-wheels',
        image: './assets/images/categories/category-5.jpg',
        items: 508,
        children: [
            {name: 'Wheel Covers', slug: 'wheel-covers'},
            {name: 'Brake Kits', slug: 'brake-kits'},
            {name: 'Tire Chains', slug: 'tire-chains'},
            {name: 'Wheel disks', slug: 'wheel-disks'},
            {name: 'Tires', slug: 'tires'},
            {name: 'Sensors', slug: 'sensors'},
            {name: 'Accessories', slug: 'tires-wheels-accessories'},
        ],
    },
    {
        name: 'Engine & Drivetrain',
        slug: 'engine-drivetrain',
        image: './assets/images/categories/category-6.jpg',
        items: 95,
        children: [
            {name: 'Timing Belts', slug: 'timing-belts'},
            {name: 'Spark Plugs', slug: 'spark-plugs'},
            {name: 'Oil Pans', slug: 'oil-pans'},
            {name: 'Engine Gaskets', slug: 'engine-gaskets'},
            {name: 'Oil Filters', slug: 'oil-filters'},
            {name: 'Engine Mounts', slug: 'engine-mounts'},
            {name: 'Accessories', slug: 'engine-drivetrain-accessories'},
        ],
    },
    {
        name: 'Oils & Lubricants',
        slug: 'oils-lubricants',
        image: './assets/images/categories/category-7.jpg',
        items: 179,
    },
    {
        name: 'Tools & Garage',
        slug: 'tools-garage',
        image: './assets/images/categories/category-8.jpg',
        items: 106,
    },
];

const blogCategoriesDef: CategoryDef[] = [
    {
        name: 'Latest News',
        slug: 'latest-news',
    },
    {
        name: 'Special Offers',
        slug: 'special-offers',
        children: [
            {
                name: 'Spring Sales',
                slug: 'spring-sales',
            },
            {
                name: 'Summer Sales',
                slug: 'summer-sales',
            },
            {
                name: 'Autumn Sales',
                slug: 'autumn-sales',
            },
            {
                name: 'Christmas Sales',
                slug: 'christmas-sales',
            },
            {
                name: 'Other Sales',
                slug: 'other-sales',
            },
        ],
    },
    {
        name: 'New Arrivals',
        slug: 'new-arrivals',
    },
    {
        name: 'Reviews',
        slug: 'reviews',
    },
    {
        name: 'Wheels & Tires',
        slug: 'wheels-tires',
    },
    {
        name: 'Engine & Drivetrain',
        slug: 'engine-drivetrain',
    },
    {
        name: 'Transmission',
        slug: 'transmission',
    },
    {
        name: 'Performance',
        slug: 'performance',
    },
];

export const shopCategoriesTree: ShopCategory[] = makeCategories(makeShopCategory, shopCategoriesDef);

export const shopCategoriesList: ShopCategory[] = flatTree(shopCategoriesTree);

export const blogCategoriesTree: BlogCategory[] = makeCategories(makeBlogCategory, blogCategoriesDef);

export const blogCategoriesList: BlogCategory[] = flatTree(blogCategoriesTree);

export function getNextReviewId(): number {
    return ++lastId;
}

export const reviews: Review[] = [
    {
        id: getNextReviewId(),
        date: '2018-05-27',
        author: 'Samantha Smith',
        avatar: './assets/images/avatars/avatar-1.jpg',
        rating: 4,
        content: `Phasellus id mattis nulla. Mauris velit nisi, imperdiet vitae sodales in, maximus ut lectus. Vivamus
                  commodo scelerisque lacus, at porttitor dui iaculis id. Curabitur imperdiet ultrices fermentum.`,
    },
    {
        id: getNextReviewId(),
        date: '2018-04-12',
        author: 'Adam Taylor',
        avatar: './assets/images/avatars/avatar-2.jpg',
        rating: 3,
        content: `Aenean non lorem nisl. Duis tempor sollicitudin orci, eget tincidunt ex semper sit amet. Nullam neque
                  justo, sodales congue feugiat ac, facilisis a augue. Donec tempor sapien et fringilla facilisis. Nam
                  maximus consectetur diam. Nulla ut ex mollis, volutpat tellus vitae, accumsan ligula.`,
    },
    {
        id: getNextReviewId(),
        date: '2018-01-02',
        author: 'Helena Garcia',
        avatar: './assets/images/avatars/avatar-3.jpg',
        rating: 5,
        content: `Duis ac lectus scelerisque quam blandit egestas. Pellentesque hendrerit eros laoreet suscipit
                  ultrices.`,
    },
];

export interface VehicleDef {
    year: number | [number, number];
    make: string;
    model: string;
    engine: string;
}

function makeVehicles(defs: VehicleDef[]): Vehicle[] {
    return defs.map(def => {
        const range = typeof def.year === 'number' ? [def.year, def.year] : def.year;
        const years = [];

        for (let i = range[0]; i <= range[1]; i++) {
            years.push(i);
        }

        return years.map(year => ({
            id: ++lastId,
            year,
            make: def.make,
            model: def.model,
            engine: def.engine,
        }));
    }).reduce((acc, v) => [...acc, ...v], []);
}

const vehiclesDef: VehicleDef[] = [
    {
        year: 2011,
        make: 'Ford',
        model: 'Focus S',
        engine: '2.0L 1742DA L4 FI Turbo',
    },
    {
        year: 2019,
        make: 'Audi',
        model: 'Q7 Premium',
        engine: '3.0L 5626CC L6 QK',
    },
    {
        year: 2015,
        make: 'Kia',
        model: 'Rio LX',
        engine: '1.6L 8306JK L5 RL',
    },
    {
        year: 2008,
        make: 'BMW',
        model: 'M5',
        engine: '5.0L 8351XZ V10 DB',
    },
    {
        year: [2008, 2018],
        make: 'Alfa Romeo',
        model: '4C',
        engine: '1.7L 1742CC L4 FI Turbo',
    },
    {
        year: [2008, 2018],
        make: 'Aston Martin',
        model: 'DB11',
        engine: '5.2L 5204CC V12 FI Turbo',
    },
    {
        year: [2008, 2018],
        make: 'Dodge',
        model: 'Challenger GT',
        engine: '3.6L 3604CC V6 FI',
    },
    {
        year: [2008, 2018],
        make: 'Lexus',
        model: 'LS460',
        engine: '4.6L 4608CC V8 FI',
    },
    {
        year: [2008, 2018],
        make: 'Nissan',
        model: 'Juke S',
        engine: '1.6 1618CC L4 FI Turbo',
    },
];

export const dbVehicles: Vehicle[] = makeVehicles(vehiclesDef);

export const brands: Brand[] = [
    {
        slug: 'aim-parts',
        name: 'AimParts',
        country: 'DE',
        image: './assets/images/brands/brand-1.png',
    },
    {
        slug: 'wind-engine',
        name: 'WindEngine',
        country: 'DE',
        image: './assets/images/brands/brand-2.png',
    },
    {
        slug: 'turbo-electric',
        name: 'TurboElectric',
        country: 'DE',
        image: './assets/images/brands/brand-3.png',
    },
    {
        slug: 'start-one',
        name: 'StartOne',
        country: 'DE',
        image: './assets/images/brands/brand-4.png',
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        country: 'DE',
        image: './assets/images/brands/brand-5.png',
    },
    {
        slug: 'abs-brand',
        name: 'ABS-Brand',
        country: 'DE',
        image: './assets/images/brands/brand-6.png',
    },
    {
        slug: 'great-circle',
        name: 'GreatCircle',
        country: 'DE',
        image: './assets/images/brands/brand-7.png',
    },
    {
        slug: 'just-romb',
        name: 'JustRomb',
        country: 'DE',
        image: './assets/images/brands/brand-8.png',
    },
    {
        slug: 'fast-wheels',
        name: 'FastWheels',
        country: 'DE',
        image: './assets/images/brands/brand-9.png',
    },
    {
        slug: 'stroyka-x',
        name: 'Stroyka-X',
        country: 'DE',
        image: './assets/images/brands/brand-10.png',
    },
    {
        slug: 'mission-51',
        name: 'Mission-51',
        country: 'DE',
        image: './assets/images/brands/brand-11.png',
    },
    {
        slug: 'fuel-corp',
        name: 'FuelCorp',
        country: 'DE',
        image: './assets/images/brands/brand-12.png',
    },
    {
        slug: 'red-gate',
        name: 'RedGate',
        country: 'DE',
        image: './assets/images/brands/brand-13.png',
    },
    {
        slug: 'blocks',
        name: 'Blocks',
        country: 'DE',
        image: './assets/images/brands/brand-14.png',
    },
    {
        slug: 'blackbox',
        name: 'BlackBox',
        country: 'DE',
        image: './assets/images/brands/brand-15.png',
    },
    {
        slug: 'square-garage',
        name: 'SquareGarage',
        country: 'DE',
        image: './assets/images/brands/brand-16.png',
    },
    {
        slug: 'sunset',
        name: 'Sunset',
        country: 'DE',
        image: './assets/images/brands/brand-1.png',
    },
    {
        slug: 'specter',
        name: 'Specter',
        country: 'CN',
        image: './assets/images/brands/brand-2.png',
    },
    {
        slug: 'no-name',
        name: 'No Name',
        country: 'CN',
        image: './assets/images/brands/brand-3.png',
    },
];

export interface ProductAttributesDef {
    [slug: string]: string | string[] | [true, string, ...string[]];
}

export interface ProductDef {
    name: string;
    slug: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    badges?: string|string[];
    rating: number;
    reviews: number;
    availability: string;
    brand?: string;
    categories?: string[];
    attributes?: ProductAttributesDef;
    compatibility?: 'all' | 'unknown' | number[];
}

function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
}

function resolveProductAttributesDef(attributesDef: ProductAttributesDef): ProductAttribute[] {
    const attributes: ProductAttribute[] = [];

    for (const attributeName of Object.keys(attributesDef)) {
        const attribute: ProductAttribute = {
            name: attributeName,
            slug: nameToSlug(attributeName),
            featured: false,
            values: [],
        };

        const valuesDef = attributesDef[attributeName];
        let valueNames: string[] = [];

        if (typeof valuesDef === 'string') {
            valueNames = [valuesDef];
        } else {
            if (valuesDef[0] === true) {
                attribute.featured = true;
                valuesDef.splice(0, 1);
            }

            valueNames = valuesDef as string[];
        }

        valueNames.forEach(valueName => {
            attribute.values.push({
                name: valueName,
                slug: nameToSlug(valueName),
            });
        });

        if (attribute.values.length > 0) {
            attributes.push(attribute);
        }
    }

    return attributes;
}

function makeProducts(defs: ProductDef[]): Product[] {
    return defs.map(def => {
        let badges = [];

        if (def.badges) {
            if (typeof def.badges === 'string') {
                badges = [def.badges];
            } else {
                badges = def.badges.slice(0);
            }
        }

        let brand: Brand = {
            slug: 'brandix',
            name: 'Brandix',
            image: '',
            country: 'JP',
        };

        if (def.brand) {
            brand = brands.find(x => x.slug === def.brand) || brand;
        }

        const categorySlugs: string[] = def.categories || ['tools-garage'];
        const categories: ShopCategory[] = categorySlugs.map(categorySlug => {
            return shopCategoriesList.find(x => x.slug === categorySlug);
        }).map(x => prepareCategory(x));


        const attributesDef: ProductAttributesDef = {
            Speed: [true, '750 RPM'],
            'Power Source': [true, 'Cordless-Electric'],
            'Battery Cell Type': [true, 'Lithium'],
            Voltage: [true, '20 Volts'],
            'Battery Capacity': [true, '2 Ah'],
            Material: ['Aluminium', 'Plastic'],
            'Engine Type': 'Brushless',
            Length: '99 mm',
            Width: '207 mm',
            Height: '208 mm',
        };

        return {
            id: ++lastId,
            name: def.name,
            excerpt: `
                Many philosophical debates that began in ancient times are still debated today. In one general sense,
                philosophy is associated with wisdom, intellectual culture and a search for knowledge.
            `,
            description: `
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum, diam non iaculis finibus,
                    ipsum arcu sollicitudin dolor, ut cursus sapien sem sed purus. Donec vitae fringilla tortor, sed
                    fermentum nunc. Suspendisse sodales turpis dolor, at rutrum dolor tristique id. Quisque pellentesque
                    ullamcorper felis, eget gravida mi elementum a. Maecenas consectetur volutpat ante, sit amet molestie
                    urna luctus in. Nulla eget dolor semper urna malesuada dictum. Duis eleifend pellentesque dui et
                    finibus. Pellentesque dapibus dignissim augue. Etiam odio est, sodales ac aliquam id, iaculis eget
                    lacus. Aenean porta, ante vitae suscipit pulvinar, purus dui interdum tellus, sed dapibus mi mauris
                    vitae tellus.
                </p>
                <h4>Etiam lacus lacus mollis in mattis</h4>
                <p>
                    Praesent mattis eget augue ac elementum. Maecenas vel ante ut enim mollis accumsan. Vestibulum vel
                    eros at mi suscipit feugiat. Sed tortor purus, vulputate et eros a, rhoncus laoreet orci. Proin sapien
                    neque, commodo at porta in, vehicula eu elit. Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Curabitur porta vulputate augue, at sollicitudin nisl molestie eget.
                </p>
                <p>
                    Nunc sollicitudin, nunc id accumsan semper, libero nunc aliquet nulla, nec pretium ipsum risus ac
                    neque. Morbi eu facilisis purus. Quisque mi tortor, cursus in nulla ut, laoreet commodo quam.
                    Pellentesque et ornare sapien. In ac est tempus urna tincidunt finibus. Integer erat ipsum, tristique
                    ac lobortis sit amet, dapibus sit amet purus. Nam sed lorem nisi. Vestibulum ultrices tincidunt turpis,
                    sit amet fringilla odio scelerisque non.
                </p>
            `,
            slug: def.slug,
            sku: def.sku,
            partNumber: 'BDX-750Z370-S',
            stock: 'in-stock',
            price: def.price,
            compareAtPrice: def.compareAtPrice || null,
            images: def.images.slice(0),
            badges,
            rating: def.rating,
            reviews: def.reviews,
            availability: def.availability,
            compatibility: def.compatibility || 'all',
            brand,
            type: {
                slug: 'default',
                name: 'Default',
                attributeGroups: [
                    {
                        name: 'General',
                        slug: 'general',
                        attributes: [
                            'speed',
                            'power-source',
                            'battery-cell-type',
                            'voltage',
                            'battery-capacity',
                            'material',
                            'engine-type',
                        ],
                    },
                    {
                        name: 'Dimensions',
                        slug: 'dimensions',
                        attributes: [
                            'length',
                            'width',
                            'height',
                        ],
                    },
                ],
            },
            attributes: resolveProductAttributesDef(
                Object.assign({}, attributesDef, def.attributes),
            ),
            options: [
                {
                    type: 'default',
                    slug: 'material',
                    name: 'Material',
                    values: [
                        {slug: 'steel', name: 'Steel'},
                        {slug: 'aluminium', name: 'Aluminium'},
                        {slug: 'thorium', name: 'Thorium'},
                    ],
                },
                {
                    type: 'color',
                    slug: 'color',
                    name: 'Color',
                    values: [
                        {slug: 'white', name: 'White', color: '#fff'},
                        {slug: 'yellow', name: 'Yellow', color: '#ffd333'},
                        {slug: 'red', name: 'Red', color: '#ff4040'},
                        {slug: 'blue', name: 'Blue', color: '#4080ff'},
                    ],
                },
            ],
            tags: ['Brake Kit', 'Brandix', 'Filter', 'Bumper', 'Transmission', 'Hood'],
            categories,
            customFields: {},
        };
    });
}

const productsDef: ProductDef[] = [
    {
        name: 'Brandix Spark Plug Kit ASR-400',
        slug: 'brandix-spark-plug-kit-asr-400',
        sku: '140-10440-B',
        price: 19,
        images: [
            './assets/images/products/product-1-1.jpg',
            './assets/images/products/product-1-2.jpg',
        ],
        badges: ['sale', 'new', 'hot'],
        rating: 4,
        reviews: 3,
        availability: 'in-stock',
        compatibility: [1, 2],
        attributes: {
            Color: 'White',
        },
    },
    {
        name: 'Brandix Brake Kit BDX-750Z370-S',
        slug: 'brandix-brake-kit-bdx-750z370-s',
        sku: '573-23743-C',
        price: 224,
        images: [
            './assets/images/products/product-2-11.jpg',
            './assets/images/products/product-2-21.jpg',
        ],
        rating: 5,
        reviews: 22,
        availability: 'in-stock',
        compatibility: [1],
        attributes: {
            Color: 'Silver',
        },
    },
    {
        name: 'Left Headlight Of Brandix Z54',
        slug: 'left-headlight-of-brandix-z54',
        sku: '009-50078-Z',
        price: 349,
        compareAtPrice: 415,
        images: [
            './assets/images/products/product-3-11.jpg',
            './assets/images/products/product-3-21.jpg',
        ],
        badges: ['sale'],
        rating: 3,
        reviews: 14,
        availability: 'in-stock',
        attributes: {
            Color: 'Red',
        },
    },
    {
        name: 'Glossy Gray 19\' Aluminium Wheel AR-19',
        slug: 'glossy-gray-19-aluminium-wheel-ar-19',
        sku: 'A43-44328-B',
        price: 589,
        images: [
            './assets/images/products/product-4-11.jpg',
            './assets/images/products/product-4-21.jpg',
        ],
        badges: ['hot'],
        rating: 4,
        reviews: 26,
        availability: 'in-stock',
        compatibility: 'unknown',
        attributes: {
            Color: 'Black',
        },
    },
    {
        name: 'Twin Exhaust Pipe From Brandix Z54',
        slug: 'twin-exhaust-pipe-from-brandix-z54',
        sku: '729-51203-B',
        price: 749,
        images: [
            './assets/images/products/product-5-11.jpg',
            './assets/images/products/product-5-21.jpg',
        ],
        rating: 4,
        reviews: 9,
        availability: 'in-stock',
        brand: 'red-gate',
        attributes: {
            Color: 'Light Gray',
        },
    },
    {
        name: 'Motor Oil Level 5',
        slug: 'motor-oil-level-5',
        sku: '573-49386-C',
        price: 23,
        images: [
            './assets/images/products/product-6-11.jpg',
            './assets/images/products/product-6-21.jpg',
        ],
        rating: 5,
        reviews: 2,
        availability: 'in-stock',
        brand: 'sunset',
        attributes: {
            Color: 'Gray',
        },
    },
    {
        name: 'Brandix Engine Block Z4',
        slug: 'brandix-engine-block-z4',
        sku: '753-38573-B',
        price: 452,
        compareAtPrice: 573,
        images: [
            './assets/images/products/product-7-11.jpg',
            './assets/images/products/product-7-21.jpg',
        ],
        rating: 0,
        reviews: 0,
        availability: 'in-stock',
        brand: 'red-gate',
        attributes: {
            Color: 'Dark Gray',
        },
    },
    {
        name: 'Brandix Clutch Discs Z175',
        slug: 'brandix-clutch-discs-z175',
        sku: '472-67382-Z',
        price: 345,
        images: [
            './assets/images/products/product-8-11.jpg',
            './assets/images/products/product-8-21.jpg',
        ],
        rating: 3,
        reviews: 7,
        availability: 'in-stock',
        brand: 'sunset',
        attributes: {
            Color: 'Coal',
        },
    },
    {
        name: 'Brandix Manual Five Speed Gearbox',
        slug: 'brandix-manual-five-speed-gearbox',
        sku: '855-78336-G',
        price: 879,
        images: [
            './assets/images/products/product-9-11.jpg',
            './assets/images/products/product-9-21.jpg',
        ],
        rating: 4,
        reviews: 6,
        availability: 'in-stock',
        brand: 'sunset',
        attributes: {
            Color: 'Orange',
        },
    },
    {
        name: 'Set of Car Floor Mats Brandix Z4',
        slug: 'set-of-car-floor-mats-brandix-z4',
        sku: '473-75662-R',
        price: 78,
        compareAtPrice: 94,
        images: [
            './assets/images/products/product-10-11.jpg',
            './assets/images/products/product-10-21.jpg',
        ],
        rating: 4,
        reviews: 16,
        availability: 'in-stock',
        brand: 'red-gate',
        attributes: {
            Color: 'Yellow',
        },
    },
    {
        name: 'Taillights Brandix Z54',
        slug: 'taillights-brandix-z54',
        sku: '521-57812-H',
        price: 60,
        images: [
            './assets/images/products/product-11-11.jpg',
            './assets/images/products/product-11-21.jpg',
        ],
        rating: 2,
        reviews: 8,
        availability: 'in-stock',
        brand: 'red-gate',
        attributes: {
            Color: 'Pear Green',
        },
    },
    {
        name: 'Wiper Blades Brandix WL2',
        slug: 'wiper-blades-brandix-wl2',
        sku: '994-34346-B',
        price: 12,
        images: [
            './assets/images/products/product-12-11.jpg',
            './assets/images/products/product-12-21.jpg',
        ],
        rating: 5,
        reviews: 41,
        availability: 'in-stock',
        attributes: {
            Color: 'Green',
        },
    },
    {
        name: 'Fantastic 12-Stroke Engine With A Power of 1991 hp',
        slug: 'fantastic-12-stroke-engine-with-a-power-of-1991-hp',
        sku: '985-00884-S',
        price: 2579,
        images: [
            './assets/images/products/product-13-11.jpg',
            './assets/images/products/product-13-21.jpg',
        ],
        rating: 3,
        reviews: 17,
        availability: 'in-stock',
        attributes: {
            Color: 'Emerald',
        },
    },
    {
        name: 'Set of Four 19 Inch Spiked Tires',
        slug: 'set-of-four-19-inch-spiked-tires',
        sku: '855-56888-U',
        price: 327,
        images: [
            './assets/images/products/product-14-11.jpg',
            './assets/images/products/product-14-21.jpg',
        ],
        rating: 4,
        reviews: 9,
        availability: 'in-stock',
        brand: 'sunset',
        attributes: {
            Color: 'Shamrock',
        },
    },
    {
        name: '40 Megawatt Low Beam Lamp',
        slug: '40-megawatt-low-beam-lamp',
        sku: '345-99553-E',
        price: 4,
        compareAtPrice: 8,
        images: [
            './assets/images/products/product-15-11.jpg',
            './assets/images/products/product-15-21.jpg',
        ],
        rating: 4,
        reviews: 31,
        availability: 'in-stock',
        brand: 'no-name',
        attributes: {
            Color: 'Shakespeare',
        },
    },
    {
        name: 'Brandix Driver\'s seat',
        slug: 'brandix-drivers-seat',
        sku: '563-73744-Q',
        price: 78,
        images: [
            './assets/images/products/product-16-11.jpg',
            './assets/images/products/product-16-21.jpg',
        ],
        rating: 3,
        reviews: 4,
        availability: 'in-stock',
        brand: 'sunset',
        attributes: {
            Color: 'Blue',
        },
    },
    {
        name: 'Air Filter From Ash\'s Chainsaw',
        slug: 'air-filter-from-ashs-chainsaw',
        sku: '999-60606-X',
        price: 666.99,
        images: [
            './assets/images/products/product-17-11.jpg',
            './assets/images/products/product-17-21.jpg',
        ],
        rating: 5,
        reviews: 66,
        availability: 'in-stock',
        brand: 'turbo-electric',
        attributes: {
            Color: 'Dark Blue',
        },
    },
    {
        name: 'Side Rearview Mirror',
        slug: 'side-rearview-mirror',
        sku: '545-74573-D',
        price: 40,
        compareAtPrice: 60,
        images: [
            './assets/images/products/product-18-11.jpg',
            './assets/images/products/product-18-21.jpg',
        ],
        rating: 4,
        reviews: 25,
        availability: 'in-stock',
        brand: 'turbo-electric',
        attributes: {
            Color: 'Violet',
        },
    },
    {
        name: 'Brandix Car Door Lock',
        slug: 'brandix-car-door-lock',
        sku: '965-73344-F',
        price: 21,
        compareAtPrice: 31,
        images: [
            './assets/images/products/product-19-11.jpg',
            './assets/images/products/product-19-21.jpg',
        ],
        badges: ['sale'],
        rating: 3,
        reviews: 24,
        availability: 'in-stock',
        brand: 'turbo-electric',
        attributes: {
            Color: 'Purple',
        },
    },
    {
        name: 'Air Suspension For Brandix Car',
        slug: 'air-suspension-for-brandix-car',
        sku: '365-32667-P',
        price: 162,
        compareAtPrice: 174,
        images: [
            './assets/images/products/product-20-11.jpg',
            './assets/images/products/product-20-21.jpg',
        ],
        rating: 5,
        reviews: 7,
        availability: 'in-stock',
        brand: 'sunset',
        attributes: {
            Color: 'Cerise',
        },
    },
    {
        name: 'Sunset Brake Kit',
        slug: 'sunset-brake-kit',
        sku: 'SSX-780B390-S',
        price: 1259,
        images: [
            './assets/images/products/product-21-11.jpg',
            './assets/images/products/product-21-21.jpg',
        ],
        rating: 4,
        reviews: 7,
        availability: 'in-stock',
        brand: 'sunset',
        attributes: {
            Color: 'Orange',
        },
    },
    {
        name: 'Specter Brake Kit',
        slug: 'specter-brake-kit',
        sku: 'SCT-123A380-S',
        price: 799,
        images: [
            './assets/images/products/product-22-11.jpg',
            './assets/images/products/product-22-21.jpg',
        ],
        rating: 5,
        reviews: 3,
        availability: 'in-stock',
        brand: 'specter',
        attributes: {
            Color: 'Green',
        },
    },
    {
        name: 'Brake Kit',
        slug: 'brake-kit',
        sku: 'NNO-120K643-S',
        price: 569,
        images: [
            './assets/images/products/product-23-11.jpg',
            './assets/images/products/product-23-21.jpg',
        ],
        rating: 3,
        reviews: 9,
        availability: 'in-stock',
        brand: 'no-name',
        attributes: {
            Color: 'Shamrock',
        },
    },
    {
        name: 'STP Generator Platinum',
        slug: 'stp-generator-platinum',
        sku: 'STP-577843-E',
        price: 379,
        images: [
            './assets/images/products/product-24-11.jpg',
            './assets/images/products/product-24-21.jpg',
        ],
        rating: 5,
        reviews: 22,
        availability: 'in-stock',
        brand: 'red-gate',
        attributes: {
            Color: 'Dark Blue',
        },
    },
];
//export const dbProducts: Product[] = makeProducts(productsDef);

const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
export function getMakeProducts() {
    /*return httpClient.get(`${environment.apiUrl}/api/get-inventory-products`).pipe(
        map((response: any) => {
            //adjust data before return
            return response; 
        })
    );*/
    return httpClient.get<any>(`${environment.apiUrl}/api/get-inventory-products`).subscribe(
        res => {
            //console.log(res.data);
            makeProducts(res.data);
            //return res.data;
        },
        err => {
            console.log(err);
        }
    );
    //private destroy$: Subject<void> = new Subject<void>();
    //return '========dbMakeProducts====prctService: ProductService=====';
	/*productService.getInventoryProducts().pipe(
		takeUntil(this.destroy$),
	).subscribe(
		res => {
			if ((res.data).length > 0 && res.status == 'success') {
				return res.data;
			}
			return null;
		},
		err => {
			return err;
		},
	);*/
}
export const dbProducts = getMakeProducts();
console.log(dbProducts);

export abstract class AbstractProductServiceBuilder {
    //constructor(productService: ProductService) { }
    abstract getAllProducts(): void;
}
export class ProductServiceBuilder extends AbstractProductServiceBuilder {
    //private destroy$: Subject<void> = new Subject<void>();
    //constructor(public productService: ProductService) { }
    private someService: ProductService;

	getAllProducts():void {
        console.log('=============');
		/*this.someService.getInventoryProducts().pipe(
			takeUntil(this.destroy$),
		).subscribe(
			res => {
				console.log(res.data);
				//return makeProducts(res.data);
			},
			err => {
				err;
			}
		);*/
	}
}

export function getId(): number {
    return ++lastId;
}

export const addresses: Address[] = [
    {
        id: getId(),
        firstName: 'Ryan',
        lastName: 'Ford',
        company: 'Stroyka',
        country: 'RAND',
        address1: 'ul. Varshavskaya, 15-2-178',
        address2: '',
        city: 'Moscow',
        state: 'Moscow',
        postcode: '115302',
        email: 'stroyka@example.com',
        phone: '38 972 588-42-36',
        default: true,
    },
    {
        id: getId(),
        firstName: 'Jupiter',
        lastName: 'Saturnov',
        company: 'Stroyka',
        country: 'LAND',
        address1: 'Sun Orbit, 43.3241-85.239',
        address2: '',
        city: 'MarsGrad',
        state: 'MarsGrad',
        postcode: '4b4f53',
        email: 'jupiter@example.com',
        phone: 'ZX 971 972-57-26',
        default: false,
    },
];

export interface OrderItemOptionDef {
    name: string;
    value: string;
}

export interface OrderItemDef {
    product: string;
    options: OrderItemOptionDef[];
    quantity: number;
}

export interface OrderDef {
    number: string;
    createdAt: string;
    payment: string;
    status: string;
    items: OrderItemDef[];
}

export function getNextOrderId(): number {
    return ++lastId;
}

export function getNextOrderNumber(): string {
    return (orders.reduce((prev, curr) => Math.max(prev, parseFloat(curr.number)), 0) + 1).toString();
}

export function getOrderToken(orderId: number): string {
    const token = 'b84486c31644eac99f6909a6e8c19109';

    return token.slice(0, token.length - orderId.toString().length) + orderId.toString();
}

function makeOrders(defs: OrderDef[]): Order[] {
    return defs.map(def => {
        const id = getNextOrderId();
        const items = def.items.map(orderItemDef => {
            const product = dbProducts.find(x => x.slug === orderItemDef.product);

            return {
                product: JSON.parse(JSON.stringify(product)),
                options: orderItemDef.options,
                price: product.price,
                quantity: orderItemDef.quantity,
                total: product.price * orderItemDef.quantity,
            };
        });

        const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = items.reduce((acc, item) => acc + item.total, 0);

        const totals: OrderTotal[] = [
            {title: 'SHIPPING', price: 25},
            {title: 'TAX', price: Math.round(subtotal * .2)},
        ];

        const total = subtotal + totals.reduce((acc, x) => acc + x.price, 0);

        return {
            id,
            token: getOrderToken(id),
            number: def.number,
            createdAt: def.createdAt,
            payment: def.payment,
            status: def.status,
            items,
            quantity,
            subtotal,
            totals,
            total,
            shippingAddress: JSON.parse(JSON.stringify(addresses[0])),
            billingAddress: JSON.parse(JSON.stringify(addresses[0])),
        };
    });
}

const ordersDef: OrderDef[] = [
    {
        number: '9478',
        createdAt: '2020-10-19',
        payment: 'PayPal',
        status: 'PENDING',
        items: [
            {
                product: 'brandix-spark-plug-kit-asr-400',
                options: [
                    {name: 'Color', value: 'True Red'},
                    {name: 'Material', value: 'Aluminium'},
                ],
                quantity: 2,
            },
            {
                product: 'brandix-brake-kit-bdx-750z370-s',
                options: [],
                quantity: 1,
            },
            {
                product: 'left-headlight-of-brandix-z54',
                options: [
                    {name: 'Color', value: 'Green'},
                ],
                quantity: 3,
            },
        ],
    },
    {
        number: '7592',
        createdAt: '2019-03-28',
        payment: 'PayPal',
        status: 'PENDING',
        items: [
            {
                product: 'brandix-drivers-seat',
                options: [
                    {name: 'Color', value: 'True Red'},
                    {name: 'Material', value: 'Aluminium'},
                ],
                quantity: 2,
            },
            {
                product: 'set-of-four-19-inch-spiked-tires',
                options: [],
                quantity: 1,
            },
        ],
    },
    {
        number: '7192',
        createdAt: '2019-03-15',
        payment: 'PayPal',
        status: 'SHIPPED',
        items: [
            {
                product: 'wiper-blades-brandix-wl2',
                options: [],
                quantity: 5,
            },
            {
                product: 'brandix-engine-block-z4',
                options: [],
                quantity: 1,
            },
        ],
    },
    {
        number: '6321',
        createdAt: '2019-02-28',
        payment: 'PayPal',
        status: 'COMPLETED',
        items: [
            {
                product: 'left-headlight-of-brandix-z54',
                options: [],
                quantity: 1,
            },
        ],
    },
    {
        number: '6001',
        createdAt: '2019-02-21',
        payment: 'PayPal',
        status: 'COMPLETED',
        items: [
            {
                product: 'taillights-brandix-z54',
                options: [],
                quantity: 7,
            },
            {
                product: 'fantastic-12-stroke-engine-with-a-power-of-1991-hp',
                options: [],
                quantity: 1,
            },
        ],
    },
    {
        number: '4120',
        createdAt: '2018-12-11',
        payment: 'PayPal',
        status: 'COMPLETED',
        items: [
            {
                product: 'air-filter-from-ashs-chainsaw',
                options: [],
                quantity: 1,
            },
        ],
    },
];

export const orders: Order[] = makeOrders(ordersDef);

export abstract class AbstractFilterBuilder {
    constructor(
        public slug: string,
        public name: string,
    ) { }
    abstract test(product: Product): boolean;
    abstract makeItems(products: Product[], value: string): void;
    abstract calc(filters: AbstractFilterBuilder[]): void;
    abstract build(): Filter;
}

export class CategoryFilterBuilder extends AbstractFilterBuilder {
    private value: string = null;
    private items: ShopCategory[] = [];

    test(product: Product): boolean {
        return true;
    }

    makeItems(products: Product[], value: string): void {
        this.value = value;
        const category = shopCategoriesList.find(x => x.slug === value);
        if (category) {
            this.items = [prepareCategory(category, 1)];
        } else {
            this.items = shopCategoriesTree.map(x => prepareCategory(x));
        }
    }

    calc(filters: AbstractFilterBuilder[]): void {
    }

    build(): CategoryFilter {
        return {
            type: 'category',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }
}

export class VehicleFilterBuilder extends AbstractFilterBuilder {
    private value: VehicleFilterValue = null;
    private vehicle: Vehicle = null;
    private static testCompatibility(vehicle: Vehicle, product: Product): boolean {
        if (product.compatibility === 'all') {
            return true;
        }
        if (product.compatibility === 'unknown') {
            return false;
        }
        return product.compatibility.includes(vehicle.id);
    }

    test(product: Product): boolean {
        if (this.value) {
            return VehicleFilterBuilder.testCompatibility(this.vehicle, product);
        }
        return true;
    }

    makeItems(products: Product[], value: string): void {
        const vehicleIds = products.reduce((acc, product) => {
            if (typeof product.compatibility !== 'string') {
                return product.compatibility.reduce((acc2, vehicleId) => {
                    return acc2.includes(vehicleId) ? acc2 : [...acc2, vehicleId];
                }, acc);
            }
            return acc;
        }, []);
        this.vehicle = dbVehicles.find(x => x.id === parseFloat(value)) || null;
        this.value = this.vehicle ? this.vehicle.id : null;
    }

    calc(filters: AbstractFilterBuilder[]): void {
    }

    build(): VehicleFilter {
        return {
            type: 'vehicle',
            slug: this.slug,
            name: this.name,
            value: this.value,
            vehicle: this.vehicle,
        };
    }
}

export class RangeFilterBuilder extends AbstractFilterBuilder {
    private min: number;
    private max: number;
    private value: [number, number];

    test(product: Product): boolean {
        const value = this.extractValue(product);
        return value >= this.value[0] && value <= this.value[1];
    }

    parseValue(value: string): [number, number] {
        return value.split('-').map(x => parseFloat(x)) as [number, number];
    }

    makeItems(products: Product[], value: string): void {
        this.max = dbProducts.reduce((acc, product) => Math.max(acc, this.extractValue(product)), 0);
        this.min = dbProducts.reduce((acc, product) => Math.min(acc, this.extractValue(product)), this.max);
        /** Calculates the number of digits for rounding. */
        let digit = Math.max(Math.ceil(this.max).toString().length - 2, 1);
        digit = Math.pow(10, digit);
        this.max = Math.ceil(this.max / digit) * digit;
        this.min = Math.floor(this.min / digit) * digit;
        this.value = [this.min, this.max];
        if (value) {
            this.value = this.parseValue(value);
        }
    }

    calc(filters: AbstractFilterBuilder[]): void {
    }

    extractValue(product: Product): number {
        if (this.slug === 'price') {
            return product.price;
        }
        throw Error();
    }

    build(): RangeFilter {
        return {
            type: 'range',
            slug: this.slug,
            name: this.name,
            min: this.min,
            max: this.max,
            value: this.value,
        };
    }
}

export class CheckFilterBuilder extends AbstractFilterBuilder {
    private items: BaseFilterItem[] = [];
    private value: string[] = [];

    test(product: Product): boolean {
        if (this.value.length === 0) {
            return true;
        }
        return this.value.reduce((result, value) => {
            return result || this.extractItems(product).map(x => x.slug).includes(value);
        }, false);
    }

    makeItems(products: Product[], value: string): void {
        products.forEach(product => this.extractItems(product).forEach(item => {
            if (!this.items.find(x => x.slug === item.slug)) {
                this.items.push(item);
            }
        }));
        this.value = this.parseValue(value);
    }

    calc(filters: AbstractFilterBuilder[]): void {
        const products = dbProducts.filter(
            product => filters.reduce(
                (isMatched, filter) => {
                    return isMatched && (filter === this || filter.test(product));
                },
                true,
            ),
        );
        this.items.forEach(item => item.count = products.reduce((acc, product) => {
            return acc + (this.extractItems(product).map(x => x.slug).includes(item.slug) ? 1 : 0);
        }, 0));
    }

    build(): CheckFilter {
        return {
            type: 'check',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    private parseValue(value: string): string[] {
        return value ? value.split(',') : [];
    }

    private extractItems(product: Product): BaseFilterItem[] {
        if (this.slug === 'brand') {
            return product.brand ? [{
                slug: product.brand.slug,
                name: product.brand.name,
                count: 0,
            }] : null;
        }
        throw Error();
    }
}

export class RadioFilterBuilder extends AbstractFilterBuilder {
    private items: BaseFilterItem[] = [];
    private value: string = null;

    test(product: Product): boolean {
        return this.extractItems(product).map(x => x.slug).includes(this.value);
    }

    makeItems(products: Product[], value: string): void {
        products.forEach(product => this.extractItems(product).forEach(item => {
            if (!this.items.find(x => x.slug === item.slug)) {
                this.items.push(item);
            }
        }));
        this.value = value || this.items[0].slug;
    }

    calc(filters: AbstractFilterBuilder[]): void {
        const products = dbProducts.filter(
            product => filters.reduce(
                (isMatched, filter) => {
                    return isMatched && (filter === this || filter.test(product));
                },
                true,
            ),
        );
        this.items.forEach(item => item.count = products.reduce((acc, product) => {
            return acc + (this.extractItems(product).map(x => x.slug).includes(item.slug) ? 1 : 0);
        }, 0));
    }

    build(): RadioFilter {
        return {
            type: 'radio',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    private extractItems(product: Product): BaseFilterItem[] {
        if (this.slug === 'discount') {
            const items: BaseFilterItem[] = [
                {slug: 'any', name: 'Any', count: 0},
            ];
            if (product.compareAtPrice) {
                items.push({slug: 'yes', name: 'Yes', count: 0});
            } else {
                items.push({slug: 'no', name: 'No', count: 0});
            }
            return items;
        }
        throw Error();
    }
}

export class RatingFilterBuilder extends AbstractFilterBuilder {
    private items: RatingFilterItem[] = [];
    private value: number[] = [];

    test(product: Product): boolean {
        if (this.value.length === 0) {
            return true;
        }
        return this.value.reduce((acc, value) => acc || this.extractItem(product).rating === value, false);
    }

    makeItems(products: Product[], value: string): void {
        products.forEach(product => {
            const item = this.extractItem(product);
            if (!this.items.find(x => x.rating === item.rating)) {
                this.items.push(item);
            }
        });
        this.value = this.parseValue(value);
        this.items.sort((a, b) => b.rating - a.rating);
    }

    calc(filters: AbstractFilterBuilder[]): void {
        const products = dbProducts.filter(
            product => filters.reduce(
                (isMatched, filter) => {
                    return isMatched && (filter === this || filter.test(product));
                },
                true,
            ),
        );
        this.items.forEach(item => item.count = products.reduce((acc, product) => {
            return acc + (item.rating === this.extractItem(product).rating ? 1 : 0);
        }, 0));
    }

    build(): RatingFilter {
        return {
            type: 'rating',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    private parseValue(value: string): number[] {
        return value ? value.split(',').map(x => parseFloat(x)) : [];
    }

    private extractItem(product: Product): RatingFilterItem {
        return {
            rating: Math.round(product.rating),
            count: 0,
        };
    }
}

const colors = [
    {code: 'white', color: '#fff'},
    {code: 'silver', color: '#d9d9d9'},
    {code: 'light-gray', color: '#b3b3b3'},
    {code: 'gray', color: '#808080'},
    {code: 'dark-gray', color: '#666'},
    {code: 'coal', color: '#4d4d4d'},
    {code: 'black', color: '#262626'},
    {code: 'red', color: '#ff4040'},
    {code: 'orange', color: '#ff8126'},
    {code: 'yellow', color: '#ffd333'},
    {code: 'pear-green', color: '#becc1f'},
    {code: 'green', color: '#8fcc14'},
    {code: 'emerald', color: '#47cc5e'},
    {code: 'shamrock', color: '#47cca0'},
    {code: 'shakespeare', color: '#47cccc'},
    {code: 'blue', color: '#40bfff'},
    {code: 'dark-blue', color: '#3d6dcc'},
    {code: 'violet', color: '#7766cc'},
    {code: 'purple', color: '#b852cc'},
    {code: 'cerise', color: '#e53981'},
];

export class ColorFilterBuilder extends AbstractFilterBuilder {
    private items: ColorFilterItem[] = [];
    private value: string[] = [];

    test(product: Product): boolean {
        if (this.value.length === 0) {
            return true;
        }
        return this.value.reduce((result, value) => {
            return result || this.extractItems(product).map(x => x.slug).includes(value);
        }, false);
    }

    makeItems(products: Product[], value: string): void {
        products.forEach(product => this.extractItems(product).forEach(item => {
            if (!this.items.find(x => x.slug === item.slug)) {
                this.items.push(item);
            }
        }));
        this.value = this.parseValue(value);
    }

    calc(filters: AbstractFilterBuilder[]): void {
        const products = dbProducts.filter(
            product => filters.reduce(
                (isMatched, filter) => {
                    return isMatched && (filter === this || filter.test(product));
                },
                true,
            ),
        );
        this.items.forEach(item => item.count = products.reduce((acc, product) => {
            return acc + (this.extractItems(product).map(x => x.slug).includes(item.slug) ? 1 : 0);
        }, 0));
        this.items = this.items.sort((a, b) => {
            return colors.findIndex(x => x.code === a.slug) - colors.findIndex(x => x.code === b.slug);
        });
    }

    build(): ColorFilter {
        return {
            type: 'color',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    private parseValue(value: string): string[] {
        return value ? value.split(',') : [];
    }

    private extractItems(product: Product): ColorFilterItem[] {
        const attribute = product.attributes.find(x => x.slug === this.slug);
        if (!attribute) {
            return [];
        }
        return attribute.values.map(value => ({
            slug: value.slug,
            name: value.name,
            color: this.getColorCode(value.slug),
            count: 0,
        }));
    }

    private getColorCode(slug: string): string {
        return colors.find(x => x.code === slug)?.color || '#000';
    }
}

function delayResponse<T>(input: Observable<T>, time = 500): Observable<T> {
    return timer(time).pipe(mergeMap(() => input));
}

export interface AddProductReviewData {
    rating: number;
    author: string;
    email: string;
    content: string;
}

export function addProductReview(productId: number, data: AddProductReviewData): Observable<Review> {
    const review: Review = {
        id: getNextReviewId(),
        date: (new Date()).toISOString().substr(0, 10),
        author: data.author,
        avatar: './assets/images/avatars/avatar-2.jpg',
        rating: data.rating,
        content: data.content,
    };
    reviews.push(review);
    return delayResponse(of(review));
}

export function checkout(data: CheckoutData): Observable<Order> {
    const id = getNextOrderId();
    const items: OrderItem[] = data.items.map(x => {
        const product: Product = dbProducts.find(p => p.id === x.productId);
        return {
            product,
            options: x.options,
            price: product.price,
            quantity: x.quantity,
            total: product.price * x.quantity,
        };
    });
    const quantity = items.reduce((acc, x) => acc + x.quantity, 0);
    const subtotal = items.reduce((acc, x) => acc + x.total, 0);
    const totals: OrderTotal[] = [
        {
            title: 'SHIPPING',
            price: 25,
        },
        {
            title: 'TAX',
            price: subtotal * 0.20,
        },
    ];
    const total = subtotal + totals.reduce((acc, x) => acc + x.price, 0);
    const date = new Date();
    const pad = (v: number) => ('00' + v).substr(-2);
    const createdAt = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const order: Order = {id, token: getOrderToken(id), number: getNextOrderNumber(), createdAt, payment: data.payment, status: 'PENDING', items, quantity, subtotal, totals, total, billingAddress: data.billingAddress, shippingAddress: data.shippingAddress,};
    orders.unshift(order);
    return delayResponse(of(order));
}

export function getCategories(options?: GetCategoriesOptions): Observable<ShopCategory[]> {
    let categories = shopCategoriesTree.slice(0);
    const depth = options.depth || 0;
    if (options.parent) {
        const parent = shopCategoriesList.find(x => x.slug === options.parent.slug);
        if (parent) {
            categories = parent.children;
        }
    } else if (options.slugs) {
        categories = shopCategoriesList.filter(x => options.slugs.includes(x.slug));
    }
    categories = categories.map(x => prepareCategory(x, depth));
    return of(clone(categories));
}

export function prepareCategory<T extends BaseCategory>(category: T, depth?: number): T {
    let children;
    if (depth && depth > 0) {
        children = category.children.map(x => prepareCategory(x, depth - 1));
    }
    return JSON.parse(JSON.stringify({
        ...category,
        parent: category.parent ? prepareCategory(category.parent) : (category.parent === null ? null : undefined),
        children,
    }));
}

function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

export interface GetCategoryBySlugOptions {
    depth?: number;
}

export function getCategoryBySlug(slug: string, options?: GetCategoryBySlugOptions): Observable<ShopCategory> {
    options = options || {};
    const category = shopCategoriesList.find(x => x.slug === slug);
    if (!category) {
        return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
    }
    return of(prepareCategory(category, options.depth));
}

function getProducts(shift: number, categorySlug: string = null): Product[] {
    switch (categorySlug) {
        case 'tires-wheels':
        case 'power-tools': shift += 5; break;
        case 'interior-parts':
        case 'hand-tools': shift += 10; break;
        case 'engine-drivetrain':
        case 'plumbing': shift += 15; break;
    }
    return [...dbProducts.slice(shift), ...dbProducts.slice(0, shift)];
}

export function getFeaturedProducts(categorySlug: string, limit: number): Observable<Product[]> {
    limit = limit || 8;
    return delayResponse(of(clone(getProducts(0, categorySlug).slice(0, limit))), 1000);
}

export function getLatestProducts(limit: number): Observable<Product[]> {
    limit = limit || 8;
    return of(clone(dbProducts.slice(0, limit)));
}

export function getPopularProducts(categorySlug: string, limit: number): Observable<Product[]> {
    limit = limit || 8;
    return delayResponse(of(clone(getProducts(6, categorySlug).slice(0, limit))), 1000);
}

export function getProductAnalogs(productId: number): Observable<Product[]> {
    const slugs: string[] = [
        'sunset-brake-kit',
        'specter-brake-kit',
        'brake-kit',
    ];
    const analogs: Product[] = dbProducts.filter(x => slugs.includes(x.slug));
    return of(clone(analogs));
}

export function getProductBySlug(slug: string): Observable<Product> {
    const product = dbProducts.find(x => x.slug === slug);
    if (!product) {
        return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
    }
    return of(clone(product));
}

export function getProductReviews(productId: number, options?: GetProductReviewsOptions): Observable<ReviewsList> {
    let items = reviews.slice(0);
    items.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }
        return 0;
    });
    const page = options.page || 1;
    const limit = options.limit || 8;
    const sort = options.sort || 'default';
    const total = items.length;
    const pages = Math.ceil(items.length / limit);
    const from = (page - 1) * limit + 1;
    const to = page * limit;
    items = items.slice(from - 1, to) as unknown as Array<Review>;
    return of({items, page, limit, sort, total, pages, from, to,});
}

/*export function getProductsList(options?: GetProductsListOptions): Observable<ProductsList> {
    const filterValues = options.filters || {};
    const filters: AbstractFilterBuilder[] = [
        new CategoryFilterBuilder('category', 'Categories'),
        new VehicleFilterBuilder('vehicle', 'Vehicle'),
        new RangeFilterBuilder('price', 'Price'),
        new CheckFilterBuilder('brand', 'Brand'),
        new RadioFilterBuilder('discount', 'With Discount'),
        new RatingFilterBuilder('rating', 'Rating'),
        new ColorFilterBuilder('color', 'Color'),
    ];
    let products = dbProducts.slice(0);
    filters.forEach(filter => filter.makeItems(products, filterValues[filter.slug]));
    // Calculate items count for filter values.
    filters.forEach(filter => filter.calc(filters));
    // Apply filters to products list.
    products = products.filter(product => filters.reduce((mr, filter) => mr && filter.test(product), true));
    const page = options.page || 1;
    const limit = options.limit || 16;
    const sort = options.sort || 'default';
    const total = products.length;
    const pages = Math.ceil(products.length / limit);
    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);
    // Sort items array.
    products = products.sort((a, b) => {
        if (['name_asc', 'name_desc'].includes(sort)) {
            if ( a.name === b.name ) {
                return 0;
            }
            return (a.name > b.name ? 1 : -1) * (sort === 'name_asc' ? 1 : -1);
        }
        return 0;
    });
    const items = products.slice(from - 1, to) as unknown as Array<Product>;
    return delayResponse(of({items, page, limit, sort, total, pages, from, to,
        filters: filters.map(x => x.build()),
    }), 350);
}*/

export function getRelatedProducts(productId: number, limit: number): Observable<Product[]> {
    limit = limit || 8;
    return of(clone(dbProducts.slice(0, limit)));
}

export function getSearchSuggestions(query: string, options?: GetSearchSuggestionsOptions): Observable<GetSearchSuggestionsResult> {
    query = query.toLowerCase();
    options = Object.assign({
        limitProducts: 4,
        limitCategories: 4,
    }, options);
    const resultProducts = dbProducts.filter(x => x.name.toLowerCase().includes(query));
    const resultCategories = shopCategoriesList.filter(x => x.name.toLowerCase().includes(query));
    return of({
        products: resultProducts.slice(0, options.limitProducts),
        categories: resultCategories.slice(0, options.limitCategories).map(x => prepareCategory(x)),
    });
}

export function getSpecialOffers(limit: number): Observable<Product[]> {
    limit = limit || 8;
    return delayResponse(of(clone(getProducts(8).slice(0, limit))), 1000);
}

export function getTopRatedProducts(categorySlug: string, limit: number): Observable<Product[]> {
    limit = limit || 8;
    return delayResponse(of(clone(getProducts(12, categorySlug).slice(0, limit))), 1000);
}

export interface GetCategoryBySlugOptions {
    depth?: number;
}

export interface GetCategoriesOptions {
    parent?: Partial<ShopCategory>;
    slugs?: string[];
    depth?: number;
}

export interface GetBrandsOptions {
    limit?: number;
}

export function getBrands(options?: GetBrandsOptions): Observable<Brand[]> {
    options = options || {};
    return of(brands.slice(0, options.limit));
}

export interface GetProductsListOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filters?: {[slug: string]: string};
}

export interface GetProductReviewsOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filters?: {[slug: string]: string};
}

export interface GetSearchSuggestionsOptions {
    limitProducts?: number;
    limitCategories?: number;
}

export interface GetSearchSuggestionsResult {
    products: Product[];
    categories: ShopCategory[];
}

export interface CheckoutItemOptionData {
    name: string;
    value: string;
}

export interface CheckoutItemData {
    productId: number;
    options: CheckoutItemOptionData[];
    quantity: number;
}

export interface CheckoutData {
    payment: string;
    items: CheckoutItemData[];
    billingAddress: AddressData;
    shippingAddress: AddressData;
    comment: string;
}

@Injectable({
    providedIn: 'root'
})
export class ShopService {
    private destroy$: Subject<void> = new Subject<void>();
    apiUrl: any;
    getDbProducts: any = [];

    constructor(private http: HttpClient, /*private productService: ProductService*/) {
        this.apiUrl = environment.apiUrl;
        //this.getInventoryProducts();
    }

	/**
	* Get Inventory Products
	*/
	/*getInventoryProducts(): void {
		this.productService.getInventoryProducts().pipe(
			takeUntil(this.destroy$),
		).subscribe(
			res => {
                if ((res.data).length > 0 && res.status == 'success') {
                    this.getDbProducts.push(res.data);
                }
			},
			err => {
				console.log(err);
			},
		);
	}*/

    getCategoryBySlug(slug: string, options?: GetCategoryBySlugOptions): Observable<ShopCategory> {
        return getCategoryBySlug(slug, options);
    }

    getCategories(options?: GetCategoriesOptions): Observable<ShopCategory[]> {
        return getCategories(options);
    }

    getBrands(options?: GetBrandsOptions): Observable<Brand[]> {
        return getBrands(options);
    }

    getProductsList(options?: GetProductsListOptions): Observable<ProductsList> {
        const filterValues = options.filters || {};
        const filters: AbstractFilterBuilder[] = [
            new CategoryFilterBuilder('category', 'Categories'),
            new VehicleFilterBuilder('vehicle', 'Vehicle'),
            //new RangeFilterBuilder('price', 'Price'),
            //new CheckFilterBuilder('brand', 'Brand'),
            //new RadioFilterBuilder('discount', 'With Discount'),
            //new RatingFilterBuilder('rating', 'Rating'),
            //new ColorFilterBuilder('color', 'Color'),
        ];
        const PTService: AbstractProductServiceBuilder = new ProductServiceBuilder();
        PTService.getAllProducts();
        console.log(PTService);

        //console.log('====userData====');
        //console.log(this.getDbProducts);
        //console.log('====userData====');
        //if (this.getDbProducts && this.getDbProducts != undefined) {
            let products = dbProducts.slice(0);
            //console.log(products);

            filters.forEach(filter => filter.makeItems(products, filterValues[filter.slug]));
            //console.log(filters);

            // Calculate items count for filter values.
            filters.forEach(filter => filter.calc(filters));
            //console.log(filters);

            // Apply filters to products list.
            products = products.filter(product => filters.reduce((mr, filter) => mr && filter.test(product), true));
            //console.log(products);

            const page = options.page || 1;
            const limit = options.limit || 16;
            const sort = options.sort || 'default';
            const total = products.length;
            const pages = Math.ceil(products.length / limit);
            const from = (page - 1) * limit + 1;
            const to = Math.min(page * limit, total);
            // Sort items array.
            products = products.sort((a, b) => {
                if (['name_asc', 'name_desc'].includes(sort)) {
                    if ( a.name === b.name ) {
                        return 0;
                    }
                    return (a.name > b.name ? 1 : -1) * (sort === 'name_asc' ? 1 : -1);
                }
                return 0;
            });
            const items = products.slice(from - 1, to) as unknown as Array<Product>;
            return delayResponse(of({items, page, limit, sort, total, pages, from, to,
                filters: filters.map(x => x.build()),
            }), 350);

            //return getProductsList(options);
        //}
    }

    getProductBySlug(slug: string): Observable<Product> {
        return getProductBySlug(slug);
    }

    getProductReviews(productId: number, options?: GetProductReviewsOptions): Observable<ReviewsList> {
        return getProductReviews(productId, options);
    }

    addProductReview(productId: number, data: AddProductReviewData): Observable<Review> {
        return addProductReview(productId, data);
    }

    getProductAnalogs(productId: number): Observable<Product[]> {
        return getProductAnalogs(productId);
    }

    getRelatedProducts(productId: number, limit: number): Observable<Product[]> {
        return getRelatedProducts(productId, limit);
    }

    getFeaturedProducts(categorySlug: string, limit: number): Observable<Product[]> {
        return getFeaturedProducts(categorySlug, limit);
    }

    getPopularProducts(categorySlug: string, limit: number): Observable<Product[]> {
        return getPopularProducts(categorySlug, limit);
    }

    getTopRatedProducts(categorySlug: string, limit: number): Observable<Product[]> {
        return getTopRatedProducts(categorySlug, limit);
    }

    getSpecialOffers(limit: number): Observable<Product[]> {
        return getSpecialOffers(limit);
    }

    getLatestProducts(limit: number): Observable<Product[]> {
        return getLatestProducts(limit);
    }

    getSearchSuggestions(query: string, options?: GetSearchSuggestionsOptions): Observable<GetSearchSuggestionsResult> {
        return getSearchSuggestions(query, options);
    }

    checkout(data: CheckoutData): Observable<Order> {
        return checkout(data);
        //return null;
    }

}
