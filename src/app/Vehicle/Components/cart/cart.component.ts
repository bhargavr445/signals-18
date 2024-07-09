import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Result } from '../../Models/VehiclesI';
import { Router } from '@angular/router';
import { ModalService } from '../../../commons/services/modal.service';
import { ModalComponent } from '../../../commons/components/modal/modal.component';
import { JsonPipe } from '@angular/common';
import { ToggleCloseTypes } from '../../../commons/Interfaces/ModalContentI';
import { ModalConstants } from '../../../commons/constants/modal.constants';
import { ModalContainerDirective } from '../../../commons/directives/modal-container.directive';
import { DropdownComponent } from '../../../commons/components/dropdown/dropdown.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles-table',
  standalone: true,
  imports: [ModalComponent, JsonPipe, ModalContainerDirective, DropdownComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartComponent implements OnInit {

  form = new FormGroup({
    productType: new FormControl('')
  })

  nameprop = 'Stuname';
  cartService = inject(CartService);
  modalService = inject(ModalService);
  router = inject(Router);

  ngOnInit(): void {
    this.productTypeControl.valueChanges.subscribe( (value) => {
      console.log(value);
      
    });

    this.form.valueChanges.subscribe((v) => console.log(v)
    )
  }


  // options = ['op1', 'op2', 'op3'];
  displayprops = ['userId', 'userName'];
  options = [
    {userId: 'uid1', userName: 'user name1'},
    {userId: 'uid2', userName: 'user name2'},
    {userId: 'uid3', userName: 'user name3'}
  ];

  items = [
     'Item 1',
     'Item 2',
     'Item 3',
     'Item 5',
     'Item 7'
  ];

  get productTypeControl() {
    return this.form.get('productType') as FormControl;
  }

  // showModal = signal('c');
  itemIdToDelete = signal<string>('');
  
  cartItems = computed(() => {
    return this.cartService.vehicleCartSignal()
  });

  removeFromCart(item: Result) {
    this.showModal();
    this.itemIdToDelete.set(item.customId);
  }

  handleCloseType(type: ToggleCloseTypes) {
    type === ModalConstants.confirmClick ? this.cartService.removeitemFromCart(this.itemIdToDelete()) : this.itemIdToDelete.set('');
  }

  navigateToVehicles() {
    this.router.navigate(['vehicle'])
  }

  selectedOptionEvent(event) {
    console.log(event.detail);
  }

  showModal() {
    const compRef = this.modalService.dynamicComponentOnDOM();
    compRef.openModal({
      content: 'Are you sure that you want to remove this item from Cart?',
      primaryButton: 'Cancel',
      secondaryButton: 'Delete',
      headerLabel: 'Alert',
      toggleStatus: 'o'
    });

    compRef.closeEvent.subscribe((closeType) => {
      console.log(closeType);
      this.handleCloseType(closeType);
    })

    const stu = {
      id: '101',
      [this.nameprop]: 'Bhargav'
    }
    console.log(stu);
    

  }

}
