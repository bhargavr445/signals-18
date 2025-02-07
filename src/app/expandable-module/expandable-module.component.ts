import { NgFor, NgIf } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-expandable-module',
  imports: [NgIf, NgFor],
  templateUrl: './expandable-module.component.html',
  styleUrl: './expandable-module.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ExpandableModuleComponent {
  @Input() module: any; // Accepts the module object

  expanded = false; // Track expansion state

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
