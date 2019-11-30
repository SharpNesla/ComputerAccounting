import {Component, OnInit} from '@angular/core';
import {EntityGridBase} from "../utils/entity-grid-base";
import {Room} from "../entities/room";
import {RoomService} from "../services/room.service";
import {MatDialog} from "@angular/material/dialog";
import {RoomCardComponent} from "../cards/room-card.component";


@Component({
  selector: 'sg-room-grid',
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

          <ng-container matColumnDef="number">
              <th mat-header-cell *matHeaderCellDef>Номер</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Number}} </td>
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
                          [routerLink]="'/computers/edit/' + element.Id">
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
              <button mat-menu-item [routerLink]="'/rooms/edit/' + item.Id">
                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">

                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>
      <sg-crud router-link="/rooms/add"
               icon="storefront"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="помещений"
               [isCompact]="this.isCompact"></sg-crud>`,
})
export class RoomGridComponent extends EntityGridBase<Room, RoomService> {
  constructor(private rooms: RoomService, dialog: MatDialog) {
    super(rooms, dialog, ['select', 'id', 'number', 'info'], RoomCardComponent)
  }
}
