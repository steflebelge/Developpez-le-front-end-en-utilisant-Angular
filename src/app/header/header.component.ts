import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showDetailsLink:boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showDetailsLink = this.router.url.startsWith('/details/');
    });
  }

}
