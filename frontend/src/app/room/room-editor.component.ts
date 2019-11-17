import {Component} from "@angular/core";
import {EditorBase} from "../utils/editor-base";
import {RoomService} from "./room.service";
import {Room} from "./room";

@Component({
  selector: 'sg-room-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/subsidiaries">
          <header>Добавление помещения</header>
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
export class RoomEditorComponent extends EditorBase<Room, RoomService> {

  constructor(private service: RoomService) {
    super(service, new Room());
  }
}
