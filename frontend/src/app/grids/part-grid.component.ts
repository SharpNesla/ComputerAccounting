import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "../services/part-type.service";
import {Observable} from "rxjs";
import {Computer} from "../entities/computer";
import {EditorBase} from "../utils/editor-base";
import {Part} from "../entities/part";
import {PartService} from "../services/part.service";
import {EntityGridBase} from "../utils/entity-grid-base";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'sg-part-grid',
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
              <th mat-header-cell *matHeaderCellDef>Имя</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Name}} </td>
          </ng-container>

          <ng-container matColumnDef="inventory_id">
              <th mat-header-cell *matHeaderCellDef>Инвентарный номер</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.InventoryId}} </td>
          </ng-container>

          <ng-container matColumnDef="info" stickyEnd>
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let element" class="sg-table-info-button">
                  <button mat-icon-button>
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
              <button mat-menu-item [routerLink]="'/parts/edit/' + item.Id">

                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">
                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>
  <sg-crud router-link="/parts/add"
           icon="memory"
           [count]="this.Count"
           (Paginate)="this.refresh($event.offset, $event.limit)"
           entity-name="комплектующих"
           [isCompact]="this.isCompact"></sg-crud>`
})
export class PartGridComponent extends EntityGridBase<Part, PartService> {
  constructor(service: PartService, dialog: MatDialog) {
    super(service, dialog, ['select','id', 'name', 'inventory_id', 'info']);
  }
}
