import { AsyncPipe } from '@angular/common';
import { Component, input, linkedSignal, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './game.component.scss'
})
export class GameCardComponent {


  name = 'srinath';
  item = input.required<any>();
  articleName = input.required<string>();
  articleNameLs = linkedSignal(() => this.articleName());
  selectedGameInfo = output<string>();

  handleShortDesc(data: string) {    //300
    if(data?.length > 80) {
      return `${data.substring(0,80)}...`
    }
    return data
  }

  onTestClick(title) { //400
    this.selectedGameInfo.emit(title);
  }

  resetHeaderInfo() { //500
    this.articleNameLs.update((name) => `${name} By Bhargav R G`);
  }
 
}
