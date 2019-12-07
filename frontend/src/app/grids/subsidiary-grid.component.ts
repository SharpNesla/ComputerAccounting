import {Component, OnInit} from '@angular/core';
import {EntityGridBase} from "./entity-grid-base";
import {Subsidiary} from "../entities/subsidiary";
import {SubsidiaryService} from "../services/subsidiary.service";
import {PartTypeService} from "../services/part-type.service";
import {MatDialog} from "@angular/material/dialog";
import {RoomCardComponent} from "../cards/room-card.component";
import {SubsidiaryCardComponent} from "../cards/subsidiary-card.component";


@Component({
  selector: 'sg-subsidiary-grid',
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

          <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Название</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Name}} </td>
          </ng-container>

          <ng-container matColumnDef="address">
              <th mat-header-cell *matHeaderCellDef>Адрес</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Address}} </td>
          </ng-container>

          <ng-container matColumnDef="roomcount">
              <th mat-header-cell *matHeaderCellDef>Комнаты</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.RoomsCount}} </td>
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
      <div class="sg-search-drawer">

          <div class="sg-search-drawer-ruleset">
              <mat-checkbox>По количеству комнат</mat-checkbox>
              <mat-form-field>
                  <input matInput placeholder="Нижняя граница">
              </mat-form-field>
              <mat-form-field>
                  <input matInput placeholder="Верхняя граница">
              </mat-form-field>
          </div>

          <div class="sg-search-drawer-ruleset">
              <mat-checkbox>По количеству компьютеров</mat-checkbox>
              <mat-form-field>
                  <input matInput placeholder="Нижняя граница">
              </mat-form-field>
              <mat-form-field>
                  <input matInput placeholder="Верхняя граница">
              </mat-form-field>
          </div>
          
          <div class="sg-search-drawer-ruleset">
              <mat-checkbox>По количеству работников</mat-checkbox>
              <mat-form-field>
                  <input matInput placeholder="Нижняя граница">
              </mat-form-field>
              <mat-form-field>
                  <input matInput placeholder="Верхняя граница">
              </mat-form-field>
          </div>
      </div>
      <div style="visibility: hidden; position: fixed"
           [style.left]="contextMenuPosition.x"
           [style.top]="contextMenuPosition.y"
           [matMenuTriggerFor]="contextMenu">
      </div>
      <mat-menu #contextMenu="matMenu">
          <ng-template matMenuContent let-item="item">
              <button mat-menu-item [routerLink]="'/subsidiaries/edit/' + item.Id">
                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">

                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>
      <sg-crud router-link="/subsidiaries/add"
               icon="storefront"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="филиалов"
               (Search)="SearchString = $event"
               [isCompact]="this.isCompact"></sg-crud>`
})
export class SubsidiaryGridComponent extends EntityGridBase<Subsidiary, SubsidiaryService> {
  constructor(private computers: SubsidiaryService, dialog: MatDialog) {
    super(computers, dialog,
      ['select', 'id', 'name', 'address', 'roomcount', 'info'],
      SubsidiaryCardComponent)
  }
}
