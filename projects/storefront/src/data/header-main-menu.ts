import { MainMenuLink } from '../app/interfaces/main-menu-link';

export const mainMenu: MainMenuLink[] = [
    {
        title: 'About',
        url: '/site/about-us',
        submenu: {
            type: 'menu',
            links: [
                {title: 'About Us', url: '/site/about-us'},
                {title: 'Careers', url: '/about/careers'},
            ],
        },
    },
    {
        title: 'Products',
        url: '/shop/shop-grid-4-sidebar',
        submenu: {
            type: 'menu',
            links: [
                {
                    title: 'Brands',
                    url: '/product/brands',
				},
				{
                    title: 'Car Lines',
                    url: '/product/car-lines',
				},
				{
                    title: 'Featured Brands',
                    url: '/product/featured-brands',
				},
            ],
        },
    },
    {
        title: 'Contact',
        url: '/blog',
        submenu: {
            type: 'menu',
            links: [
                {
                    title: 'Contact Us',
                    url: '/site/contact-us-v1',
                },
                {
                    title: 'Location & Business Hours',
                    url: '/site/contact-us-v2',
                },
            ],
        },
    },
    {
        title: 'Specials',
        url: '/account',
    },
	// {
        // title: 'Sales Portal',
        // url: '/sales-portal',
        // submenu: {
            // type: 'menu',
            // links: [
                // {title: 'Chat', url: '/sales-portal/chat'},
                // {title: 'Ask Price', url: '/sales-portal/ask-price'},
				// {title: 'Cart', url: '/sales-portal/cart'},
                // {
                    // title: 'History',
                    // url: '/sales-portal/order-history',
                    // links: [
                        // {title: 'Order History', url: '/sales-portal/order-history'},
                        // {title: 'Quote History', url: '/sales-portal/quote-history'},
                        // {title: 'Chat History', url: '/sales-portal/chat-history'},
						// {title: 'Search History', url: '/sales-portal/search-history'},
                        // {title: 'Assigned Chat History', url: '/sales-portal/assigned-chat-history'},
                    // ],
                // },
                // {
                    // title: 'Settings',
                    // url: '/sales-portal/chat-email-time',
                    // links: [
                        // {title: 'Chat Email Time', url: '/sales-portal/chat-email-time'},
                        // {title: 'Set Status', url: '/sales-portal/set-status'},
                    // ],
                // },
				// {title: 'Customer Stats', url: '/sales-portal/customer-stats'},
            // ],
        // },
    // },
];
