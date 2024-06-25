import { Component, ViewChild } from '@angular/core';
import { ModalContainerDirective } from '../../directives/modal-container.directive';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-host',
  standalone: true,
  imports: [ModalContainerDirective],
  template: `<ng-container appModalContainer></ng-container>`,

})
export class ModalHostComponent {
  @ViewChild(ModalContainerDirective) modalHost: ModalContainerDirective;


  constructor(private modalService: ModalService) {}

  ngAfterViewInit() {
    this.modalService.registerHost(this.modalHost);
  }

}
