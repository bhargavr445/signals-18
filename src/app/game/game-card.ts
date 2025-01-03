import { Component, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game.scss'
})
export class GameCard {


  item = input.required<any>();
  articleName = input.required<string>();
  articleNameLs = linkedSignal(() => this.articleName());
  selectedGameInfo = output<string>();

  handleShortDesc(data: string) {    
    if(data.length > 80) {
      return `${data.substring(0,80)}...`
    }
    return data
  }

  onTestClick(title) {
    this.selectedGameInfo.emit(title);
  }

  resetHeaderInfo() {
    this.articleNameLs.update((name) => `${name} By Bhargav R G`);
  }

}
