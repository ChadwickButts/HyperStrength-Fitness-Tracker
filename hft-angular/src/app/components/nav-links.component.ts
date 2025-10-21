import { Component } from "@angular/core";

@Component({
    selector: 'NavLinks',
    templateUrl: '../templates/nav-links.component.html',
    styleUrl: '../styles/nav-links.component.css'
})
export class NavLinks{
    links = [
        { linkId: 'dashboard', href: '/', name: 'Dashboard' },
        { linkId: 'exercises', href: '/exercises', name: 'Exercise Library' }
    ]
}