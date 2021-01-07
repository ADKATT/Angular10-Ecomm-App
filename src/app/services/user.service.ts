import { Injectable } from '@angular/core';
import { map, shareReplay, switchMap, tap, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DataService } from './data.service';
import { User } from '../interfaces/user';
import { Order, OrderTotal } from '../interfaces/order';
import { Address, AddressData } from '../interfaces/address';
import { OrdersList } from '../interfaces/list';
import { Product, ProductAttribute } from '../interfaces/product';
import { Brand } from '../interfaces/brand';
import { BaseCategory, BlogCategory, Category, ShopCategory } from '../interfaces/category';
import { environment } from '../../environments/environment';

let lastId = 0;

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

export const shopCategoriesTree: ShopCategory[] = makeCategories(makeShopCategory, shopCategoriesDef);

export const shopCategoriesList: ShopCategory[] = flatTree(shopCategoriesTree);

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
            './assets/images/products/product-1-11.jpg',
            './assets/images/products/product-1-21.jpg',
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

export const products: Product[] = makeProducts(productsDef);
//const productsDef: ProductDef[] = [];
//const dbProducts: Product[] = makeProducts(productsDef);
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

export function getOrderToken(orderId: number): string {
    const token = 'b84486c31644eac99f6909a6e8c19109';

    return token.slice(0, token.length - orderId.toString().length) + orderId.toString();
}

export function getNextOrderNumber(): string {
    return (orders.reduce((prev, curr) => Math.max(prev, parseFloat(curr.number)), 0) + 1).toString();
}

