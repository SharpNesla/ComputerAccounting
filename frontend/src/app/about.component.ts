import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-about',
  template: `<sg-drawer-appbar-base>
      <header>О системе</header>
  </sg-drawer-appbar-base>`
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
