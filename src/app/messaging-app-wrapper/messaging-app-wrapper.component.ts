import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-messaging-app-wrapper',
  templateUrl: './messaging-app-wrapper.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  styleUrl: './messaging-app-wrapper.component.scss',
})
export class MessagingAppWrapperComponent implements OnDestroy {

  testname = 'Micro services by Bhargav...';

  isLoaded = false;

  ngOnInit(): void {
    // Load the web component script dynamically
   // this.loadWebComponent();
  }

  // private loadWebComponent(): void {
  //   const scripts = ['src/assets/messaging-app-source/main.js'];

  //   Promise.all(
  //     scripts.map((src) => {
  //       return new Promise((resolve, reject) => {
  //         const script = document.createElement('script');
  //         script.src = src;
  //         script.onload = resolve;
  //         script.onerror = reject;
  //         document.body.appendChild(script);
  //       });
  //     })
  //   )
  //     .then(() => {
  //       console.log('App2 Web Component loaded successfully');
  //       this.isLoaded = true;
  //     })
  //     .catch((error) => console.error('Error loading App2 Web Component:', error));
  // }

  nameUpdate(e) {
    console.log(e);
    
  }

  ngOnDestroy(): void {
    const messagingApp = document.querySelector('app1-root');
    if(messagingApp){
      messagingApp.remove()
    }
  }

}
