import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-settings',
  template: `<sg-drawer-appbar-base>
      <header>Настройки</header>
      <mat-card style="margin: 4em">
          <h2 class="mat-headline">Основные</h2>
          
      </mat-card>
  </sg-drawer-appbar-base>`
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
