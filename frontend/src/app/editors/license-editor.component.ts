import {Component, OnInit} from '@angular/core';
import {LicensesService} from "../services/licenses.service";
import {License} from "../entities/license";
import {EditorBase} from "./editor-base";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-computer-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/licenses">
          <header>
              <mat-icon id="sg-editor-icon">shop</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              лицензии {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input type="number" step=0.01 min="0.01"  matInput required
                             [(ngModel)]="Entity.Cost" placeholder="Цена">
                  </mat-form-field>
                  <mat-form-field>
                      <input [(ngModel)]="Entity.MaxApplyCount" type="number"
                             step=1 matInput required
                             placeholder="Количество возможных применений">
                  </mat-form-field>
                  
                  <sg-software-type-search hint="Тип программного обеспечния"
                                           searchHint="Иипа ПО"></sg-software-type-search>

                  <sg-software-search hint="Программное обеспечение"
                                           searchHint="Программное обеспечение">
                      
                  </sg-software-search>

                  <mat-form-field>
                      <input matInput [matDatepicker]="picker" placeholder="Дата приобретения">
                      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                      <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>
                  
                  <mat-checkbox>Срок по дате истечения</mat-checkbox>
                  
                  <mat-form-field>
                      <input matInput [matDatepicker]="picker2" placeholder="Дата истечения">
                      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                      <mat-datepicker #picker2></mat-datepicker>
                  </mat-form-field>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Текст лицензии</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Текст лицензии"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
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
export class LicenseEditorComponent extends EditorBase<License, LicensesService> {
  constructor(private service: LicensesService, route: ActivatedRoute, dialog : MatDialog) {
    super(service, route, dialog, new License());
  }
}
