import {Component} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../entities/employee";
import {EntityGridBase} from "./entity-grid-base";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeCardComponent} from "../cards/employee-card.component";

@Component({
  selector: 'sg-employee-grid',
  template: `
      <table mat-table [dataSource]="this.Entities"
             [class.sg-table-compact]="isCompact" class="sg-table">
          <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                  <mat-checkbox>
                  </mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let row" class="sg-table-checkbox">
                  <mat-checkbox>
                  </mat-checkbox>
              </td>
          </ng-container>

          <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>№</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Id}} </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Имя</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Name}} </td>
          </ng-container>

          <ng-container matColumnDef="surname">
              <th mat-header-cell *matHeaderCellDef>Фамилия</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Surname}}
              </td>
          </ng-container>

          <ng-container matColumnDef="patronymic">
              <th mat-header-cell *matHeaderCellDef>Отчество</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Patronymic}}
              </td>
          </ng-container>

          <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Должность</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Role | role}}
              </td>
          </ng-container>

          <ng-container matColumnDef="info" stickyEnd>
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let element"
                  [class.sg-table-action-button-container-compact]="isCompact"
                  class="sg-table-action-button-container">
                  <button mat-icon-button
                          *ngIf="!isCompact" (click)="remove(element)">
                      <mat-icon>delete</mat-icon>
                  </button>
                  <button mat-icon-button *ngIf="!isCompact"
                          [routerLink]="'/employees/edit/' + element.Id">
                      <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button
                          (click)="showInfoCard(element)">
                      <mat-icon class="sg-table-info-button">error_outline</mat-icon>
                  </button>
              </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: DisplayedColumns;"></tr>
      </table>
      
      <div style="visibility: hidden; position: fixed"
           [style.left]="contextMenuPosition.x"
           [style.top]="contextMenuPosition.y"
           [matMenuTriggerFor]="contextMenu">
      </div>
      <mat-menu #contextMenu="matMenu">
          <ng-template matMenuContent let-item="item">
              <button mat-menu-item [routerLink]="'/employees/edit/' + item.Id">

                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">
                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>
      <sg-crud router-link="/employees/add"
               icon="account_circle"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="работников"
               (Search)="SearchString = $event"
               [isCompact]="this.isCompact"></sg-crud>`,
})
export class EmployeeGridComponent extends EntityGridBase<Employee, EmployeeService> {
  constructor(licenses: EmployeeService, private dialogref: MatDialog) {
    super(licenses, dialogref, ['select', 'id',
      'name', 'surname', 'patronymic', 'role', 'info'], EmployeeCardComponent)
  }
}
