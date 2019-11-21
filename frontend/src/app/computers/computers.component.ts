import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Справочник компьютеров</header>
          
          <sg-computer-grid></sg-computer-grid>
      </sg-drawer-appbar-base>`,
})
export class ComputersComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
