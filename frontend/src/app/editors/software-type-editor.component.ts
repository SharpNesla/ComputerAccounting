import {Component, OnInit} from '@angular/core';
import {EditorBase} from "./editor-base";
import {ActivatedRoute, Router} from "@angular/router";
import {SoftwareCategory, SoftwareType} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";
import {Software} from "../entities/software";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'sg-software-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()" end-link="/software">
          <header>
              <mat-icon id="sg-editor-icon">developer_board</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              типа ПО {{!isNew ? '№' + this.Entity.Id : ''}}</header>

          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab label="Основная информация">
                  <div id="sg-editor-card-container">
                      <mat-card id="left-section">
                          <h2 class="mat-title">Общая информация</h2>

                          <mat-form-field>
                              <input matInput placeholder="Марка и модель"
                                     [(ngModel)]="this.Entity.Typename">
                          </mat-form-field>

                          <mat-form-field>
                              <mat-select [(ngModel)]="Entity.Category" placeholder="Категория">
                                  <mat-option *ngFor="let elem of softwareCategories" [value]="elem">
                                      {{elem | softwareCategory}}
                                  </mat-option>
                              </mat-select>
                          </mat-form-field>
                      </mat-card>

                      <mat-card id="right-section">
                          <h2 class="mat-title">Комментарий</h2>
                          <mat-form-field appearance="outline" class="flex-spacer">
                              <mat-label>Комментарий</mat-label>
                              <textarea matInput cdkTextareaAutosize="false" placeholder="Комментарий"
                                        [(ngModel)]="this.Entity.Comment"></textarea>
                          </mat-form-field>
                      </mat-card>
                  </div>
              </mat-tab>
              <mat-tab label="Зависимости">
                  <mat-card id="sg-editor-card-container" class="sg-many-many-card">
                      <table mat-table [dataSource]="this.Entity.Dependencies"
                             [class.sg-table-compact]="true" class="sg-table">
                          <ng-container matColumnDef="remove_button">
                              <th mat-header-cell *matHeaderCellDef></th>
                              <td mat-cell *matCellDef="let element">
                                  <button mat-icon-button (click)="removeDependency(element)">
                                      <mat-icon>remove</mat-icon>
                                  </button>
                              </td>
                          </ng-container>

                          <ng-container matColumnDef="id">
                              <th mat-header-cell *matHeaderCellDef>№</th>
                              <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
                          </ng-container>

                          <!-- Name Column -->
                          <ng-container matColumnDef="typename">
                              <th mat-header-cell *matHeaderCellDef>Название</th>
                              <td mat-cell *matCellDef="let element"> {{element.Typename}} </td>
                          </ng-container>

                          <ng-container matColumnDef="category">
                              <th mat-header-cell *matHeaderCellDef>Категория</th>
                              <td mat-cell *matCellDef="let element"> {{element.Category | softwareCategory}}
                              </td>
                          </ng-container>

                          <ng-container matColumnDef="software_count">
                              <th mat-header-cell *matHeaderCellDef>ПО</th>
                              <td mat-cell *matCellDef="let element"> {{element.SoftwareCount}} </td>
                          </ng-container>

                          <ng-container matColumnDef="info" stickyEnd>
                              <th mat-header-cell *matHeaderCellDef></th>
                              <td mat-cell *matCellDef="let element"
                                  class="sg-table-action-button-container">
                                  <button mat-icon-button
                                          (click)="showInfoCard(element)">
                                      <mat-icon class="sg-table-info-button">error_outline</mat-icon>
                                  </button>
                              </td>
                          </ng-container>


                          <tr mat-header-row *matHeaderRowDef="dependenciesDisplayedColumns"></tr>
                          <tr mat-row *matRowDef="let row; columns: dependenciesDisplayedColumns;"></tr>
                      </table>

                      <div class="sg-many-many-card-searchbar">
                          <sg-software-type-search [(ngModel)]="addingDependency"
                                                   hint="Привязываемая зависимость"></sg-software-type-search>
                          <button mat-icon-button (click)="addDependency()">
                              <mat-icon>add</mat-icon>
                          </button>
                      </div>
                  </mat-card>
              </mat-tab>
          </mat-tab-group>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class SoftwareTypeEditorComponent extends EditorBase<SoftwareType, SoftwareTypeService> {
  softwareCategories = [
    SoftwareCategory.Program,
    SoftwareCategory.Driver,
    SoftwareCategory.OS,
    SoftwareCategory.Other
  ];

  dependenciesDisplayedColumns = ['remove_button', 'id', 'typename',
    'category', 'software_count', 'info'];
  addingDependency: any;

  constructor(private service: SoftwareTypeService, route: ActivatedRoute, router : Router,
              private snackBar: MatSnackBar, dialog: MatDialog) {
    super(service, route, dialog, new SoftwareType(), router, "software");
  }


  removeDependency(element: SoftwareType) {
    const index = this.Entity.Dependencies.findIndex(x => x.Id == element.Id);
    this.Entity.Dependencies.splice(index, 1);
    this.Entity.Dependencies = [...this.Entity.Dependencies];
  }

  showInfoCard(element: any) {

  }

  addDependency() {
    if (!this.addingDependency) {
      this.snackBar.open("Не выбран работник для привязки", '', {
        duration: 2000,
      });
      return;
    }
    if (this.addingDependency.Id == this.Entity.Id) {
      this.snackBar.open("ПО не может быть зависимо от самого себя", '', {
        duration: 2000,
      });
      return;
    }
    if (this.Entity.Dependencies.find(x => x.Id == this.addingDependency.Id)) {
      this.snackBar.open("ПО уже имеет данную зависимость", '', {
        duration: 2000,
      });
    } else {
      this.Entity.Dependencies.push(this.addingDependency);
      //Cause change detection to update table datasource
      this.Entity.Dependencies = [...this.Entity.Dependencies].sort(x => x.Id);
    }
  }
}
