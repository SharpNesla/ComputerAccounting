import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Филиалы</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab  label="Справочник филиалов">
                  <sg-subsidiary-grid></sg-subsidiary-grid>
              </mat-tab>
              <mat-tab label="Справочник помещений" id="rooms" >
                  <sg-room-grid ></sg-room-grid>
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
