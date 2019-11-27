import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee";
import {EditorBase} from "../utils/editor-base";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sg-employee-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/licenses">
          <header>
              <mat-icon id="sg-editor-icon">shop</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              лицензии {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class EmployeeEditorComponent extends EditorBase<Employee, EmployeeService> {
  constructor(private service: EmployeeService, route: ActivatedRoute) {
    super(service, route, new Employee());
  }
}
