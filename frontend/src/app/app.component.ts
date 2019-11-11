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
                  <sg-drawer-button link="employees" icon="account_circle">Работники</sg-drawer-button>
                  <sg-drawer-button link="subsidiaries" icon="storefront">Филиалы</sg-drawer-button>
                  <sg-drawer-button link="parts" icon="memory">Комплектующие</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="computers" icon="desktop_mac">Компьютеры</sg-drawer-button>
                  <sg-drawer-button link="software" icon="developer_board">Программы</sg-drawer-button>
                  <sg-drawer-button link="licences" icon="shop">Лицензии</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="settings" icon="settings">Настройки</sg-drawer-button>
                  <sg-drawer-button link="about" icon="info">О системе</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <div class="flex-spacer"></div>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="" icon="exit_to_app">Выход</sg-drawer-button>
              </div>
          </mat-sidenav>
      </mat-sidenav-container>`,
  styles: [`
      mat-divider {
          margin: 8px;
      }

      mat-sidenav-container {
          height: 100vh;
      }

      #drawer-content-container {
          padding-top: 1em;
          padding-bottom: 1em;
          display: flex;
          flex-direction: column;
          width: 250px;
          height: calc(100% - 2em);
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
