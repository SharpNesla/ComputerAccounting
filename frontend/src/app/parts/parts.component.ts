import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Комплектующие</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab  label="Справочник комплектующих">
                  <sg-part-grid></sg-part-grid>
              </mat-tab>
              <mat-tab label="Справочник типов комплектующих">
                  <sg-part-type-grid></sg-part-type-grid>
              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`

})
export class PartsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
