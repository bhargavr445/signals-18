import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  http = inject(HttpClient);

  postMessage(message: string) {
    return this.http.post('addMessage', {messageText: message});
  }

}
