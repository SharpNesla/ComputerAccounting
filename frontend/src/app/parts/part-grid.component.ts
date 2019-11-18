import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "./part-type.service";
import {Observable} from "rxjs";
import {Computer} from "../computers/computer";
import {EditorBase} from "../utils/editor-base";
import {Part} from "./part";
import {PartService} from "./part.service";
import {EntityGridBase} from "../utils/entity-grid-base";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'sg-part-grid',
  template: `
      <div id="sg-table-container">
          <table mat-table [dataSource]="this.Entities" class="mat-elevation-z8">

              <!--- Note that these columns can be defined in any order.
                    The actual rendered columns are set as a property on the row definition" -->

              <!-- Position Column -->
              <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef>№</th>
                  <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Модель</th>
                  <td mat-cell *matCellDef="let element"> {{element.Name}} </td>
              </ng-container>

              <ng-container matColumnDef="inventory_id">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let element"> {{element.InventoryId}} </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: DisplayedColumns;"></tr>
          </table>
      </div>
      <sg-crud router-link="/part-types/add"
               icon="memory"
               entity-name="комплектующих"
               is-compact="false"></sg-crud>`
})
export class PartGridComponent extends EntityGridBase<Part, PartService> {
  constructor(service: PartService, dialog: MatDialog) {
    super(service, dialog, ['id', 'name', 'inventory_id']);
  }
}
