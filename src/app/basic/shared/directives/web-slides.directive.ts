import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Directive({
    selector: '[appWebSlides]',
    exportAs: 'appWebSlides',
})
export class WebSlidesDirective implements OnInit, OnChanges, OnDestroy {
    @Input() options;
    @Input() appWebSlides = 0;

    private resizeHandler;

    slides = [];
    slidesCount = 0;

    constructor(
        private eventManager: EventManager,
        private el: ElementRef,
    ) { }

    ngOnInit(): void {
        this.resizeHandler = this.eventManager.addGlobalEventListener('window', 'resize', () => this.calc());
        this.calc();
    }

    calc(): void {
        let newWebSlidesCount = 0;

        if (this.options) {
            let match = -1;
            const viewport = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            const overwrites = this.options.responsive;

            if (overwrites) {
                for (const key in overwrites) {
                    if (overwrites.hasOwnProperty(key)) {
                        if (+key <= viewport && +key > match) {
                            match = Number(key);
                        }
                    }
                }
            }

            if (match >= 0) {
                const items = overwrites[match].items;
                newWebSlidesCount = Math.max(0, items - this.appWebSlides);
            } else if (this.options.items) {
                newWebSlidesCount = Math.max(0, this.options.items - this.appWebSlides);
            }
        }

        if (this.slidesCount !== newWebSlidesCount) {
            this.slides = [];
            this.slidesCount = newWebSlidesCount;

            for (let i = 0; i < newWebSlidesCount; i++) {
                this.slides.push(i);
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.calc();
    }

    ngOnDestroy(): void {
        if (this.resizeHandler) {
            this.resizeHandler();
        }
    }
}
