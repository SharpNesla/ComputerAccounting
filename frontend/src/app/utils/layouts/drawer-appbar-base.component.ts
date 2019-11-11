import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'sg-drawer-appbar-base',
  template: `
      <main>
          <mat-toolbar color="primary" class="mat-elevation-z4">
              <button id="drawer-button" (click)="openDrawer()" mat-icon-button>
                  <mat-icon>menu</mat-icon>
              </button>
              <ng-content select="header"></ng-content>
          </mat-toolbar>
          <ng-content></ng-content>
      </main>`,
  styles: [`
      #drawer-button {
          margin-left: -8px;
          margin-right: 8px;
      }
  `]
})
export class DrawerAppbarBaseComponent implements OnInit {

  constructor(private nav: NavigationService) {
  }

  ngOnInit() {
  }

  openDrawer() {
    this.nav.IsDrawerOpened = true;
  }
}
