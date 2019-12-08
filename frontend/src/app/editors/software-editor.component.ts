import {Component, OnInit} from '@angular/core';
import {SoftwareService} from "../services/software.service";
import {Software} from "../entities/software";
import {EditorBase} from "./editor-base";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-software-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/software">
          <header>
              <mat-icon id="sg-editor-icon">developer_board</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              ПО {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <sg-software-type-search [(selected)]="Entity.SoftwareType">
                  </sg-software-type-search>
                  <sg-computer-search [(selected)]="Entity.Computer">
                  </sg-computer-search>
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
export class SoftwareEditorComponent extends EditorBase<Software, SoftwareService> {


  constructor(private service: SoftwareService, route: ActivatedRoute, dialog: MatDialog) {
    super(service, route, dialog, new Software());
  }

}
