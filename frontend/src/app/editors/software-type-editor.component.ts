import {Component, OnInit} from '@angular/core';
import {EditorBase} from "../utils/editor-base";
import {ActivatedRoute} from "@angular/router";
import {SoftwareCategory, SoftwareType} from "../entities/software-type";
import {SoftwareTypeService} from "../services/software-type.service";

@Component({
  selector: 'sg-software-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/software">
          <header>
              <mat-icon id="sg-editor-icon">developer_board</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              типа ПО {{!isNew ? '№' + this.Entity.Id : ''}}</header>
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

  constructor(private service: SoftwareTypeService, route: ActivatedRoute) {
    super(service, route, new SoftwareType());
  }

}
