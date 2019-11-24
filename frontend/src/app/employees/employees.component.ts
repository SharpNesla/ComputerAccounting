import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-employee-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Работники</header>
          <sg-employee-tree></sg-employee-tree>
      </sg-drawer-appbar-base>`,

})
export class EmployeesComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
