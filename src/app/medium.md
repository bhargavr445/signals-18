# 1
import { Component } from '@angular/core';

@Component(...)

export class AppComponent {

  // private response = [];
  
  #response = []; ✅
  
  // private fetchRecords() { } ❎
  
  #fetchRecords() { } ✅

}

# 2
import { Component, inject } from '@angular/core';

@Component(...)
export class AppComponent {
  #appService = inject(AppService); // ✅

  // constructor(#appService: AppService) {}
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  #httpClient = inject(HttpClient); // ✅
}

# 3
import { Component } from '@angular/core';

@Component({
  template: `
  
    @if(isActive) {
    
      <p>Is Active</p>
      
    } else {
    
      <p>Is Not Active</p>
      
    }
    
  `
})
export class AppComponent {
  
  isActive: boolean = true;
  
}

# 4
import { Component } from '@angular/core';

@Component({
  template: `
  
    @for(let id of ids; track id) {
    
      <p>{{id}}</p>
    
    } empty {
    
      <p>No id's Available...</p>
    
    }
    
  `
})
export class AppComponent {
  
  ids: number[] = [1,2,3,4,5];
  
}