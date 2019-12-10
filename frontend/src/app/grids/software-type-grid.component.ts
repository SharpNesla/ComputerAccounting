import {Component} from '@angular/core';
import {EntityGridBase} from "./entity-grid-base";
import {MatDialog} from "@angular/material/dialog";
import {SoftwareCategory, SoftwareType} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";
import {SoftwareTypeCardComponent} from "../cards/software-type-card.component";

class SoftwareTypeFilter {
  SoftwareCountLowBound: number;
  SoftwareCountHighBound: number;

  Category: SoftwareCategory;
}

@Component({
  selector: 'sg-software-type-grid',
  template: `
      <table mat-table [dataSource]="isCustomDataSource ? customDataSource : this.Entities"
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

          <!-- Name Column -->
          <ng-container matColumnDef="typename">
              <th mat-header-cell *matHeaderCellDef>Название</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Typename}} </td>
          </ng-container>

          <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Категория</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.Category | softwareCategory}}
              </td>
          </ng-container>

          <ng-container matColumnDef="software_count">
              <th mat-header-cell *matHeaderCellDef>ПО</th>
              <td mat-cell *matCellDef="let element"
                  (contextmenu)="onContextMenu($event, element)"> {{element.SoftwareCount}} </td>
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
              <button mat-menu-item [routerLink]="'/software-types/edit/' + item.Id">

                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">
                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>

      <div class="sg-search-drawer">
          <div class="sg-search-drawer-ruleset">
              <mat-checkbox [(ngModel)]="filterApplies.BySoftwareCount">По количеству ПО</mat-checkbox>
              <mat-form-field>
                  <input [(ngModel)]="filter.SoftwareCountLowBound"
                         [disabled]="!filterApplies.BySoftwareCount" matInput placeholder="Нижняя граница">
              </mat-form-field>
              <mat-form-field>
                  <input [(ngModel)]="filter.SoftwareCountHighBound"
                         [disabled]="!filterApplies.BySoftwareCount" matInput placeholder="Верхняя граница">
              </mat-form-field>
          </div>

          <div class="sg-search-drawer-ruleset">
              <mat-checkbox [(ngModel)]="filterApplies.ByCategory">По категории</mat-checkbox>
              <mat-form-field>
                  <mat-select [disabled]="!filterApplies.ByCategory"
                              [(ngModel)]="filter.Category" placeholder="Категория">
                      <mat-option *ngFor="let elem of softwareCategories" [value]="elem">
                          {{elem | softwareCategory}}
                      </mat-option>
                  </mat-select>
              </mat-form-field>
          </div>
      </div>

      <sg-crud router-link="/software-types/add"
               icon="developer_board"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="типов ПО"
               (Search)="SearchString = $event"
               [isCompact]="this.isCompact"></sg-crud>`,
})
export class SoftwareTypeGridComponent extends EntityGridBase<SoftwareType, SoftwareTypeService> {

  softwareCategories = [
    SoftwareCategory.Program,
    SoftwareCategory.Driver,
    SoftwareCategory.OS,
    SoftwareCategory.Other
  ];

  filterApplies = {
    BySoftwareCount: false,
    ByCategory: false
  };

  filter: SoftwareTypeFilter = new SoftwareTypeFilter();

  constructor(software: SoftwareTypeService, private dialogref: MatDialog) {
    super(software, dialogref, ['select', 'id', 'typename',
        'category', 'software_count', 'info'],
      SoftwareTypeCardComponent)
  }

  constructFilter(): object {
    const filter = new SoftwareTypeFilter();
    if (this.filterApplies.BySoftwareCount) {
      filter.SoftwareCountLowBound = this.filter.SoftwareCountLowBound;
      filter.SoftwareCountHighBound = this.filter.SoftwareCountHighBound;
    }

    if (this.filterApplies.ByCategory) {
      filter.Category = this.filter.Category;
    }

    return filter;
  }
}
