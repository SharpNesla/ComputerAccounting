import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'sg-computer-directory',
  template: `
      <sg-drawer-appbar-base>
          <header>Программное обеспечение</header>
          <mat-tab-group [selectedIndex]="position"
                         animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab label="Справочник ПО">
                  <ng-container>
                      <sg-software-grid></sg-software-grid>
                  </ng-container>
              </mat-tab>
              <mat-tab label="Справочник типов ПО">
                  <ng-container>
                      <sg-software-type-grid></sg-software-type-grid>
                  </ng-container>
              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`

})
export class SoftwareListComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }

  position: number;

  ngOnInit() {
    if (this.route.snapshot.url[0].path == 'software-types') {
      this.position = 1;
    } else {
      this.position = 0;
    }
  }

}
