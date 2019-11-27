import {Component, OnInit} from '@angular/core';
import {NavigationService} from "./navigation.service";
import {AuthService} from "./login/auth.service";
import {Employee} from "./employees/employee";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
      <mat-sidenav-container>
          <mat-sidenav-content>
              <router-outlet></router-outlet>
          </mat-sidenav-content>
          <mat-sidenav mode="over" [(opened)]="this.IsDrawerOpened">
              <div id="drawer-content-container">
                  <div id="sg-drawer-userbar">
                      <div>
<!--                          <b>{{(CurrentEmployee | async).Surname}} {{(CurrentEmployee | async).Name}}-->
<!--                              {{(CurrentEmployee | async).Patronymic}}</b>-->
                          <div>Директор</div>
                      </div>
                      <div class="flex-spacer"></div>
                      <button id="sg-drawer-userbar-close" mat-icon-button (click)="this.closeDrawer()">
                          <mat-icon>arrow_forward</mat-icon>
                      </button>
                  </div>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="dashboard" icon="dashboard">Обзор</sg-drawer-button>
                  <sg-drawer-button link="analytics" icon="insert_chart_outlined">Аналитика</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="employees" icon="account_circle">Работники</sg-drawer-button>
                  <sg-drawer-button link="subsidiaries" icon="storefront">Филиалы</sg-drawer-button>
                  <sg-drawer-button link="parts" icon="memory">Комплектующие</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="computers" icon="desktop_mac">Компьютеры</sg-drawer-button>
                  <sg-drawer-button link="software" icon="developer_board">Программы</sg-drawer-button>
                  <sg-drawer-button link="licenses" icon="shop">Лицензии</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="settings" icon="settings">Настройки</sg-drawer-button>
                  <sg-drawer-button link="about" icon="info">О системе</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <div class="flex-spacer"></div>
                  <mat-divider></mat-divider>
                  <sg-drawer-button (click)="logout()" link="" icon="exit_to_app">Выход</sg-drawer-button>
              </div>
          </mat-sidenav>
      </mat-sidenav-container>`,
  styles: [`
      mat-divider {
          margin: 8px;
      }

      #sg-drawer-userbar-close {
          transform: scale(1.5);
          margin-left: 1em;
      }

      #sg-drawer-userbar {
          display: flex;
          align-items: center;
          padding: 1em 2em 1em 1.8em;
      }

      mat-sidenav-content {
          flex-direction: column;
          display: flex;
          align-content: stretch;
          justify-content: stretch;
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
export class AppComponent implements OnInit {
  get IsDrawerOpened(): boolean {
    return this.navService.IsDrawerOpened;
  }

  set IsDrawerOpened(value: boolean) {
    this.navService.IsDrawerOpened = value;
  }

  closeDrawer() {
    this.navService.IsDrawerOpened = false;
  }

  constructor(private navService: NavigationService,
              private auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {

  }


}
