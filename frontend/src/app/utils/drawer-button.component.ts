import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'sg-drawer-button',
  template: `
      <button mat-flat-button [routerLink]="link" (click)="closeDrawer()">
          <div class="sg-drawer-button-wrapper">
          <mat-icon class="sg-drawer-button-icon">{{icon}}</mat-icon>
            <ng-content></ng-content>
          </div>
      </button>`,
  styles: [`
    .sg-drawer-button-icon{
        margin-right: 6px;
        margin-left: 6px;
    }
    .sg-drawer-button-wrapper{
        display: flex;
        align-items: center;
    }
    button{
        width: 100%;
    }
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
