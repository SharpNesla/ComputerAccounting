import {Component} from "@angular/core";
import {EditorBase} from "./editor-base";
import {SubsidiaryService} from "../services/subsidiary.service";
import {Subsidiary} from "../entities/subsidiary";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sg-subsidiary-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()"
                        end-link="/subsidiaries"
                        [acceptDisabled]="name.checkValidity() || address.checkValidity()">
          <header><mat-icon id="sg-editor-icon">storefront</mat-icon> {{isNew ? 'Добавление' : 'Изменение'}}
              филиала {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input matInput placeholder="Название" #name
                             [(ngModel)]="this.Entity.Name" required>
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput placeholder="Адрес" #address
                             [(ngModel)]="this.Entity.Address" required>
                  </mat-form-field>
                  <sg-employee-search hint="Директор филиала" #director
                          [(selected)]="Entity.Director"></sg-employee-search>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <input matInput placeholder="Комментарий">
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class SubsidiaryEditorComponent extends EditorBase<Subsidiary, SubsidiaryService> {

  constructor(private service: SubsidiaryService, route: ActivatedRoute, dialog : MatDialog) {
    super(service, route, dialog, new Subsidiary());
  }
}
