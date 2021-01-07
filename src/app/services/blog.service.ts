import { Injectable } from '@angular/core';
import { map, shareReplay, switchMap, tap, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { BaseCategory, BlogCategory, Category, ShopCategory } from '../interfaces/category';

let lastId = 0;

export interface CategoryDef {
    name: string;
    slug: string;
    image?: string;
    items?: number;
    layout?: 'categories' | 'products';
    children?: CategoryDef[];
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

export const blogCategoriesTree: BlogCategory[] = makeCategories(makeBlogCategory, blogCategoriesDef);

export const blogCategoriesList: BlogCategory[] = flatTree(blogCategoriesTree);

export const posts: Post[] = [
    {
        id: 1,
        title: 'Philosophy That Addresses Topics Such As Goodness',
        image: './assets/images/posts/post-1.jpg',
        categories: ['Special Offers'],
        date: '2019-10-10',
    },
    {
        id: 2,
        title: 'Logic Is The Study Of Reasoning And Argument Part 2',
        image: './assets/images/posts/post-2.jpg',
        categories: ['Latest News'],
        date: '2019-09-05',
    },
    {
        id: 3,
        title: 'Some Philosophers Specialize In One Or More Historical Periods',
        image: './assets/images/posts/post-3.jpg',
        categories: ['New Arrivals'],
        date: '2019-04-12',
    },
    {
        id: 4,
        title: 'A Variety Of Other Academic And Non-Academic Approaches Have Been Explored',
        image: './assets/images/posts/post-4.jpg',
        categories: ['Special Offers'],
        date: '2019-07-30',
    },
    {
        id: 5,
        title: 'Germany Was The First Country To Professionalize Philosophy',
        image: './assets/images/posts/post-5.jpg',
        categories: ['New Arrivals'],
        date: '2019-06-12',
    },
    {
        id: 6,
        title: 'Logic Is The Study Of Reasoning And Argument Part 1',
        image: './assets/images/posts/post-6.jpg',
        categories: ['Special Offers'],
        date: '2019-05-21',
    },
    {
        id: 7,
        title: 'Many Inquiries Outside Of Academia Are Philosophical In The Broad Sense',
        image: './assets/images/posts/post-7.jpg',
        categories: ['Special Offers'],
        date: '2019-04-03',
    },
    {
        id: 8,
        title: 'An Advantage Of Digital Circuits When Compared To Analog Circuits',
        image: './assets/images/posts/post-8.jpg',
        categories: ['Latest News'],
        date: 'Mart 29, 2019',
    },
    {
        id: 9,
        title: 'A Digital Circuit Is Typically Constructed From Small Electronic Circuits',
        image: './assets/images/posts/post-9.jpg',
        categories: ['New Arrivals'],
        date: '2019-02-10',
    },
    {
        id: 10,
        title: 'Engineers Use Many Methods To Minimize Logic Functions',
        image: './assets/images/posts/post-10.jpg',
        categories: ['Special Offers'],
        date: '2019-01-01',
    },
];

export interface GetBlogCategoriesOptions {
    depth?: number;
}

function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

function delayResponse<T>(input: Observable<T>, time = 500): Observable<T> {
    return timer(time).pipe(mergeMap(() => input));
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

export function getBlogCategories(options: GetBlogCategoriesOptions): Observable<BlogCategory[]> {
    let categories = blogCategoriesTree.slice(0);
    const depth = options.depth || 0;
    categories = categories.map(x => prepareCategory(x, depth));
    return of(clone(categories));
}

export function getLatestPosts(limit: number): Observable<Post[]> {
    return delayResponse(of(posts.slice(0, limit)));
}

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor() { }

    getLatestPosts(limit: number): Observable<Post[]> {
        return getLatestPosts(limit);
    }

    getCategories(options: GetBlogCategoriesOptions): Observable<BlogCategory[]> {
        return getBlogCategories(options);
    }
}
