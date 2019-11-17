import {Component} from "@angular/core";
import {EditorBase} from "../utils/editor-base";
import {Computer} from "../computers/computer";
import {ComputerService} from "../computers/computer.service";
import {SubsidiaryService} from "./subsidiary.service";
import {Subsidiary} from "./subsidiary";

@Component({
  selector: 'sg-subsidiary-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/subsidiaries">
          <header>Добавление филиала</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
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

  constructor(private service: SubsidiaryService) {
    super(service, new Subsidiary());
  }
}
