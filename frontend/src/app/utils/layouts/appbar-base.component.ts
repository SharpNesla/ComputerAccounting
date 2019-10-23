import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-appbar-base',
  template: `
      <mat-toolbar color="primary" class="mat-elevation-z8">Testing</mat-toolbar>`,
  styleUrls : ['../layouts-styles.scss']
})
export class AppbarBaseComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
