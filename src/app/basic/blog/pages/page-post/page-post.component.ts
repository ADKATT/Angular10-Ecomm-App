import { Component, OnInit } from '@angular/core';
//import { blogPosts } from '../../../../data/blog-posts';
//import { blogComments } from '../../../../data/blog-comments';
import { ActivatedRoute } from '@angular/router';

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

export const blogComments = {
    count: 4,
    items: [
        {
            id: 1,
            avatar: './assets/images/avatars/avatar-1.jpg',
            author: 'Jessica Moore',
            date: 'November 30, 2018',
            text: 'Aliquam ullamcorper elementum sagittis. Etiam lacus lacus, mollis in mattis in, vehicula eu nulla. Nulla nec tellus pellentesque.',
            children: [
                {
                    id: 2,
                    avatar: './assets/images/avatars/avatar-2.jpg',
                    author: 'Adam Taylor',
                    date: 'December 4, 2018',
                    text: 'Ut vitae finibus nisl, suscipit porttitor urna. Integer efficitur efficitur velit non pulvinar. Aliquam blandit volutpat arcu vel tristique. Integer commodo ligula id augue tincidunt faucibus.',
                },
                {
                    id: 3,
                    avatar: './assets/images/avatars/avatar-3.jpg',
                    author: 'Helena Garcia',
                    date: 'December 12, 2018',
                    text: 'Suspendisse dignissim luctus metus vitae aliquam. Vestibulum sem odio, ullamcorper a imperdiet a, tincidunt sed lacus. Sed magna felis, consequat a erat ut, rutrum finibus odio.',
                },
            ],
        },
        {
            id: 4,
            avatar: './assets/images/avatars/avatar-4.jpg',
            author: 'Ryan Ford',
            date: 'December 5, 2018',
            text: 'Nullam at varius sapien. Sed sit amet condimentum elit.',
        },
        {
            id: 5,
            avatar: './assets/images/avatars/avatar-3.jpg',
            author: 'Helena Garcia',
            date: 'December 12, 2018',
            text: 'Suspendisse dignissim luctus metus vitae aliquam. Vestibulum sem odio, ullamcorper a imperdiet a, tincidunt sed lacus. Sed magna felis, consequat a erat ut, rutrum finibus odio.',
        },
    ],
};

export type PagePostSidebarPosition = 'start' | 'end' | false;

export interface PagePostData {
    featuredImage: boolean;
    sidebarPosition: PagePostSidebarPosition;
}

@Component({
    selector: 'app-page-post',
    templateUrl: './page-post.component.html',
    styleUrls: ['./page-post.component.scss'],
})
export class PagePostComponent implements OnInit {
    posts = blogPosts;
    comments = blogComments;

    featuredImage = true;

    sidebarPosition: PagePostSidebarPosition = 'start';

    get hasImage(): boolean {
        return this.featuredImage;
    }

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: PagePostData) => {
            this.featuredImage = data.featuredImage;
            this.sidebarPosition = data.sidebarPosition;
        });
    }
}
