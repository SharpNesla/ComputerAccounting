import {Component, OnInit} from '@angular/core';
import {EditorBase} from "./editor-base";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Part} from "../entities/part";
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
                  <sg-part-type-search></sg-part-type-search>
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
export class PartEditorComponent extends EditorBase<Part, PartService> {


  constructor(private service: PartService, route: ActivatedRoute, dialog : MatDialog) {
    super(service, route, dialog, new Part());
  }

}
