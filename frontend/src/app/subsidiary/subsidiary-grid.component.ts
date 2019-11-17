import {Component, OnInit} from '@angular/core';
import {EntityGridBase} from "../utils/entity-grid-base";
import {Subsidiary} from "./subsidiary";
import {SubsidiaryService} from "./subsidiary.service";


@Component({
  selector: 'sg-subsidiary-grid',
  template: `
      <div id="sg-table-container">
          <table mat-table [dataSource]="this.Entities" class="mat-elevation-z8">
              <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef>№</th>
                  <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="address">
                  <th mat-header-cell *matHeaderCellDef>Имя</th>
                  <td mat-cell *matCellDef="let element"> {{element.Address}} </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: DisplayedColumns;"></tr>
          </table>
      </div>
      <sg-crud router-link="/subsidiaries/add"
               icon="storefront"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
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
export class SubsidiaryGridComponent extends EntityGridBase<Subsidiary, SubsidiaryService> {
  constructor(private computers: SubsidiaryService) {
    super(computers, ['id', 'address'])
  }
}
