import {Component, OnInit} from '@angular/core';
import {EditorBase} from "./editor-base";
import {Part} from "../entities/part";
import {PartService} from "../services/part.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PartCategory, PartType} from "../entities/part-type";
import {PartTypeService} from "../services/part-type.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-part-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              типа комплектующего {{!isNew ? '№' + this.entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input matInput placeholder="Марка и модель"
                             [(ngModel)]="this.entity.Model">
                  </mat-form-field>
                  <mat-form-field>
                      <input type="number" step=0.01 min="0.01" matInput required
                             [(ngModel)]="entity.Cost" placeholder="Цена">
                  </mat-form-field>
                  <mat-form-field>
                      <mat-select [(ngModel)]="entity.Category" placeholder="Категория" required>
                          <mat-option *ngFor="let elem of partCategories" [value]="elem">
                              {{elem | partCategory}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Характеристики и комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Характеристики</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Характеристики"
                                [(ngModel)]="this.entity.Characteristics"></textarea>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Комментарий"
                                [(ngModel)]="this.entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class PartTypeEditorComponent extends EditorBase<PartType, PartTypeService> {

  partCategories = [
    PartCategory.CPU,
    PartCategory.GPU,
    PartCategory.RAM,
    PartCategory.SATADevice,
    PartCategory.PCIExtension,
    PartCategory.Motherboard,
    PartCategory.PowerSupply,
    PartCategory.Case,
    PartCategory.Mouse,
    PartCategory.KeyBoard,
    PartCategory.Monitor,
    PartCategory.Other
  ];

  constructor(private service: PartTypeService, route: ActivatedRoute,
              router: Router, dialog: MatDialog) {
    super(service, route, dialog, new PartType(), router, "part-types");
  }

}
