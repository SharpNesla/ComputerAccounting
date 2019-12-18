import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subsidiary} from "../entities/subsidiary";
import {SubsidiaryService} from "../services/subsidiary.service";

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Филиал №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p class="mat-body">Название: {{entity?.Name}}</p>
                  <p class="mat-body">Адрес: {{entity?.Address}}</p>

                  <p class="mat-body">Директор филиала:
                      {{entity?.Director.Id}}
                      {{entity?.Director.Name}}
                      {{entity?.Director.Surname}}
                  </p>

                  <p class="mat-body">Комментарий:<br> {{entity?.Comment}}</p>

              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Помещения</h2>
                  <sg-room-grid [customDataSource]="rooms"
                                isCompact="true"></sg-room-grid>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class SubsidiaryCardComponent extends CardBase<Subsidiary, SubsidiaryService> {

  constructor(
    public dialogRef: MatDialogRef<SubsidiaryCardComponent>,
    service: SubsidiaryService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


  get rooms(){
    if (this.entity && this.entity.Rooms){
        return this.entity.Rooms;
    }
    return [];
  }


}
