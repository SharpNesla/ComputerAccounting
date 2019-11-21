import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-licenses-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Лицензии</header>
          <sg-license-grid></sg-license-grid>
      </sg-drawer-appbar-base>`,

})
export class LicensesComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
