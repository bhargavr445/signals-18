import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defer',
  standalone: true,
  imports: [],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss'
})
export class DeferComponent implements OnInit {

  ngOnInit(): void {
    console.log('in it...');
  }

}
