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
                  <mat-form-field appearance="outline">
                      <mat-label>Комментарий</mat-label>
                      <input matInput placeholder="Комментарий">
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styles: [
      `:host {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
      }

      #left-section > * {
          width: 100%;
      }

      #right-section > * {
          width: 100%;
      }

      #left-section {

          width: 300px;
          margin-right: 2rem;
      }

      #right-section {
          flex-grow: 1;
      }

      #sg-editor-card-container {
          flex-grow: 1;
          display: flex;
          margin: 1.5em 1.5em 0 1.5em;
      }`]
})
export class ComputerEditorComponent extends EditorBase<Computer, ComputerService> {

  constructor(private service: ComputerService) {
    super(service, new Computer());
  }
}
