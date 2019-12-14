import {Component} from '@angular/core';
import {EditorBase, PackEditorBase} from "./editor-base";
import {ActivatedRoute} from "@angular/router";
import {Part, PartState} from "../entities/part";
import {PartService} from "../services/part.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-part-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/parts">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              комплектующего {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <sg-part-type-search [(ngModel)]="Entity.PartType"
                          hint="Тип комплектующего"></sg-part-type-search>

                  <mat-form-field>
                      <mat-select [(ngModel)]="Entity.State" placeholder="Состояние">
                          <mat-option *ngFor="let elem of partStates" [value]="elem">
                              {{elem | partState}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>

                  <sg-subsidiary-search [(ngModel)]="Entity.Subsidiary"
                                        *ngIf="displaySubsidiary" hint="Филиал"></sg-subsidiary-search>
                  <sg-computer-search [(ngModel)]="Entity.Computer"
                                      *ngIf="displayComputer" hint="Компьютер"></sg-computer-search>
                  
                  <mat-checkbox *ngIf="isNew" [(ngModel)]="isPackAdd">Добавить несколько экземпляров</mat-checkbox>
                  <mat-form-field *ngIf="isPackAdd && isNew">
                      <input type="number" step="1" min="1" matInput required
                             [(ngModel)]="this.packCount" placeholder="Количество">
                  </mat-form-field>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Комментарий"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class PartEditorComponent extends PackEditorBase<Part, PartService> {
  partStates = [
    PartState.InComputer,
    PartState.InStore,
    PartState.Broken
  ];

  get displaySubsidiary() {
    return this.Entity.State == PartState.InStore || this.Entity.State == PartState.Broken;
  }

  get displayComputer() {
    return this.Entity.State == PartState.InComputer;
  }

  constructor(private service: PartService, route: ActivatedRoute, dialog: MatDialog) {
    super(service, route, dialog, new Part());
  }

}
