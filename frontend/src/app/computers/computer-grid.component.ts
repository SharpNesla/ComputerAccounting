import {Component, OnInit} from '@angular/core';
import {ComputerService} from "./computer.service";
import {Computer} from "./computer";
import {Observable} from "rxjs";


@Component({
  selector: 'sg-computer-grid',
  template: `
    <div id="sg-table-container">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

          <!--- Note that these columns can be defined in any order.
                The actual rendered columns are set as a property on the row definition" -->

          <!-- Position Column -->
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

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
      <sg-crud router-link="/computers/add"
               icon="desktop_mac"
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
export class ComputerGridComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'inventory_id'];
  dataSource: Observable<Computer[]>;

  constructor(private computers: ComputerService) {

  }

  ngOnInit() {
    this.dataSource =
      this.computers.get(0, 0, [], null, null)
  }

}
