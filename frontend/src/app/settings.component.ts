import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-settings',
  template: `<sg-drawer-appbar-base>
      <header>Настройки</header>
      <mat-card style="margin: 2em 4em">
          <h2 class="mat-headline">Основные</h2>
          <mat-slide-toggle>Тёмное оформление</mat-slide-toggle>
      </mat-card>
  </sg-drawer-appbar-base>`
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
