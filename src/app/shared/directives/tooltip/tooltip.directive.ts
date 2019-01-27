import { Directive, OnInit, ContentChild, TemplateRef, ViewContainerRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})

export class TooltipDirective implements OnInit {
    @ContentChild('tooltipTemplate') private tooltipTemplate: TemplateRef<any>;

    constructor(private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
    }

    @HostListener('mouseenter', ['$event']) onMouseEnter(event: Event) {
        this.viewContainerRef.createEmbeddedView(this.tooltipTemplate);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.viewContainerRef.clear();
    }
}
