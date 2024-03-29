import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from './navigation.service';
import {AuthService} from './login/auth.service';
import {EmployeeExtension} from './entities/employee';
import {Observable} from 'rxjs';
import {ComputerExtension} from './entities/computer';
import {EmployeeCardComponent} from './cards/employee-card.component';
import {MatDialog} from '@angular/material/dialog';
import {VisibilitiesService} from './login/visibilities.service';

@Component({
  selector: 'app-root',
  template: `
      <sg-login *ngIf="!auth.isLogin()"></sg-login>
      <mat-sidenav-container *ngIf="auth.isLogin()">
          <mat-sidenav-content>
              <router-outlet></router-outlet>
          </mat-sidenav-content>
          <mat-sidenav mode="over" [(opened)]="this.IsDrawerOpened">
              <div id="drawer-content-container">
                  <div id="sg-drawer-userbar">
                      <div>
                          <!--                          <button mat-flat-button class="sg-drawer-userbar-name" (click)="showInfoCard()">-->
                          <b>{{(CurrentEmployeeObservable | async)?.Surname}} {{(CurrentEmployeeObservable | async)?.Name}}
                              {{(CurrentEmployeeObservable | async)?.Patronymic}}</b>
                          <div>{{(CurrentEmployeeObservable | async)?.Role | role}}</div>
                          <!--                          </button>-->

                      </div>
                      <div class="flex-spacer"></div>
                      <button id="sg-drawer-userbar-close" mat-icon-button (click)="this.closeDrawer()">
                          <mat-icon>arrow_forward</mat-icon>
                      </button>
                  </div>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="dashboard" icon="dashboard">Обзор</sg-drawer-button>
<!--                  <sg-drawer-button link="analytics" icon="insert_chart_outlined"-->
<!--                                    *ngIf="visibilities.Directors | async">Аналитика-->
<!--                  </sg-drawer-button>-->
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="employees" icon="account_circle"
                                    *ngIf="visibilities.Directors | async">Работники
                  </sg-drawer-button>
                  <sg-drawer-button link="subsidiaries" icon="storefront"
                                    *ngIf="visibilities.Directors | async">Филиалы
                  </sg-drawer-button>
                  <sg-drawer-button

                          *ngIf="visibilities.NotResponsible | async"
                          link="parts" icon="memory">Комплектующие
                  </sg-drawer-button>
                  <mat-divider
                          *ngIf="visibilities.NotResponsible | async"></mat-divider>
                  <sg-drawer-button link="computers"
                                    *ngIf="visibilities.AllExceptStoreKeeper | async"
                                    icon="desktop_mac">Компьютеры
                  </sg-drawer-button>
                  <sg-drawer-button link="software" icon="developer_board"
                                    *ngIf="visibilities.AllDirectorsAndAdmins | async">Программы
                  </sg-drawer-button>
                  <sg-drawer-button link="licenses" icon="shop"
                                    *ngIf="visibilities.AllDirectorsAndAdmins | async">Лицензии
                  </sg-drawer-button>
                  <mat-divider *ngIf="visibilities.AllExceptStoreKeeper | async"></mat-divider>
<!--                  <sg-drawer-button link="settings" icon="settings">Настройки</sg-drawer-button>-->
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
  get CurrentEmployeeObservable(): Observable<EmployeeExtension> {
    return this.auth.CurrentEmployee;
  }

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
              public auth: AuthService,
              private dialog: MatDialog,
              public visibilities: VisibilitiesService) {
  }

  logout() {
    this.auth.logout();
  }


  ngOnInit(): void {
  }
}
