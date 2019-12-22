import {Component} from '@angular/core';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {SoftwareCategory, SoftwareType} from '../entities/software-type';
import {SoftwareTypeService} from '../services/software-type.service';
import {SoftwareTypeCardComponent} from '../cards/software-type-card.component';
import {CardService} from '../cards/card.service';
import {VisibilitiesService} from '../login/visibilities.service';

class SoftwareTypeFilter {
  SoftwareCountLowBound: number;
  SoftwareCountHighBound: number;

  Category: SoftwareCategory;
}

@Component({
  selector: 'sg-software-type-grid',
  template: `

      <div class="sg-table-container">
          <table mat-table matSort matSortActive="id" [dataSource]="this.entities"
                 [class.sg-table-compact]="isCompact" class="sg-table"
                 (matSortChange)="changeSort($event.direction, $event.active)">
              <ng-container matColumnDef="select">
                  <th mat-header-cell *matHeaderCellDef>
                      <mat-checkbox (change)="$event ? masterToggle() : null"
                                    [checked]="selection.hasValue() && isAllSelected()"
                                    [indeterminate]="selection.hasValue() && !isAllSelected()">
                      </mat-checkbox>
                  </th>
                  <td mat-cell class="sg-table-checkbox" *matCellDef="let row">
                      <mat-checkbox (click)="$event.stopPropagation()"
                                    (change)="$event ? selection.toggle(row) : null"
                                    [checked]="selection.isSelected(row)">
                      </mat-checkbox>
                  </td>
              </ng-container>

              <ng-container matColumnDef="id">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>№</th>
                  <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="typename">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Название</th>
                  <td mat-cell *matCellDef="let element"> {{element.Typename}} </td>
              </ng-container>

              <ng-container matColumnDef="category">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Категория</th>
                  <td mat-cell *matCellDef="let element"> {{element.Category | softwareCategory}}
                  </td>
              </ng-container>

              <ng-container matColumnDef="software_count">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>ПО</th>
                  <td mat-cell *matCellDef="let element"> {{element.SoftwareCount}} </td>
              </ng-container>

              <ng-container matColumnDef="info" stickyEnd>
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let element"
                      [class.sg-table-action-button-container-compact]="isCompact"
                      class="sg-table-action-button-container">
                      <button mat-icon-button
                              *ngIf="!isCompact && (visibilities.LeadDirectorsAndAdmins | async)"
                              (click)="remove(element)">
                          <mat-icon>delete</mat-icon>
                      </button>
                      <button mat-icon-button 
                              *ngIf="!isCompact && (visibilities.LeadDirectorsAndAdmins | async)"
                              [routerLink]="'/software-types/edit/' + element.Id">
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
          <div class="sg-search-drawer mat-elevation-z4" [class.sg-search-drawer-active]="filterState">
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
      </div>

      <sg-grid-bottom-bar router-link="/software-types/add"
                          icon="developer_board"
                          [count]="this.count"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="типов ПО"
                          (search)="searchString = $event"
                          (toggleFilters)="filterState = $event"
                          [isCompact]="this.isCompact"></sg-grid-bottom-bar>`,
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

  constructor(software: SoftwareTypeService,
              public visibilities: VisibilitiesService,
              private dialogref: MatDialog,
              cardService: CardService) {
    super(software, dialogref, ['select', 'id', 'typename',
        'category', 'software_count', 'info'],
      cardService,
      SoftwareTypeCardComponent);
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
