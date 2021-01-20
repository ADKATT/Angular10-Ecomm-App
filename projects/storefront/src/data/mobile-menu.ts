import { MobileMenuLink } from '../app/interfaces/mobile-menu-link';

export const mobileMenuLinks: MobileMenuLink[] = [
	{
        title: 'About',
        url: '/site/about-us',
        submenu: [
			{title: 'About Us', url: '/site/about-us'},
			{title: 'Careers', url: '/about/careers'},
        ],
    },
    {
        title: 'Products',
        url: '/product/brands',
        submenu: [
                {title: 'Brands', url: '/product/brands',},
				{title: 'Car Lines', url: '/product/car-lines',},
				{title: 'Featured Brands', url: '/product/featured-brands',},
        ],
    },
    {
        title: 'Contact',
        url: '/site/contact-us-v1',
        submenu: [
                {title: 'Contact Us', url: '/site/contact-us-v1',},
                {title: 'Location & Business Hours', url: '/site/contact-us-v2',},
        ],
    },
    {
        title: 'Specials',
        url: '/account',
    },
	{
        title: 'Sales Portal',
        url: '/sales-portal/chat',
        submenu: [
				{title: 'Chat', url: '/sales-portal/chat'},
                {title: 'Ask Price', url: '/sales-portal/ask-price'},
				{title: 'Cart', url: '/sales-portal/cart'},
				{
					title: 'History',
                    url: '/sales-portal/order-history',
					submenu: [
                        {title: 'Order History', url: '/sales-portal/order-history'},
                        {title: 'Quote History', url: '/sales-portal/quote-history'},
                        {title: 'Chat History', url: '/sales-portal/chat-history'},
						{title: 'Search History', url: '/sales-portal/search-history'},
                        {title: 'Assigned Chat History', url: '/sales-portal/assigned-chat-history'},
					],
				},
				{
                    title: 'Settings',
                    url: '/sales-portal/chat-email-time',
                    submenu: [
                        {title: 'Chat Email Time', url: '/sales-portal/chat-email-time'},
                        {title: 'Set Status', url: '/sales-portal/set-status'},
                    ],
				},
				{title: 'Customer Stats', url: '/sales-portal/customer-stats'},
        ],
    },
    // {
        // title: 'Shop',
        // url: '/shop/shop-grid-4-sidebar',
        // submenu: [
            // {
                // title: 'Category',
                // url: '/shop/category',
                // submenu: [
                    // {title: '3 Columns Sidebar', url: '/shop/category-columns-3-sidebar'},
                    // {title: '4 Columns Sidebar', url: '/shop/category-columns-4-sidebar'},
                    // {title: '5 Columns Sidebar', url: '/shop/category-columns-5-sidebar'},
                    // {title: '4 Columns Full', url: '/shop/category-columns-4-full'},
                    // {title: '5 Columns Full', url: '/shop/category-columns-5-full'},
                    // {title: '6 Columns Full', url: '/shop/category-columns-6-full'},
                    // {title: '7 Columns Full', url: '/shop/category-columns-7-full'},
                    // {title: 'Right Sidebar', url: '/shop/category-right-sidebar'},
                // ],
            // },
            // {
                // title: 'Shop Grid',
                // url: '/shop/shop-grid-4-sidebar',
                // submenu: [
                    // {title: '6 Columns Full', url: '/shop/shop-grid-6-full'},
                    // {title: '5 Columns Full', url: '/shop/shop-grid-5-full'},
                    // {title: '4 Columns Full', url: '/shop/shop-grid-4-full'},
                    // {title: '4 Columns Sidebar', url: '/shop/shop-grid-4-sidebar'},
                    // {title: '3 Columns Sidebar', url: '/shop/shop-grid-3-sidebar'},
                // ],
            // },
            // {title: 'Shop List', url: '/shop/shop-list'},
            // {title: 'Shop Table', url: '/shop/shop-table'},
            // {title: 'Shop Right Sidebar', url: '/shop/shop-right-sidebar'},
            // {
                // title: 'Product',
                // url: '/shop/product-full',
                // submenu: [
                    // {title: 'Full Width', url: '/shop/product-full'},
                    // {title: 'Left Sidebar', url: '/shop/product-sidebar'},
                // ],
            // },
            // {title: 'Cart', url: '/shop/cart'},
            // {title: 'Checkout', url: '/shop/checkout'},
            // {title: 'Order Success', url: '/shop/order-success'},
            // {title: 'Wishlist', url: '/shop/wishlist'},
            // {title: 'Compare', url: '/shop/compare'},
            // {title: 'Track Order', url: '/shop/track-order'},
        // ],
    // },
    // {
        // title: 'Blog',
        // url: '/blog',
        // submenu: [
            // {
                // title: 'Blog Classic',
                // url: '/blog/classic-right-sidebar',
                // submenu: [
                    // {title: 'Left Sidebar', url: '/blog/classic-left-sidebar'},
                    // {title: 'Right Sidebar', url: '/blog/classic-right-sidebar'},
                // ],
            // },
            // {
                // title: 'Blog List',
                // url: '/blog/list-right-sidebar',
                // submenu: [
                    // {title: 'Left Sidebar', url: '/blog/list-left-sidebar'},
                    // {title: 'Right Sidebar', url: '/blog/list-right-sidebar'},
                // ],
            // },
            // {
                // title: 'Blog Grid',
                // url: '/blog/grid-right-sidebar',
                // submenu: [
                    // {title: 'Left Sidebar', url: '/blog/grid-left-sidebar'},
                    // {title: 'Right Sidebar', url: '/blog/grid-right-sidebar'},
                // ],
            // },
            // {
                // title: 'Post Page',
                // url: '/blog/post-full-width',
                // submenu: [
                    // {title: 'Full Width', url: '/blog/post-full-width'},
                    // {title: 'Left Sidebar', url: '/blog/post-left-sidebar'},
                    // {title: 'Right Sidebar', url: '/blog/post-right-sidebar'},
                // ],
            // },
            // {title: 'Post Without Image', url: '/blog/post-without-image'},
        // ],
    // },
    // {
        // title: 'Account',
        // url: '/account',
        // submenu: [
            // {title: 'Login & Register', url: '/account/login'},
            // {title: 'Dashboard', url: '/account/dashboard'},
            // {title: 'Garage', url: '/account/garage'},
            // {title: 'Edit Profile', url: '/account/profile'},
            // {title: 'Order History', url: '/account/orders'},
            // {title: 'Order Details', url: '/account/order-details'},
            // {title: 'Address Book', url: '/account/addresses'},
            // {title: 'Edit Address', url: '/account/edit-address'},
            // {title: 'Change Password', url: '/account/password'},
        // ],
    // },
    // {
        // title: 'Pages',
        // url: '/site/about-us',
        // submenu: [
            // {title: 'About Us', url: '/site/about-us'},
            // {title: 'Contact Us v1', url: '/site/contact-us-v1'},
            // {title: 'Contact Us v2', url: '/site/contact-us-v2'},
            // {title: '404', url: '/site/not-found'},
            // {title: 'Terms And Conditions', url: '/site/terms'},
            // {title: 'FAQ', url: '/site/faq'},
            // {title: 'Components', url: '/site/components'},
            // {title: 'Typography', url: '/site/typography'},
        // ],
    // },
    // {
        // title: 'Buy Theme',
        // url: 'https://themeforest.net/item/redparts-auto-parts-angular-template/27087440',
        // external: true,
        // customFields: {
            // highlight: true,
        // },
    // },
];
