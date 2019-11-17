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
export class SubsidiaryEditorComponent extends EditorBase<Subsidiary, SubsidiaryService> {

  constructor(private service: SubsidiaryService) {
    super(service, new Subsidiary());
  }
}
