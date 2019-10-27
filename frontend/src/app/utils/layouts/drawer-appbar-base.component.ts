import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'sg-drawer-appbar-base',
  template: `
      <main>
          <mat-toolbar color="primary" class="mat-elevation-z8">
              <button (click)="openDrawer()" mat-icon-button><mat-icon>menu</mat-icon></button>
              <ng-content select="header"></ng-content></mat-toolbar>
          <ng-content></ng-content>
      </main>`
})
export class DrawerAppbarBaseComponent implements OnInit {

  constructor(private nav : NavigationService) {
  }

  ngOnInit() {
  }

  openDrawer() {
    this.nav.IsDrawerOpened = true;
  }
}
