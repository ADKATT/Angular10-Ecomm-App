import {
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
//import { departments } from '../../../../data/header-departments';
import { DepartmentsLink } from '../../../../interfaces/departments-link';
import { fromOutsideClick } from '../../../../functions/rxjs/from-outside-click';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export const departments: DepartmentsLink[] = [
    {
        title: 'Headlights & Lighting',
        url: '/product',
        submenu: {
            type: 'megamenu',
            size: 'xl',
            image: './assets/images/departments/departments-2.jpg',
            columns: [
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/product',
                            links: [
                                {title: 'Bumpers', url: '/product'},
                                {title: 'Hoods', url: '/product'},
                                {title: 'Grilles', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Door Handles', url: '/product'},
                                {title: 'Car Covers', url: '/product'},
                                {title: 'Tailgates', url: '/product'},
                            ],
                        },
                        {title: 'Suspension', url: '/product'},
                        {title: 'Steering', url: '/product'},
                        {title: 'Fuel Systems', url: '/product'},
                        {title: 'Transmission', url: '/product'},
                        {title: 'Air Filters', url: '/product'},
                    ],
                },
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/product',
                            links: [
                                {title: 'Headlights', url: '/product'},
                                {title: 'Tail Lights', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Turn Signals', url: '/product'},
                                {title: 'Switches & Relays', url: '/product'},
                                {title: 'Corner Lights', url: '/product'},
                            ],
                        },
                        {
                            title: 'Brakes & Suspension',
                            url: '/product',
                            links: [
                                {title: 'Brake Discs', url: '/product'},
                                {title: 'Wheel Hubs', url: '/product'},
                                {title: 'Air Suspension', url: '/product'},
                                {title: 'Ball Joints', url: '/product'},
                                {title: 'Brake Pad Sets', url: '/product'},
                            ],
                        },
                    ],
                },
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Interior Parts',
                            url: '/product',
                            links: [
                                {title: 'Floor Mats', url: '/product'},
                                {title: 'Gauges', url: '/product'},
                                {title: 'Consoles & Organizers', url: '/product'},
                                {title: 'Mobile Electronics', url: '/product'},
                                {title: 'Steering Wheels', url: '/product'},
                                {title: 'Cargo Accessories', url: '/product'},
                            ],
                        },
                        {
                            title: 'Engine & Drivetrain',
                            url: '/product',
                            links: [
                                {title: 'Air Filters', url: '/product'},
                                {title: 'Oxygen Sensors', url: '/product'},
                                {title: 'Heating', url: '/product'},
                                {title: 'Exhaust', url: '/product'},
                                {title: 'Cranks & Pistons', url: '/product'},
                            ],
                        },
                    ],
                },
                {
                    size: '1of5',
                    links: [
                        {
                            title: 'Tools & Garage',
                            url: '/product',
                            links: [
                                {title: 'Repair Manuals', url: '/product'},
                                {title: 'Car Care', url: '/product'},
                                {title: 'Code Readers', url: '/product'},
                                {title: 'Tool Boxes', url: '/product'},
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Interior Parts',
        url: '/product',
        submenu: {
            type: 'megamenu',
            size: 'lg',
            image: './assets/images/departments/departments-1.jpg',
            columns: [
                {
                    size: 3,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/product',
                            links: [
                                {title: 'Bumpers', url: '/product'},
                                {title: 'Hoods', url: '/product'},
                                {title: 'Grilles', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Door Handles', url: '/product'},
                                {title: 'Car Covers', url: '/product'},
                                {title: 'Tailgates', url: '/product'},
                            ],
                        },
                        {title: 'Suspension', url: '/product'},
                        {title: 'Steering', url: '/product'},
                        {title: 'Fuel Systems', url: '/product'},
                        {title: 'Transmission', url: '/product'},
                        {title: 'Air Filters', url: '/product'},
                    ],
                },
                {
                    size: 3,
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/product',
                            links: [
                                {title: 'Headlights', url: '/product'},
                                {title: 'Tail Lights', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Turn Signals', url: '/product'},
                                {title: 'Switches & Relays', url: '/product'},
                                {title: 'Corner Lights', url: '/product'},
                            ],
                        },
                        {
                            title: 'Brakes & Suspension',
                            url: '/product',
                            links: [
                                {title: 'Brake Discs', url: '/product'},
                                {title: 'Wheel Hubs', url: '/product'},
                                {title: 'Air Suspension', url: '/product'},
                                {title: 'Ball Joints', url: '/product'},
                                {title: 'Brake Pad Sets', url: '/product'},
                            ],
                        },
                    ],
                },
                {
                    size: 3,
                    links: [
                        {
                            title: 'Interior Parts',
                            url: '/product',
                            links: [
                                {title: 'Floor Mats', url: '/product'},
                                {title: 'Gauges', url: '/product'},
                                {title: 'Consoles & Organizers', url: '/product'},
                                {title: 'Mobile Electronics', url: '/product'},
                                {title: 'Steering Wheels', url: '/product'},
                                {title: 'Cargo Accessories', url: '/product'},
                            ],
                        },
                    ],
                },
                {
                    size: 3,
                    links: [
                        {
                            title: 'Tools & Garage',
                            url: '/product',
                            links: [
                                {title: 'Repair Manuals', url: '/product'},
                                {title: 'Car Care', url: '/product'},
                                {title: 'Code Readers', url: '/product'},
                                {title: 'Tool Boxes', url: '/product'},
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Switches & Relays',
        url: '/product',
        submenu: {
            type: 'megamenu',
            size: 'md',
            image: './assets/images/departments/departments-3.jpg',
            columns: [
                {
                    size: 4,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/product',
                            links: [
                                {title: 'Bumpers', url: '/product'},
                                {title: 'Hoods', url: '/product'},
                                {title: 'Grilles', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Door Handles', url: '/product'},
                                {title: 'Car Covers', url: '/product'},
                                {title: 'Tailgates', url: '/product'},
                            ],
                        },
                        {title: 'Suspension', url: '/product'},
                        {title: 'Steering', url: '/product'},
                        {title: 'Fuel Systems', url: '/product'},
                        {title: 'Transmission', url: '/product'},
                        {title: 'Air Filters', url: '/product'},
                    ],
                },
                {
                    size: 4,
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/product',
                            links: [
                                {title: 'Headlights', url: '/product'},
                                {title: 'Tail Lights', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Turn Signals', url: '/product'},
                                {title: 'Switches & Relays', url: '/product'},
                                {title: 'Corner Lights', url: '/product'},
                            ],
                        },
                        {
                            title: 'Brakes & Suspension',
                            url: '/product',
                            links: [
                                {title: 'Brake Discs', url: '/product'},
                                {title: 'Wheel Hubs', url: '/product'},
                                {title: 'Air Suspension', url: '/product'},
                                {title: 'Ball Joints', url: '/product'},
                                {title: 'Brake Pad Sets', url: '/product'},
                            ],
                        },
                    ],
                },
                {
                    size: 4,
                    links: [
                        {
                            title: 'Interior Parts',
                            url: '/product',
                            links: [
                                {title: 'Floor Mats', url: '/product'},
                                {title: 'Gauges', url: '/product'},
                                {title: 'Consoles & Organizers', url: '/product'},
                                {title: 'Mobile Electronics', url: '/product'},
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Tires & Wheels',
        url: '/product',
        submenu: {
            type: 'megamenu',
            size: 'nl',
            image: './assets/images/departments/departments-4.jpg',
            columns: [
                {
                    size: 6,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/product',
                            links: [
                                {title: 'Bumpers', url: '/product'},
                                {title: 'Hoods', url: '/product'},
                                {title: 'Grilles', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Door Handles', url: '/product'},
                                {title: 'Car Covers', url: '/product'},
                                {title: 'Tailgates', url: '/product'},
                            ],
                        },
                        {title: 'Suspension', url: '/product'},
                        {title: 'Steering', url: '/product'},
                        {title: 'Fuel Systems', url: '/product'},
                        {title: 'Transmission', url: '/product'},
                        {title: 'Air Filters', url: '/product'},
                    ],
                },
                {
                    size: 6,
                    links: [
                        {
                            title: 'Headlights & Lighting',
                            url: '/product',
                            links: [
                                {title: 'Headlights', url: '/product'},
                                {title: 'Tail Lights', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Turn Signals', url: '/product'},
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Tools & Garage',
        url: '/product',
        submenu: {
            type: 'megamenu',
            size: 'sm',
            columns: [
                {
                    size: 12,
                    links: [
                        {
                            title: 'Body Parts',
                            url: '/product',
                            links: [
                                {title: 'Bumpers', url: '/product'},
                                {title: 'Hoods', url: '/product'},
                                {title: 'Grilles', url: '/product'},
                                {title: 'Fog Lights', url: '/product'},
                                {title: 'Door Handles', url: '/product'},
                                {title: 'Car Covers', url: '/product'},
                                {title: 'Tailgates', url: '/product'},
                            ],
                        },
                        {title: 'Suspension', url: '/product'},
                        {title: 'Steering', url: '/product'},
                        {title: 'Fuel Systems', url: '/product'},
                        {title: 'Transmission', url: '/product'},
                        {title: 'Air Filters', url: '/product'},
                    ],
                },
            ],
        },
    },
    {title: 'Clutches', url: '/product'},
    {title: 'Fuel Systems', url: '/product'},
    {title: 'Steering', url: '/product'},
    {title: 'Suspension', url: '/product'},
    {title: 'Body Parts', url: '/product'},
    {title: 'Transmission', url: '/product'},
    {title: 'Air Filters', url: '/product'},
];

@Component({
    selector: 'app-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    isOpen = false;

    items: DepartmentsLink[] = departments;

    currentItem;

    @Input() label: string;

    @HostBinding('class.departments') classDepartments = true;

    @HostBinding('class.departments--open') get classDepartmentsOpen() {
        return this.isOpen;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private elementRef: ElementRef<HTMLElement>,
        private zone: NgZone,
    ) { }

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.zone.runOutsideAngular(() => {
            fromOutsideClick(this.elementRef.nativeElement).pipe(
                filter(() => this.isOpen),
                takeUntil(this.destroy$),
            ).subscribe(() => {
                this.zone.run(() => this.isOpen = false);
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onClick() {
        this.isOpen = !this.isOpen;
    }

    onMouseenter(item) {
        this.currentItem = item;
    }

    onMouseleave() {
        this.currentItem = null;
    }

    onItemClick(): void {
        this.isOpen = false;
        this.currentItem = null;
    }
}
