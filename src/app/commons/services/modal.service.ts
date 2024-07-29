import { ComponentFactoryResolver, Injectable, inject, signal } from '@angular/core';
import { ModalContentI, ModalDataI } from '../Interfaces/ModalContentI';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalContainerDirective } from '../directives/modal-container.directive';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  ComponentFactoryResolver = inject(ComponentFactoryResolver);
  modalLabels = signal<ModalDataI>(null);
  private modalHost: ModalContainerDirective;

  dynamicComponentOnDOM() {
    const modalcompFactory = this.ComponentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = this.modalHost.viewContainerRef;
    hostViewContainerRef.clear();
    
    const compRef = hostViewContainerRef.createComponent(modalcompFactory);
    return compRef.instance;
  }

  registerHost(host: ModalContainerDirective) {
    this.modalHost = host;
  }

}
