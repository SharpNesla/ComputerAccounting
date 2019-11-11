import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Комплектующие</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab  label="Справочник комплектующих">
                  <ng-container>
                      
                  </ng-container>
              </mat-tab>
              <mat-tab label="Справочник типов комплектующих">
              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`

})
export class SoftwareListComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
