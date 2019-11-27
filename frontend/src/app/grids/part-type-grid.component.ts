import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "../services/part-type.service";
import {EntityGridBase} from "../utils/entity-grid-base";
import {PartType} from "../entities/part-type";
import {MatDialog} from "@angular/material/dialog";
import {PartTypeCardComponent} from "../cards/part-type-card.component";


@Component({
  selector: 'sg-part-type-grid',
  template: `
      <table mat-table [dataSource]="this.Entities" class="sg-table">
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
              <th mat-header-cell *matHeaderCellDef>Модель</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Model}} </td>
          </ng-container>

          <ng-container matColumnDef="cost">
              <th mat-header-cell *matHeaderCellDef>Стоимость</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Cost}} ₽
              </td>
          </ng-container>

          <ng-container matColumnDef="parts_count">
              <th mat-header-cell *matHeaderCellDef>Комплектущих</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.PartsCount}} </td>
          </ng-container>

          <ng-container matColumnDef="info" stickyEnd>
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let element" class="sg-table-info-button">
                  <button mat-icon-button (click)="showInfoCard(element)">
                      <mat-icon>error_outline</mat-icon>
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
              <button mat-menu-item [routerLink]="'/part-types/edit/' + item.Id">

                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">
                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>
      <sg-crud router-link="/part-types/add"
               icon="memory"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="типов комплектующих"
               [isCompact]="this.isCompact"></sg-crud>`
})
export class PartTypeGridComponent extends EntityGridBase<PartType, PartTypeService> {

  constructor(service: PartTypeService, dialog: MatDialog) {
    super(service, dialog,
      ['select', 'id', 'name', 'cost', 'parts_count', 'info'],
      PartTypeCardComponent);
  }

}
