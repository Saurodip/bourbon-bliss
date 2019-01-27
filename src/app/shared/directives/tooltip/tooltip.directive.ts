import { Directive, OnInit, Input, TemplateRef, ViewContainerRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})

export class TooltipDirective implements OnInit {
    @Input() templateRef: TemplateRef<any>;

    constructor(private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
    }

    @HostListener('mouseenter', ['$event']) onMouseEnter(event: Event) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    @HostListener('mouseleave', ['$event']) onMouseLeave(event: Event) {
        this.viewContainerRef.clear();
    }
}
