import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-appbar-base>
          <header>Test</header>
          <mat-tab-group color="accent" backgroundColor="primary">
              <mat-tab>
                  Test
              </mat-tab>
          </mat-tab-group>
      </sg-appbar-base>`
})
export class ComputersComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
