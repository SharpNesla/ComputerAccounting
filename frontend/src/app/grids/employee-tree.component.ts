import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {EmployeeExtension} from '../entities/employee';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeCardComponent} from '../cards/employee-card.component';
import {AngularTreeGridComponent} from 'angular-tree-grid';
import {Observable} from 'rxjs';
import {RolePipe} from '../utils/role.pipe';
import {DefaultEditor} from 'angular-tree-grid';
import {ComputerExtension} from '../entities/computer';
import {DeleteDialogComponent} from '../delete-dialog.component';
import {ComputerService} from '../services/computer.service';

@Component({
  selector: 'app-custom-editor',
  template: `
      <button mat-icon-button [routerLink]="'/employees/edit/' + cell_value">
          <mat-icon>edit</mat-icon>
      </button>
      <button mat-icon-button
              (click)="showInfoCard()">
          <mat-icon class="sg-table-info-button">error_outline</mat-icon>
      </button>
  `
})
export class EmployeeEditCellComponent {
  @Input()
  column: any;

  @Input()
  cell_value: string;

  constructor(computers: EmployeeService, private dialog: MatDialog) {

  }

  showInfoCard() {
    const dialogRef = this.dialog.open(EmployeeCardComponent, {
      data: this.cell_value,
      minWidth: '900px'
    });
  }
}

@Component({
  selector: 'sg-employee-tree',
  template: `
      <ng-container *ngIf="!!data2">
          <button mat-button (click)="collapseAll(angularGrid)">Свернуть все</button>
          <button mat-button (click)="expandAll(angularGrid)">Развернуть все</button>
          <db-angular-tree-grid #angularGrid [data]="data2" [configs]="configs2"
                                class="sg-employee-treetable"></db-angular-tree-grid>
      </ng-container>

  `,
  styles: [`
  `]
})
export class EmployeeTreeComponent implements OnInit {
  data2: EmployeeExtension[];
  private rolePipe: RolePipe = new RolePipe();

  constructor(private service: EmployeeService) {

  }

  public refreshPrevious() {

  }

  ngOnInit() {
    this.service.get(null, 0, Number.MAX_SAFE_INTEGER, [], null, null)
      .subscribe(x => this.data2 = x);
  }


  configs2: any = {
    id_field: 'Id',
    parent_id_field: 'SuperiorId',
    parent_display_field: 'Name',
    css: { // Optional
      expand_class: 'fa-caret-right',
      collapse_class: 'fa-caret-down',
      row_selection_class: "sg-treetable-selection"
    },
    columns: [
      {
        name: 'Id',
        header: '№',
        editable: true,
        editor: EmployeeEditCellComponent
      },
      {
        name: 'Name',
        header: 'Имя',
        width: 'auto'
      },
      {
        name: 'Surname',
        header: 'Фамилия',
        width: 'auto'
      },
      {
        name: 'Patronymic',
        header: 'Отчество',
        width: 'auto'
      },
      {
        name: 'Role',
        header: 'Должность',
        width: 'auto',
        renderer: x => this.rolePipe.transform(x)
      },
      {
        name: 'Id',
        header: '',
        type: 'custom',
        component: EmployeeEditCellComponent
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
