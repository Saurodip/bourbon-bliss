import { Directive, OnInit, TemplateRef, ViewContainerRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})

export class TooltipDirective implements OnInit {
    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.viewContainerRef.clear();
    }
}
