import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <mat-drawer-container>
          <mat-drawer-content>
              <router-outlet></router-outlet>
          </mat-drawer-content>
          <mat-drawer mode="over" opened>
              <div id="drawer-content-container">
                  <sg-drawer-button link="dashboard" icon="dashboard">Обзор</sg-drawer-button>
                  <mat-divider></mat-divider>
                  <sg-drawer-button link="computers" icon="desktop_mac">компьютеры</sg-drawer-button>
                  <button mat-flat-button>Филиалы</button>
                  <button mat-flat-button></button>
                  <button mat-flat-button>Обзор</button>
                  <button mat-flat-button>Обзор</button>
                  <button mat-flat-button>Обзор</button>
                  <button mat-flat-button routerLink="">Выход</button>
              </div>
          </mat-drawer>
      </mat-drawer-container>`,
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
}
