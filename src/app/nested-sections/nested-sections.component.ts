import { Component, ViewEncapsulation } from '@angular/core';
import { toggles } from './toggles';
import { ExpandableModuleComponent } from '../expandable-module/expandable-module.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nested-sections',
  imports: [ExpandableModuleComponent, NgFor, NgIf, FormsModule],
  templateUrl: './nested-sections.component.html',
  styleUrl: './nested-sections.component.scss',
    encapsulation: ViewEncapsulation.ShadowDom,
  
})
export class NestedSectionsComponent {

  data = toggles; // Assign the toggles object to a variable
  keys = Object.keys(this.data);

  // Track expanded states for each toggle
  expandedSections: { [key: string]: boolean } = {};

  toggleSection(sectionKey: string) {
    this.expandedSections[sectionKey] = !this.expandedSections[sectionKey];
  }

}
