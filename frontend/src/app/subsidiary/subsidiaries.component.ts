import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Филиалы</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab  label="Справочник филиалов">
                  <ng-container>
                      
                  </ng-container>
              </mat-tab>
              <mat-tab label="Справочник помещений">
              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`

})
export class SubsidiariesComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
