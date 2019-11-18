import {Component, OnInit} from '@angular/core';
import {EntityGridBase} from "../utils/entity-grid-base";
import {Room} from "./room";
import {RoomService} from "./room.service";
import {PartTypeService} from "../parts/part-type.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'sg-room-grid',
  template: `
      <div id="sg-table-container">
          <table mat-table [dataSource]="this.Entities" class="mat-elevation-z4">


              <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef>№</th>
                  <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: DisplayedColumns;"></tr>
          </table>
      </div>
      <sg-crud router-link="/rooms/add"
               icon="storefront"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="помещений"
               is-compact="false"></sg-crud>`,
})
export class RoomGridComponent extends EntityGridBase<Room, RoomService> {
  constructor(private rooms: RoomService, dialog: MatDialog) {
    super(rooms, dialog, ['id'])
  }
}
