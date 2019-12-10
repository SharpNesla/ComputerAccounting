import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../entities/employee";
import {EntityGridBase} from "./entity-grid-base";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeCardComponent} from "../cards/employee-card.component";
import {AngularTreeGridComponent} from "angular-tree-grid";


@Component({
  selector: 'sg-employee-tree',
  template: `
      <button mat-button (click)="collapseAll(angularGrid)">Collapse All</button>
      <button mat-button (click)="expandAll(angularGrid)">Expand All</button>
      <p></p>
      <db-angular-tree-grid #angularGrid [data]="data" [configs]="configs" class="sg-employee-treetable"></db-angular-tree-grid>
  `,
  styles:[`    
  `]
})
export class EmployeeTreeComponent {
  data: any = [
    {id: 1, name: 'Bimal', age: 60, weight: 60, gender: 1, phone: 7930343463, parent: 0},
    {id: 2, name: 'Bhagi', age: 40, weight: 95, gender: 1, phone: 7930343463, parent: 1},
    {id: 3, name: 'Kalyana', age: 36, weight: 105, gender: 1, phone: 7930343463, parent: 1},
    {id: 4, name: 'Prakash', age: 20, weight: 20, gender: 1, phone: 7930343463, parent: 2},
    {id: 5, name: 'Jitu', age: 21, weight: 61, gender: 1, phone: 7930343463, parent: 3},
    {id: 6, name: 'Sunil', age: 60, weight: 87, gender: 1, phone: 7930343463, parent: 34},
    {id: 7, name: 'Tadit', age: 40, weight: 60, gender: 1, phone: 7930343463, parent: 6},
    {id: 8, name: 'Suraj', age: 36, weight: 60, gender: 1, phone: 7930343463, parent: 6},
    {id: 9, name: 'Swarup', age: 20, weight: 40, gender: 1, phone: 7930343463, parent: 8},
    {id: 10, name: 'Lakin', age: 21, weight: 55, gender: 1, phone: 7930343463, parent: 8},
  ];

  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    parent_display_field: 'name',
    css: { // Optional
      expand_class: 'fa fa-caret-right',
      collapse_class: 'fa fa-caret-down',
    },
    columns: [
      {
        name: 'name',
        header: 'Name',
        width: 'auto'
      },
      {
        name: 'age',
        header: 'Age',
        renderer: function (value) {
          return value + ' years';
        }
      },
      {
        name: 'weight',
        header: 'Weight'
      },
      {
        name: 'gender',
        header: 'Gender',
        renderer: function (value) {
          return value ? 'Male' : 'Female';
        }
      },
      {
        name: 'phone',
        header: 'Phone',
        width: '150px'
      }
    ]
  };

  collapseAll(component: AngularTreeGridComponent) {
    component.collapseAll();
  }

  expandAll(component: AngularTreeGridComponent) {
    component.expandAll();
  }
}
