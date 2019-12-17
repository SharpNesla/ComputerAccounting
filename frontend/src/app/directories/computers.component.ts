import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Справочник компьютеров</header>
          <div left-content>
              <button mat-icon-button>
                  <mat-icon [mat-menu-trigger-for]="menu">more_vert</mat-icon>
                  <mat-menu #menu="matMenu">
                      <button mat-menu-item>Удалить все</button>
                      <button mat-menu-item>Экспортировать в *.xlsx</button>
                  </mat-menu>
              </button>
          </div>
          <sg-computer-grid></sg-computer-grid>
      </sg-drawer-appbar-base>`,
})
export class ComputersComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
