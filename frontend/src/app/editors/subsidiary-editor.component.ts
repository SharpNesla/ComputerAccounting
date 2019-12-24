import {Component} from "@angular/core";
import {EditorBase} from "./editor-base";
import {SubsidiaryService} from "../services/subsidiary.service";
import {SubsidiaryExtension} from "../entities/subsidiary";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Roles} from '../entities/employee';

@Component({
  selector: 'sg-subsidiary-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()">
          <header>
              <mat-icon id="sg-editor-icon">storefront</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              филиала {{!isNew ? '№' + this.entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input matInput placeholder="Название" #name
                             [(ngModel)]="this.entity.Name" required>
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput placeholder="Адрес" #address
                             [(ngModel)]="this.entity.Address" required>
                  </mat-form-field>
                  <sg-employee-search hint="Директор филиала" #director
                                      [filterDefinition]="branchDirectorFilter"
                                      [(ngModel)]="entity.Director"></sg-employee-search>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <input [(ngModel)]="entity.Comment" matInput placeholder="Комментарий">
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class SubsidiaryEditorComponent extends EditorBase<SubsidiaryExtension, SubsidiaryService> {
  branchDirectorFilter = {Role: Roles.BranchDirector};
  constructor(private service: SubsidiaryService, route: ActivatedRoute,
              dialog : MatDialog, router : Router,) {
    super(service, route, dialog, new SubsidiaryExtension(), router, "subsidiaries");
  }
}
