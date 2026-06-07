import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { toggles } from './toggles';
import { ExpandableModuleComponent } from '../expandable-module/expandable-module.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nested-sections',
  imports: [ExpandableModuleComponent, FormsModule],
  templateUrl: './nested-sections.component.html',
  styleUrl: './nested-sections.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    encapsulation: ViewEncapsulation.ShadowDom,
  
})
export class NestedSectionsComponent {

  data = toggles; // Assign the toggles object to a variable
  keys = Object.keys(this.data);
  toggleProps = {
    mqa_reg_compliance: true,
    prr_r_cm: false,
    prr_main: false
  };

  // Track expanded states for each toggle
  expandedSections: { [key: string]: boolean } = {};

  constructor() {
    this.checkPropValueAgainstUserProfile();
  }

  toggleSection(sectionKey: string) {
    this.expandedSections[sectionKey] = !this.expandedSections[sectionKey];
  }

  checkPropValueAgainstUserProfile() {
    const keys = Object.keys(this.data);
    // console.log(keys);

    keys.forEach((key) => this.updateToggleValues(this.data[key], this.toggleProps))

  }

  updateToggleValues(obj: any, toggleProps: any) {
    if (obj.modules) {
      obj.modules = obj.modules.map((module: any) => {
        if (module.toggleProp && toggleProps.hasOwnProperty(module.toggleProp)) {
          module.toggleValue = toggleProps[module.toggleProp]; // Add toggleValue
        }
        if (module.modules) {
          this.updateToggleValues(module, toggleProps); // Recursive call for nested modules
        }
        return module;
      });
    }
  }
  

}
