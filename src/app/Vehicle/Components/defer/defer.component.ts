import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-defer',
    imports: [],
    templateUrl: './defer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './defer.component.scss'
})
export class DeferComponent implements OnInit {

  ngOnInit(): void {
  }

}
