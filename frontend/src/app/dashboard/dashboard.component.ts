import {Component, OnInit} from '@angular/core';
import {AuthService} from "../login/auth.service";
import {Employee} from "../entities/employee";
import {Observable} from "rxjs";

@Component({
  selector: 'sg-dashboard',
  template: `
      <div [ngSwitch]="(Current | async)?.Role">
          <sg-director-dashboard *ngSwitchCase="0"></sg-director-dashboard>
          <sg-branch-director-dashboard *ngSwitchCase="1"></sg-branch-director-dashboard>
          <sg-admin-dashboard *ngSwitchCase="2"></sg-admin-dashboard>
          <sg-branch-admin-dashboard *ngSwitchCase="3" ></sg-branch-admin-dashboard>
          <sg-responsible-dashboard *ngSwitchCase="4"></sg-responsible-dashboard>
          <sg-storekeeper-dashboard *ngSwitchCase="5"></sg-storekeeper-dashboard>
      </div>`,
})
export class DashboardComponent implements OnInit {
  Current : Observable<Employee>;
  constructor(auth : AuthService) {
    this.Current = auth.CurrentEmployee;
  }

  ngOnInit() {
  }

}
