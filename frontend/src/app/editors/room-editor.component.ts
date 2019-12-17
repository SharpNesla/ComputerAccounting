import {Component} from "@angular/core";
import {EditorBase} from "./editor-base";
import {RoomService} from "../services/room.service";
import {Room} from "../entities/room";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sg-room-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()" end-link="/rooms">
          <header>
              <mat-icon id="sg-editor-icon">storefront</mat-icon>
              {{isNew ?
                  'Добавление' : 'Изменение'}}
              помещения {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input matInput placeholder="Номер помещения"
                             [(ngModel)]="this.Entity.Number">
                  </mat-form-field>
                  <sg-subsidiary-search [(ngModel)]="Entity.Subsidiary"
                                        hint="Филиал"></sg-subsidiary-search>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field class="sg-editor-comment" appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput cdkTextareaAutosize="false" placeholder="Комментарий"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class RoomEditorComponent extends EditorBase<Room, RoomService> {

  constructor(private service: RoomService, route: ActivatedRoute,
              router: Router, dialog: MatDialog) {
    super(service, route, dialog, new Room(), router, "rooms");
  }
}
