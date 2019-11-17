import {Component, OnInit} from '@angular/core';
import {ComputerService} from "./computer.service";
import {Computer} from "./computer";
import {EditorBase} from "../utils/editor-base";
import {Location} from "@angular/common";

@Component({
  selector: 'sg-computer-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/computers">
          <header>Добавление компьютера</header>
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
export class ComputerEditorComponent extends EditorBase<Computer, ComputerService> {

  constructor(private service: ComputerService) {
    super(service, new Computer());
  }
}
