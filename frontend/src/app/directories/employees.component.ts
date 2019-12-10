import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-employee-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Работники</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab label="Древовидное представление">
                  <sg-employee-tree></sg-employee-tree>
              </mat-tab>
              <mat-tab label="Список">
                  <sg-employee-grid></sg-employee-grid>
              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`,

})
export class EmployeesComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
