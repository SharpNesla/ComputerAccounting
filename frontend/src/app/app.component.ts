import {Component} from '@angular/core';
import {NavigationService} from "./navigation.service";

@Component({
  selector: 'app-root',
  template: `
      <mat-sidenav-container>
          <mat-sidenav-content>
              <router-outlet></router-outlet>
          </mat-sidenav-content>
          <mat-sidenav mode="over" [(opened)]="this.IsDrawerOpened">
              <div id="drawer-content-container">
                  <sg-drawer-button link="dashboard" icon="dashboard">Обзор</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="computers" icon="desktop_mac">Компьютеры</sg-drawer-button>
                  <sg-drawer-button>Филиалы</sg-drawer-button>
                  <sg-drawer-button></sg-drawer-button>
                  <sg-drawer-button link="parts" icon="memory">Комплектующие</sg-drawer-button>
                  <sg-drawer-button>Обзор</sg-drawer-button>
                  <sg-drawer-button>Обзор</sg-drawer-button>
                  <sg-drawer-button link="">Выход</sg-drawer-button>
              </div>
          </mat-sidenav>
      </mat-sidenav-container>`,
  styles: [`
      mat-divider {
          margin: 8px;
      }

      #drawer-content-container {
          display: flex;
          flex-direction: column;
          width: 200px;
      }
  `]
})
export class AppComponent {

  get IsDrawerOpened(): boolean {
    return this.navService.IsDrawerOpened;
  }

  set IsDrawerOpened(value: boolean) {
    this.navService.IsDrawerOpened = value;
  }

  constructor(private navService: NavigationService) {
  }
}
