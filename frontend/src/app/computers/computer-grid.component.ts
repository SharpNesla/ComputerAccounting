import {Component, OnInit} from '@angular/core';
import {ComputerService} from "./computer.service";
import {Computer} from "./computer";
import {Observable} from "rxjs";
import {EntityBase} from "../model/entities/entity-base";
import {EntityGridBase} from "../utils/entity-grid-base";


@Component({
  selector: 'sg-computer-grid',
  template: `
      <div id="sg-table-container">
          <table mat-table [dataSource]="this.Entities" class="mat-elevation-z8">
              <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef>№</th>
                  <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Имя</th>
                  <td mat-cell *matCellDef="let element"> {{element.Name}} </td>
              </ng-container>

              <ng-container matColumnDef="inventory_id">
                  <th mat-header-cell *matHeaderCellDef>Инвентарный номер</th>
                  <td mat-cell *matCellDef="let element"> {{element.InventoryId}} </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: DisplayedColumns;"></tr>
          </table>
      </div>
      <sg-crud router-link="/computers/add"
               icon="desktop_mac"
               [count] = "this.Count"
               entity-name="компьютеров"
               is-compact="false"></sg-crud>`,
  styles: [
      `:host {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
      }
    `]
})
export class ComputerGridComponent extends EntityGridBase<Computer, ComputerService> {
  constructor(private computers: ComputerService) {
    super(computers, ['id', 'name', 'inventory_id'])
  }
}
