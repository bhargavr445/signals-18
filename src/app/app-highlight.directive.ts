import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appAppHighlight]',
})
export class AppHighlightDirective {

  customColor = input('', { alias: 'appAppHighlight' });
  el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.customColor() || 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }

}