function makeOrders(defs: OrderDef[]): Order[] {
    return defs.map(def => {
        const id = getNextOrderId();
        const items = def.items.map(orderItemDef => {
            const product = products.find(x => x.slug === orderItemDef.product);

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

function error(message: string): HttpErrorResponse {
    return new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: {message},
    });
}

export function delayResponse<T>(input: Observable<T>, time = 500): Observable<T> {
    return timer(time).pipe(mergeMap(() => input));
}

export function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

export function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
}

export interface EditAddressData extends AddressData {
    default: boolean;
}

export interface EditProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface GetOrdersListOptions {
    page?: number;
    limit?: number;
    sort?: string;
}

export function accountChangePassword(oldPassword: string, newPassword: string): Observable<void> {
    if (newPassword.length < 6) {
        return delayResponse(throwError(error('AUTH_WEAK_PASSWORD')));
    }
    return delayResponse(of(null));
}

export function accountEditProfile(data: EditProfileData): Observable<User> {
    const user: User = {
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        user: '',
        profileImage: '\assets\images\avatars\avatar.png',
        avatar: '\assets\images\avatars\avatar.png',
        token: ''
    };
    return delayResponse(of(user));
}

export function accountSignIn(email: string, password: string): Observable<User> {
    if (email === 'red-parts@example.com' && password === '123456') {
        const user: User = {
            email: 'nsi@example.com',
            phone: '38 972 588-42-36',
            firstName: 'Ryan',
            lastName: 'Ford',
            user: '',
            profileImage: '\assets\images\avatars\avatar.png',
            avatar: '\assets\images\avatars\avatar.png',
            token: ''
        };
        return delayResponse(of(user));
    }
    return delayResponse(throwError(error('AUTH_WRONG_PASSWORD')));
}

export function accountSignOut(): Observable<void> {
    return of(null);
}

export function accountSignUp(email: string, password: string): Observable<User> {
    if (!/^.+@.+$/.test(email)) {
        return delayResponse(throwError(error('AUTH_INVALID_EMAIL')));
    }
    if (email === 'red-parts@example.com') {
        return delayResponse(throwError(error('AUTH_EMAIL_ALREADY_IN_USE')));
    }
    if (password.length < 6) {
        return delayResponse(throwError(error('AUTH_WEAK_PASSWORD')));
    }
    const user: User = {
        email,
        phone: '38 972 588-42-36',
        firstName: 'Ryan',
        lastName: 'Ford',
        user: '',
        profileImage: '\assets\images\avatars\avatar.png',
        avatar: '\assets\images\avatars\avatar.png',
        token: ''
    };
    return delayResponse(of(user));
}

export function addAddress(data: EditAddressData): Observable<Address> {
    const address: Address = { id: getId(), firstName: '', lastName: '', company: '', country: '', address1: '', address2: '', city: '', state: '', postcode: '', email: '', phone: '', default: false, ...data, };
    if (addresses.length < 1) {
        address.default = true;
    }
    if (address.default) {
        addresses.forEach(x => x.default = false);
    }
    addresses.push(address);
    return delayResponse(of(address));
}

export function delAddress(addressId: number): Observable<void> {
    const index = addresses.findIndex(x => x.id === addressId);
    if (index !== -1) {
        const address = addresses.splice(index, 1)[0];
        if (address.default && addresses.length > 0) {
            addresses[0].default = true;
        }
    }
    return delayResponse(of(null));
}

export function editAddress(addressId: number, data: EditAddressData): Observable<Address> {
    const address = addresses.find(x => x.id === addressId);
    address.firstName = data.firstName;
    address.lastName = data.lastName;
    address.company = data.company;
    address.country = data.country;
    address.address1 = data.address1;
    address.address2 = data.address2;
    address.city = data.city;
    address.state = data.state;
    address.postcode = data.postcode;
    address.email = data.email;
    address.phone = data.phone;
    address.default = data.default;
    if (address.default) {
        addresses.forEach(x => x.default = x.id === addressId);
    }
    return delayResponse(of(address));
}

export function getAddress(addressId: number): Observable<Address> {
    return of(clone(addresses.find(x => x.id === addressId) || null));
}

export function getAddresses(): Observable<Address[]> {
    return of(clone(addresses));
}

export function getDefaultAddress(): Observable<Address> {
    return of(clone(addresses.find(x => x.default) || null));
}

export function getOrderById(id: number): Observable<Order> {
    const order = orders.find(x => x.id === id);
    if (order) {
        return of(order);
    }
    return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
}

export function getOrderByToken(token: string): Observable<Order> {
    const order = orders.find(x => x.token === token);
    if (order) {
        return of(order);
    }
    return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
}

export function getOrdersList(options?: GetOrdersListOptions): Observable<OrdersList> {
    options = options || {};
    let items: Order[] = JSON.parse(JSON.stringify(orders));
    const page = options.page || 1;
    const limit = options.limit || 16;
    const sort = options.sort || 'default';
    const total = items.length;
    const pages = Math.ceil(items.length / limit);
    const from = (page - 1) * limit + 1;
    const to = page * limit;
    items = items.slice(from - 1, to);
    return of({ page, limit, sort, total, pages, from, to, items, });
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userSubject: BehaviorSubject<User | null>;
    apiUrl: any;
    token: any;
    get user(): User | null { return this.userSubject.value; }
    readonly user$: Observable<User | null>;

    constructor(private http: HttpClient, private dataService: DataService) {
        //super();
        this.apiUrl = environment.apiUrl;
        const storedUser = localStorage.getItem('user');

        this.userSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
        this.user$ = this.userSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.userSubject.value;
    }

    signIn(email: string, password: string): Observable<void> {
        return this.http.post<any>(`${this.apiUrl}/api/login`, {email: email, password: password})
            .pipe(map(user => {
                if(user.success){
                    this.dataService.setRole(user.role, user.token);
                    this.setUser(user);
                    return user;
                }
        }));
    }

    signUp(email: string, password: string): Observable<User> {
        return accountSignUp(email, password).pipe(
            tap(user => this.setUser(user)),
        );
    }

    signOut(): Observable<void> {
        return this.http.post<any>(`${this.apiUrl}/api/logout`, {})
            .pipe(map(user => {
                this.setUser(null);
                return null;
        }));
    }

    validateIP(): Observable<void> {
        return this.http.get<any>(`${this.apiUrl}/api/validate-ip`)
            .pipe(map(user => {
                return user;
        }));
    }

    validToken(): Observable<void> {
        return this.http.post<any>(`${this.apiUrl}/api/token-validate`, {})
            .pipe(map(user => {
                return user;
            }));
    }

    getRole(): Observable<void> {
        let users = JSON.parse(localStorage.getItem('user'));
        return users.role;
    }

    getUserId(): Observable<void> {
        let users = JSON.parse(localStorage.getItem('user'));
        return users.id;
    }

    getcurrentUser(): Observable<void> {
        return this.http.get<any>(`${this.apiUrl}/api/get-user-details?filter_column=user_code`)
            .pipe(map(user => {
                return user;
        }));
    }

    editProfile(data: EditProfileData): Observable<User> {
        return accountEditProfile(data).pipe(
            tap(user => this.setUser(user)),
        );
    }

    changePassword(value, filter_column, filter_value): Observable<void> {
        return this.http.post<any>(`${this.apiUrl}/api/change-password?filter_column=${filter_column}&filter_value=${filter_value}`, value)
            .pipe(map(res => {
                return res;
        }));
    }

    addAddress(data: EditAddressData): Observable<Address> {
        return addAddress(data);
    }

    editAddress(addressId: number, data: EditAddressData): Observable<Address> {
        return editAddress(addressId, data);
    }

    delAddress(addressId: number): Observable<void> {
        return delAddress(addressId);
    }

    getDefaultAddress(): Observable<Address | null> {
        return getDefaultAddress();
    }

    getAddress(addressId: number): Observable<Address> {
        return getAddress(addressId);
    }

    getAddresses(): Observable<Address[]> {
        return getAddresses();
    }

    getOrdersList(options?: GetOrdersListOptions): Observable<OrdersList> {
        return getOrdersList(options);
    }

    getOrderById(id: number): Observable<Order> {
        return getOrderById(id);
    }

    getOrderByToken(token: string): Observable<Order> {
        return getOrderByToken(token);
    }

    private setUser(user: User): void {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

}
