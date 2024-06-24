import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalContainer]',
  standalone: true
})
export class ModalContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
  

}
