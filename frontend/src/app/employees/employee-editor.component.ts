import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "./employees.service";
import {Employee} from "./employee";
import {EditorBase} from "../utils/editor-base";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sg-computer-editor',
  template: `
      <sg-dialog-layout (Accept)="applyChanges()" (Deny)="discardChanges()" end-link="/licenses">
          <header>
              <mat-icon id="sg-editor-icon">shop</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              лицензии {{!isNew ? '№' + this.Entity.Id : ''}}</header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  
                  <sg-software-type-search hint="Тип программного обеспечния"
                                           searchHint="Иипа ПО"></sg-software-type-search>

                  <sg-software-search hint="Программное обеспечение"
                                           searchHint="Программное обеспечение">
                      
                  </sg-software-search>

                  <mat-form-field>
                      <input matInput [matDatepicker]="picker" placeholder="Дата приобретения">
                      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                      <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>
                  
                  <mat-checkbox>Срок по дате истечения</mat-checkbox>
                  
                  <mat-form-field>
                      <input matInput [matDatepicker]="picker2" placeholder="Дата истечения">
                      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                      <mat-datepicker #picker2></mat-datepicker>
                  </mat-form-field>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <mat-form-field appearance="outline">
                      <mat-label>Текст лицензии</mat-label>
                      <textarea matInput placeholder="Текст лицензии"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="flex-spacer">
                      <mat-label>Комментарий</mat-label>
                      <textarea matInput placeholder="Комментарий"
                                [(ngModel)]="this.Entity.Comment"></textarea>
                  </mat-form-field>
              </mat-card>
          </div>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class EmployeeEditorComponent extends EditorBase<Employee, EmployeesService> {
  constructor(private service: EmployeesService, route: ActivatedRoute) {
    super(service, route, new Employee());
  }
}
