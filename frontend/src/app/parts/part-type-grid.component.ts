import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "./part-type.service";
import {EntityGridBase} from "../utils/entity-grid-base";
import {PartType} from "./part-type";


@Component({
  selector: 'sg-part-type-grid',
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

              <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: DisplayedColumns;"></tr>
          </table>
      </div>
      <sg-crud router-link="/part-types/add"
               icon="memory"
               entity-name="типов комплектующих"
               is-compact="false"></sg-crud>`
})
export class PartTypeGridComponent extends EntityGridBase<PartType, PartTypeService>{

  constructor(service : PartTypeService) {
    super(service, ['id']);
  }

}
