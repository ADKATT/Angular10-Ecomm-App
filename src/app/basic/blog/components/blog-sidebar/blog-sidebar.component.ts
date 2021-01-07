import { Component, OnInit } from '@angular/core';
import { BlogCategory } from '../../../../interfaces/category';
//import { BlogApi } from '../../../../api/base';
import { BlogService } from '../../../../services/blog.service';
import { Observable } from 'rxjs';
import { Post } from '../../../../interfaces/post';
//import { blogPosts } from '../../../../data/blog-posts';
//import { blogWidgetComments } from '../../../../data/blog-widget-comments';
import { Comment } from '../../../../interfaces/comment';

export const blogPosts = [
    {
        id: 1,
        title: 'Philosophy That Addresses Topics Such As Goodness',
        image: './assets/images/posts/post-1.jpg',
        categories: ['Special Offers'],
        date: 'October 19, 2019',
    },
    {
        id: 2,
        title: 'Logic Is The Study Of Reasoning And Argument Part 2',
        image: './assets/images/posts/post-2.jpg',
        categories: ['Latest News'],
        date: 'September 5, 2019',
    },
    {
        id: 3,
        title: 'Some Philosophers Specialize In One Or More Historical Periods',
        image: './assets/images/posts/post-3.jpg',
        categories: ['New Arrivals'],
        date: 'August 12, 2019',
    },
    {
        id: 4,
        title: 'A Variety Of Other Academic And Non-Academic Approaches Have Been Explored',
        image: './assets/images/posts/post-4.jpg',
        categories: ['Special Offers'],
        date: 'Jule 30, 2019',
    },
    {
        id: 5,
        title: 'Germany Was The First Country To Professionalize Philosophy',
        image: './assets/images/posts/post-5.jpg',
        categories: ['New Arrivals'],
        date: 'June 12, 2019',
    },
    {
        id: 6,
        title: 'Logic Is The Study Of Reasoning And Argument Part 1',
        image: './assets/images/posts/post-6.jpg',
        categories: ['Special Offers'],
        date: 'May 21, 2019',
    },
    {
        id: 7,
        title: 'Many Inquiries Outside Of Academia Are Philosophical In The Broad Sense',
        image: './assets/images/posts/post-7.jpg',
        categories: ['Special Offers'],
        date: 'April 3, 2019',
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
        date: 'February 10, 2019',
    },
    {
        id: 10,
        title: 'Engineers Use Many Methods To Minimize Logic Functions',
        image: './assets/images/posts/post-10.jpg',
        categories: ['Special Offers'],
        date: 'January 1, 2019',
    },
];

export const blogWidgetComments = [
    {
        id: 1,
        author: 'Emma Williams',
        postTitle: 'Nullam at varius sapien sed sit amet condimentum elit',
        text: 'In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...',
        date: '3 minutes ago',
    },
    {
        id: 2,
        author: 'Airic Ford',
        postTitle: 'Integer efficitur efficitur velit non pulvinar pellentesque dictum viverra',
        text: 'In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...',
        date: '25 minutes ago',
    },
    {
        id: 3,
        author: 'Loyd Walker',
        postTitle: 'Curabitur quam augue vestibulum in mauris fermentum pellentesque libero',
        text: 'In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...',
        date: '2 hours ago',
    },
    {
        id: 4,
        author: 'Jessica Moore',
        postTitle: 'Vestibulum leo sapien sollicitudin at magna eu interdum congue feugiat',
        text: 'In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge...',
        date: '3 days ago',
    },
];

@Component({
    selector: 'app-blog-sidebar',
    templateUrl: './blog-sidebar.component.html',
    styleUrls: ['./blog-sidebar.component.scss'],
})
export class BlogSidebarComponent implements OnInit {
    categories$: Observable<BlogCategory[]>;

    posts: Post[] = blogPosts.slice(0, 4);

    comments: Comment[] = blogWidgetComments.slice(0, 3);

    constructor(
        private blogService: BlogService,
    ) { }

    ngOnInit(): void {
        this.categories$ = this.blogService.getCategories({depth: 1});
    }
}
