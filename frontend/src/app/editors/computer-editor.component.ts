import {Component} from '@angular/core';
import {ComputerService} from '../services/computer.service';
import {ComputerExtension, ComputerType} from '../entities/computer';
import {EditorBase} from './editor-base';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeExtension, Roles} from '../entities/employee';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {VisibilitiesService} from '../login/visibilities.service';
import {first, flatMap} from 'rxjs/operators';
import {AuthService} from '../login/auth.service';
import {CardService} from '../cards/card.service';
import {EmployeeCardComponent} from '../cards/employee-card.component';
import {SubsidiaryService} from '../services/subsidiary.service';
import {Subsidiary} from '../entities/subsidiary';
import {of} from 'rxjs';

@Component({
  selector: 'sg-computer-editor',
  template: `
      <sg-dialog-layout (accept)="applyChanges()" (deny)="discardChanges()">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              {{isNew ? 'Добавление' : 'Изменение'}}
              компьютера {{!isNew ? '№' + this.entity.Id : ''}}</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab label="Основная информация">
                  <div id="sg-editor-card-container">
                      <mat-card id="left-section">
                          <h2 class="mat-title">Общая информация</h2>
                          <mat-form-field>
                              <input matInput placeholder="Имя компьютера"
                                     [(ngModel)]="this.entity.Name" required>
                          </mat-form-field>
                          <mat-form-field>
                              <input matInput placeholder="Инвентарный номер"
                                     [(ngModel)]="this.entity.InventoryId" required>
                          </mat-form-field>
                          <sg-subsidiary-search [(ngModel)]="entity.Subsidiary" required
                                                *ngIf="!(this.visibilities.BranchDirectorsAndAdmins | async)"
                                                hint="Филиал"></sg-subsidiary-search>
                          <sg-room-search [disabled]="!entity.Subsidiary"
                                          [filterDefinition]="filter"
                                          [(ngModel)]="entity.Room" hint="Помещение" required></sg-room-search>
                          <sg-employee-search [disabled]="!entity.Subsidiary"
                                              [filterDefinition]="filter" required
                                              [(ngModel)]="entity.Responsible" hint="Ответственное лицо">
                          </sg-employee-search>

                          <mat-form-field>
                              <mat-select [(ngModel)]="entity.Type" placeholder="Категория" required>
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
                              <textarea matInput cdkTextareaAutosize="false"
                                        placeholder="Комментарий"
                                        [(ngModel)]="this.entity.Comment"></textarea>
                          </mat-form-field>
                      </mat-card>
                  </div>
              </mat-tab>
              <mat-tab label="Пользователи">
                  <mat-card id="sg-editor-card-container" class="sg-many-many-card">
                      <table mat-table [dataSource]="this.entity.Users"
                             [class.sg-table-compact]="true" class="sg-table">
                          <ng-container matColumnDef="remove_button">
                              <th mat-header-cell *matHeaderCellDef></th>
                              <td mat-cell *matCellDef="let element">
                                  <button mat-icon-button (click)="removeUser(element)">
                                      <mat-icon>remove</mat-icon>
                                  </button>
                              </td>
                          </ng-container>

                          <ng-container matColumnDef="id">
                              <th mat-header-cell *matHeaderCellDef>№</th>
                              <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
                          </ng-container>

                          <!-- Name Column -->
                          <ng-container matColumnDef="name">
                              <th mat-header-cell *matHeaderCellDef>Имя</th>
                              <td mat-cell *matCellDef="let element"> {{element.Name}} </td>
                          </ng-container>

                          <ng-container matColumnDef="surname">
                              <th mat-header-cell *matHeaderCellDef>Фамилия</th>
                              <td mat-cell *matCellDef="let element"> {{element.Surname}}
                              </td>
                          </ng-container>

                          <ng-container matColumnDef="role">
                              <th mat-header-cell *matHeaderCellDef>Должность</th>
                              <td mat-cell *matCellDef="let element"> {{element.Role | role}}
                              </td>
                          </ng-container>

                          <ng-container matColumnDef="info" stickyEnd>
                              <th mat-header-cell *matHeaderCellDef></th>
                              <td mat-cell *matCellDef="let element"
                                  class="sg-table-action-button-container">
                                  <button mat-icon-button
                                          (click)="showInfoCard(element)">
                                      <mat-icon class="sg-table-info-button">error_outline</mat-icon>
                                  </button>
                              </td>
                          </ng-container>

                          <tr mat-header-row *matHeaderRowDef="UserDisplayedColumns"></tr>
                          <tr mat-row *matRowDef="let row; columns: UserDisplayedColumns;"></tr>
                      </table>
                      <div class="sg-many-many-card-searchbar">
                          <sg-employee-search [(ngModel)]="addingUser"
                                              hint="Привязать пользователя"></sg-employee-search>
                          <button mat-icon-button (click)="addUser()">
                              <mat-icon>add</mat-icon>
                          </button>
                      </div>
                  </mat-card>
              </mat-tab>

              <!--<mat-tab label="Комплектующие">

              </mat-tab>
              <mat-tab label="Программы и лицензии">

              </mat-tab>-->
          </mat-tab-group>
      </sg-dialog-layout>`,
  styleUrls: ['../utils/editors-styles.scss']
})
export class ComputerEditorComponent extends EditorBase<ComputerExtension, ComputerService> {
  types = [
    ComputerType.PC,
    ComputerType.Server,
    ComputerType.Laptop,
    ComputerType.Tablet,
    ComputerType.NetBook,
    ComputerType.NetTop,
    ComputerType.SmartPhone,
    ComputerType.Other
  ];

  get filter(){
    if (this.entity.Subsidiary){
      return {SubsidiaryId: this.entity.Subsidiary.Id};
    }else {
      return undefined;
    }
  }

  UserDisplayedColumns = ['remove_button', 'id',
    'name', 'surname', 'role', 'info'];
  addingUser: EmployeeExtension;

  constructor(private service: ComputerService, route: ActivatedRoute,
              private auth: AuthService, private cardService: CardService,
              private subsidiaryService: SubsidiaryService,
              public visibilities: VisibilitiesService,
              router: Router, private snackBar: MatSnackBar, dialog: MatDialog) {
    super(service, route, dialog, new ComputerExtension(), router, 'computers');
  }

  ngOnInit() {
    super.ngOnInit();
    this.auth.CurrentEmployee
      .pipe(flatMap(x => {
        if (!!x && (x.Role == Roles.BranchAdmin || x.Role == Roles.BranchDirector)) {
          return this.subsidiaryService.getById(x.SubsidiaryId);
        } else {
          return of(null);
        }
      }))
      .subscribe(x => {
        if(this.isNew){
          console.log(x);
          this.entity.Subsidiary = x;
        }
      });
  }

  addUser() {
    if (!this.addingUser) {
      this.snackBar.open('Не выбран работник для привязки', '', {
        duration: 2000,
      });
      return;
    }
    if (this.entity.Users.find(x => x.Id == this.addingUser.Id)) {
      this.snackBar.open('Работник уже является пользователем', '', {
        duration: 2000,
      });
      return;
    } else {
      this.entity.Users.push(this.addingUser);
      //Cause change detection to update table datasource
      this.entity.Users = [...this.entity.Users].sort(x => x.Id);
    }
  }

  removeUser(user: EmployeeExtension) {
    const index = this.entity.Users.findIndex(x => x.Id == user.Id);
    this.entity.Users.splice(index, 1);
    this.entity.Users = [...this.entity.Users];
  }

  showInfoCard(element: EmployeeExtension) {
    this.cardService.showInfoCard(element, EmployeeCardComponent);
  }
}
