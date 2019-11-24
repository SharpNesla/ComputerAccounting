import {Component, OnInit} from '@angular/core';
import {EditorBase} from "../utils/editor-base";
import {ActivatedRoute} from "@angular/router";
import {SoftwareType} from "./software-type";
import {SoftwareTypeService} from "./software-type.service";

@Component({
  selector: 'sg-software-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/software">
          <header><mat-icon id="sg-editor-icon">developer_board</mat-icon> {{isNew ? 'Добавление' : 'Изменение'}} 
              типа ПО {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input type="number" step=0.01 min="0.01"  matInput required
                             placeholder="Цена">
                  </mat-form-field>
                  <mat-form-field>
                      <input type="number"
                             step=1 matInput required
                             placeholder="Количество возможных применений">
                  </mat-form-field>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline" class="flex-spacer">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput placeholder="Комментарий"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class SoftwareTypeEditorComponent extends EditorBase<SoftwareType, SoftwareTypeService> {


  constructor(private service: SoftwareTypeService, route: ActivatedRoute) {
    super(service, route, new SoftwareType());
  }

}
