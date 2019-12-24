import {Component} from '@angular/core';
import {EditorBase, PackEditorBase} from "./editor-base";
import {ActivatedRoute, Router} from "@angular/router";
import {PartExtension, PartState} from "../entities/part";
import {PartService} from "../services/part.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-part-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              комплектующего {{!isNew ? '№' + this.entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <sg-part-type-search [(ngModel)]="entity.PartType"
                                       hint="Тип комплектующего" required></sg-part-type-search>

                  <mat-checkbox [(ngModel)]="isInstalled">Установлено в компьютер</mat-checkbox>
                  <mat-checkbox [(ngModel)]="entity.IsValid" *ngIf="isPackAdd || !isInstalled">В рабочем состоянии</mat-checkbox>
                  
                  <sg-subsidiary-search [(ngModel)]="entity.Subsidiary"
                                        *ngIf="isPackAdd || !isInstalled" hint="Филиал"></sg-subsidiary-search>
                  
                  <sg-computer-search [(ngModel)]="entity.Computer"
                                      *ngIf="!isPackAdd && isInstalled" hint="Компьютер"></sg-computer-search>

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
                                [(ngModel)]="this.entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class PartEditorComponent extends PackEditorBase<PartExtension, PartService> {

  partStates = [
    PartState.InComputer,
    PartState.InStore,
    PartState.Broken
  ];

  isInstalled : boolean;

  constructor(private service: PartService, route: ActivatedRoute,
              router: Router, dialog: MatDialog) {
    super(service, route, router, dialog, new PartExtension(), "parts");
  }

  protected onEntityGot() {
    this.isInstalled = !!this.entity.Computer;
    console.log(this.isInstalled);
  }
}
