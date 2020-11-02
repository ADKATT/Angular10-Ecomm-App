import { MainMenuLink } from '../app/interfaces/main-menu-link';

export const mainMenu: MainMenuLink[] = [
    {
        title: 'About',
        url: '/',
        submenu: {
            type: 'menu',
            links: [
                {title: 'About Us', url: '/about/'},
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
        // submenu: {
            // type: 'menu',
            // links: [
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
    },
];
