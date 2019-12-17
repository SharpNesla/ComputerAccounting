import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'sg-drawer-appbar-base',
  template: `
      <div id="sg-drawer-appbar-container">
          <mat-toolbar color="primary" class="mat-elevation-z4 sg-drawer-appbar-layout-toolbar">
              <button id="drawer-button" (click)="openDrawer()" mat-icon-button>
                  <mat-icon>menu</mat-icon>
              </button>
              <ng-content select="header"></ng-content>
              <ng-content select="[left-content]"></ng-content>
          </mat-toolbar>
          <main class="mat-app-background">
              <ng-content></ng-content>
          </main>
      </div>
  `,
  styles: [`
      .sg-drawer-appbar-layout-toolba{
          flex-shrink: 0;
      }
      
      
      #drawer-button {
          margin-left: -8px;
          margin-right: 8px;
      }

      #sg-drawer-appbar-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
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
