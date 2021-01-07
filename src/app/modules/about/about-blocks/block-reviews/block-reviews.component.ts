import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../../../basic/language/services/language.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { OwlCarouselOConfig } from 'ngx-owl-carousel-o/lib/carousel/owl-carousel-o-config';

export const testimonials = [
    {
        name: 'Jessica Moore',
        position: 'CEO Meblya',
        avatar: './assets/images/testimonials/testimonial-1.jpg',
        rating: 4,
        review: 'This division is not obsolete but has changed. Natural philosophy has split into the various natural sciences, especially astronomy, and cosmology. Moral philosophy has birthed the social sciences, but still includes value theory.',
    },
    {
        name: 'Pete Bridges',
        position: 'Truck driver',
        avatar: './assets/images/testimonials/testimonial-2.jpg',
        rating: 5,
        review: 'Philosophical questions can be grouped into categories. These groupings allow philosophers. The groupings also make philosophy easier for students to approach.',
    },
    {
        name: 'Jeff Kowalski',
        position: 'CEO Stroyka',
        avatar: './assets/images/testimonials/testimonial-3.jpg',
        rating: 4,
        review: 'The ideas conceived by a society have profound repercussions on what actions the society performs. Philosophy yields applications such as those in ethics – applied ethics in particular – and political philosophy.',
    },
];

@Component({
    selector: 'app-block-reviews',
    templateUrl: './block-reviews.component.html',
    styleUrls: ['./block-reviews.component.scss'],
})
export class BlockReviewsComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    showCarousel = true;

    testimonials = testimonials;

    carouselOptions: Partial<OwlCarouselOConfig>;

    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-reviews') classBlockReviews = true;

    constructor(
        private language: LanguageService,
        private cd: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.initOptions();

        // Since ngx-owl-carousel-o cannot re-initialize itself, we will do it manually when the direction changes.
        this.language.directionChange$.pipe(
            switchMap(() => timer(250)),
            takeUntil(this.destroy$),
        ).subscribe(() => {
            this.initOptions();

            this.showCarousel = false;
            this.cd.detectChanges();
            this.showCarousel = true;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initOptions(): void {
        this.carouselOptions = {
            dots: true,
            margin: 20,
            items: 1,
            loop: true,
            rtl: this.language.isRTL(),
            responsive: {
                0: {items: 1},
            },
        };
    }
}
