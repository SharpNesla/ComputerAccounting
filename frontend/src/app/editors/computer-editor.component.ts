import {Component, OnInit} from '@angular/core';
import {ComputerService} from "../services/computer.service";
import {Computer, ComputerType} from "../entities/computer";
import {EditorBase} from "../utils/editor-base";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sg-computer-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/computers">
          <header><mat-icon id="sg-editor-icon">desktop_mac</mat-icon> {{isNew ? 'Добавление' : 'Изменение'}} 
              компьютера {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <mat-form-field>
                      <input matInput placeholder="Имя компьютера"
                             [(ngModel)]="this.Entity.Name">
                  </mat-form-field>
                  <mat-form-field>
                      <input matInput placeholder="Инвентарный номер"
                             [(ngModel)]="this.Entity.InventoryId">
                  </mat-form-field>
                  <sg-subsidiary-search hint="Филиал помещения"></sg-subsidiary-search>
                  <sg-room-search [(selected)]="Entity.Room" hint="Помещение"></sg-room-search>
                  <sg-employee-search [(selected)]="Entity.Responsible" hint="Ответственное лицо">
                      
                  </sg-employee-search>

                  <mat-form-field>
                      <mat-select [(ngModel)]="Entity.Type" placeholder="Категория">
                          <mat-option *ngFor="let elem of types" [value]="elem">
                              {{elem | computerType}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
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
export class ComputerEditorComponent extends EditorBase<Computer, ComputerService> {
  types =[
    ComputerType.PC,
    ComputerType.Server,
    ComputerType.Laptop,
    ComputerType.Tablet,
    ComputerType.NetBook,
    ComputerType.NetTop,
    ComputerType.SmartPhone,
    ComputerType.Other
  ]

  constructor(private service: ComputerService, route: ActivatedRoute) {
    super(service, route, new Computer());
  }

}
