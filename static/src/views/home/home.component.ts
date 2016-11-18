import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <h2>Home</h2>
    <h3 class="greeting">{{greeting}}</h3>
    <img src="/assets/images/image.png" alt="Angular">
  `,
  styles: ['.greeting { color: darkgray; }']
})

export class HomeComponent {
  greeting: string = 'Hello Angular! :)';
}
