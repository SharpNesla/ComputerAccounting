import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-appbar-base',
  template: `
      <main>
          <mat-toolbar color="primary" class="mat-elevation-z8">
              <ng-content select="header"></ng-content></mat-toolbar>
          <ng-content></ng-content>
      </main>`,
  styleUrls: ['../layouts-styles.scss']
})
export class AppbarBaseComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
