import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from "../navigation.service";

@Component({
  selector: 'sg-drawer-button',
  template: `
      <button mat-flat-button [routerLink]="link" (click)="closeDrawer()">
          <mat-icon>{{icon}}</mat-icon>
          <ng-content></ng-content>
      </button>`,
  styles: [`    
  `]
})
export class DrawerButtonComponent implements OnInit {
  @Input() public link: string;
  @Input() public icon: string;

  constructor(private nav: NavigationService) {
  }

  ngOnInit() {
  }

  closeDrawer() {
    this.nav.IsDrawerOpened = false;
  }
}
