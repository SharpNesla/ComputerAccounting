import {Component, OnInit} from '@angular/core';
import {SoftwareService} from "../services/software.service";
import {Software} from "../entities/software";
import {EditorBase, PackEditorBase} from "./editor-base";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-software-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()" end-link="/software">
          <header>
              <mat-icon id="sg-editor-icon">developer_board</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              ПО {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <sg-software-type-search hint="Тип ПО" [(ngModel)]="Entity.SoftwareType">
                  </sg-software-type-search>
                  <sg-computer-search *ngIf="!isPackAdd" hint="Компьютер" [(ngModel)]="Entity.Computer">
                  </sg-computer-search>
                  <sg-license-search *ngIf="!isPackAdd" hint="Лицензия" [applicableType]="Entity.SoftwareType"
                                     mode="applicable" [(ngModel)]="Entity.License">
                  </sg-license-search>
                  <mat-checkbox *ngIf="isNew" [(ngModel)]="isPackAdd">Добавить несколько экземпляров</mat-checkbox>
                  <mat-form-field *ngIf="isPackAdd && isNew">
                      <input type="number" step="1" min="1" matInput required
                             [(ngModel)]="this.packCount" placeholder="Количество">
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
export class SoftwareEditorComponent extends PackEditorBase<Software, SoftwareService> {
  constructor(private service: SoftwareService, route: ActivatedRoute,
              router: Router, dialog: MatDialog) {
    super(service, route, router, dialog, new Software(), "/software");
  }
}
