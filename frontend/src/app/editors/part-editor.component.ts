import {Component, OnInit} from '@angular/core';
import {EditorBase} from "../utils/editor-base";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Part} from "../entities/part";
import {PartService} from "../services/part.service";

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
                  <sg-part-type-search [(selected)]="Entity.PartType"
                                       hint="Тип комплектующего">
                  </sg-part-type-search>
                  <sg-subsidiary-search [(selected)]="Entity.Subsidiary"
                          hint="Филиал"></sg-subsidiary-search>
                  <sg-computer-search [(selected)]="Entity.Computer"
                                      hint="Компьютер"></sg-computer-search>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput placeholder="Комментарий"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class PartEditorComponent extends EditorBase<Part, PartService> {


  constructor(private service: PartService, route: ActivatedRoute) {
    super(service, route, new Part());
  }

}