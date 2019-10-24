import {Component, OnInit} from '@angular/core';
import {ModelService} from "../../model/model.service";

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
export class ComputerDirectoryComponent implements OnInit {

  constructor(private _model : ModelService) {
    console.log(_model);
  }

  ngOnInit() {
  }

}
