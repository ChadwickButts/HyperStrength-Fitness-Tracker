import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarTop } from './components/navbar-top.component';
import { Dashboard } from './components/dashboard.component';
import { NavLinks } from './components/nav-links.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarTop, NavLinks, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hft-angular');
}
