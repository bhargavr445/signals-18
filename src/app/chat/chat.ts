import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './services/chat';
import { AuthService } from '../commons/services/api/auth.service';
import { catchError, filter, map, scan, tap, throwError } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './chat.ng.html',
  styleUrl: './chat.scss'
})
export class Chat implements OnInit {


  #chatService = inject(ChatService);
  #authService = inject(AuthService);
  textMessage = signal('');
  isSendingMessage = signal(false);

  userProfileInfo = computed(() => this.#authService.userProfileS());

  charList$ = this.#authService.getStockPrices().pipe(
    catchError((error) =>  throwError(() => ({...error, message: 'Failed'}))),
    filter(d => !!d),
    map(data =>  data),
    scan((prev, cur) => [...prev, cur], [])
  )

    isCollapsed = signal(true); // start collapsed

  toggleChat() {
    this.isCollapsed.update(prevVal => !prevVal);
  }

  ngOnInit(): void {
    this.#authService.createConnection();
  }


  sendMessage(): void {
    this.isSendingMessage.set(true);
    this.#chatService.postMessage(this.textMessage()).subscribe({
      next: (_) =>  this.textMessage.set(''),
      error: (error) =>console.log(error),
      complete: () => this.isSendingMessage.set(false)
    });
  }

}

