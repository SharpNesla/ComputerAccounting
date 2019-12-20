import {Component, OnInit} from '@angular/core';
import {LicenseService} from "../services/license.service";
import {License} from "../entities/license";
import {EditorBase, PackEditorBase} from "./editor-base";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-computer-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()">
          <header>
              <mat-icon id="sg-editor-icon">shop</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              лицензии {{!isNew ? '№' + this.entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input type="number" step=0.01 min="0.01" matInput required
                             [(ngModel)]="entity.Cost" placeholder="Цена">
                  </mat-form-field>
                  <mat-form-field>
                      <input [(ngModel)]="entity.MaxApplyCount" type="number"
                             step=1 matInput required
                             placeholder="Количество возможных применений">
                  </mat-form-field>

                  <sg-software-type-search hint="Тип программного обеспечния" [(ngModel)]="entity.SoftwareType"
                                           searchHint="Иипа ПО"></sg-software-type-search>

                  <mat-form-field>
                      <input matInput [matDatepicker]="picker" [(ngModel)]="entity.PurchasedAt"
                             placeholder="Дата приобретения">
                      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                      <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput [matDatepicker]="picker2" [(ngModel)]="entity.ExpiredAt"
                             placeholder="Дата истечения">
                      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                      <mat-datepicker #picker2></mat-datepicker>
                  </mat-form-field>

                  <mat-checkbox *ngIf="isNew" [(ngModel)]="isPackAdd">Добавить несколько экземпляров</mat-checkbox>
                  <mat-form-field *ngIf="isPackAdd && isNew">
                      <input type="number" step="1" min="1" matInput required
                             [(ngModel)]="this.packCount" placeholder="Количество">
                  </mat-form-field>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Текст лицензии</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Текст лицензии"
                                [(ngModel)]="this.entity.Eula"></textarea>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="flex-spacer">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Комментарий"
                                [(ngModel)]="this.entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class LicenseEditorComponent extends PackEditorBase<License, LicenseService> {
  constructor(private service: LicenseService, route: ActivatedRoute,
              router: Router, dialog: MatDialog) {
    super(service, route, router, dialog, new License(), "licenses");
  }
}
