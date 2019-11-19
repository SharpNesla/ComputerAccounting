import {Component, OnInit} from '@angular/core';
import {SoftwareService} from "./software.service";
import {Software} from "./software";
import {EditorBase} from "../utils/editor-base";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sg-software-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/software">
          <header><mat-icon id="sg-editor-icon">developer_board</mat-icon> {{isNew ? 'Добавление' : 'Изменение'}} 
              ПО {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class SoftwareEditorComponent extends EditorBase<Software, SoftwareService> {


  constructor(private service: SoftwareService, route: ActivatedRoute) {
    super(service, route, new Software());
  }

}
