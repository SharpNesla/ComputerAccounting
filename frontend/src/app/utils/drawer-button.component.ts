import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sg-drawer-button',
  template: `
      <button mat-flat-button [routerLink]="link">
          <mat-icon>{{icon}}</mat-icon>
          <ng-content></ng-content>
      </button>`
})
export class DrawerButtonComponent implements OnInit {
  @Input() public link: string;
  @Input() public icon: string;
  constructor() {
  }

  ngOnInit() {
  }

}
