import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "../services/part-type.service";
import {EntityGridBase} from "./entity-grid-base";
import {PartType} from "../entities/part-type";
import {MatDialog} from "@angular/material/dialog";
import {PartTypeCardComponent} from "../cards/part-type-card.component";
import {CardService} from '../cards/card.service';
import {VisibilitiesService} from '../login/visibilities.service';


class PartTypeFilter {
  CostLowBound: number;
  CostHighBound: number;

  PartsCountLowBound: number;
  PartsCountHighBound: number;

  ByCategory: number;
}

@Component({
  selector: 'sg-part-type-grid',
  template: `

      <div class="sg-table-container">
          <table mat-table matSort matSortActive="id" [dataSource]="this.entities"
                 [class.sg-table-compact]="isCompact"
                 (matSortChange)="changeSort($event.direction, $event.active)" class="sg-table">
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
              <ng-container matColumnDef="model">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Модель</th>
                  <td mat-cell *matCellDef="let element"> {{element.Model}} </td>
              </ng-container>

              <ng-container matColumnDef="cost">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Стоимость</th>
                  <td mat-cell *matCellDef="let element"> {{element.Cost}}₽
                  </td>
              </ng-container>

              <ng-container matColumnDef="parts_count">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Комплектущих</th>
                  <td mat-cell *matCellDef="let element"> {{element.PartsCount}}шт
                  </td>
              </ng-container>

              <ng-container matColumnDef="category">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Категория</th>
                  <td mat-cell *matCellDef="let element"> {{element.Category | partCategory}}
                  </td>
              </ng-container>

              <ng-container matColumnDef="info" stickyEnd>
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let element"
                      [class.sg-table-action-button-container-compact]="isCompact"
                      class="sg-table-action-button-container">
                      <button mat-icon-button
                              [disabled]="!((visibilities)?.LeadDirectorsAndAdmins | async)"
                              *ngIf="!isCompact" (click)="remove(element)">
                          <mat-icon>delete</mat-icon>
                      </button>
                      <button mat-icon-button *ngIf="!isCompact"
                              [disabled]="!((visibilities)?.LeadDirectorsAndAdmins | async)"                              
                              [routerLink]="'/part-types/edit/' + element.Id">
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
                  <mat-checkbox [(ngModel)]="filterApplies.ByCost">По цене</mat-checkbox>
                  <mat-form-field>
                      <input [disabled]="!filterApplies.ByCost" matInput placeholder="Нижняя граница">
                  </mat-form-field>
                  <mat-form-field>
                      <input [disabled]="!filterApplies.ByCost" matInput placeholder="Верхняя граница">
                  </mat-form-field>
              </div>
              <div class="sg-search-drawer-ruleset">
                  <mat-checkbox [(ngModel)]="filterApplies.ByPartsCount">По колчеству комплектующих</mat-checkbox>
                  <mat-form-field>
                      <input [disabled]="!filterApplies.ByPartsCount" matInput placeholder="Нижняя граница">
                  </mat-form-field>
                  <mat-form-field>
                      <input [disabled]="!filterApplies.ByPartsCount" matInput placeholder="Верхняя граница">
                  </mat-form-field>
              </div>
          </div>
      </div>

      <sg-grid-bottom-bar router-link="/part-types/add"
                          icon="memory"
                          [count]="this.count"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="типов комплектующих"
                          (search)="searchString = $event"
                          [add-visibility]="(visibilities)?.LeadDirectorsAndAdmins | async"
                          (toggleFilters)="filterState = $event"
                          [isCompact]="this.isCompact"></sg-grid-bottom-bar>`
})
export class PartTypeGridComponent extends EntityGridBase<PartType, PartTypeService> {

  filterApplies = {
    ByCost: false,
    ByPartsCount: false,
    ByCategory: false
  };

  filter: PartTypeFilter = new PartTypeFilter();

  constructor(service: PartTypeService, dialog: MatDialog, cardService : CardService,
              public visibilities: VisibilitiesService) {
    super(service, dialog,
      ['select', 'id', 'model', 'cost', 'parts_count', 'category', 'info'],
      cardService,
      PartTypeCardComponent);
  }

  constructFilter(): object {
    const filter = new PartTypeFilter();
    if (this.filterApplies.ByCost) {
      filter.CostLowBound = this.filter.CostLowBound;
      filter.CostHighBound = this.filter.CostHighBound;
    }

    if (this.filterApplies.ByPartsCount) {
      filter.PartsCountLowBound = this.filter.PartsCountLowBound;
      filter.PartsCountHighBound = this.filter.PartsCountHighBound;
    }
    if (this.filterApplies.ByCategory) {
      filter.ByCategory = this.filter.ByCategory;
    }

    return filter;
  }
}
