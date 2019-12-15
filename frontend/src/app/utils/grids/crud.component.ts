import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationService} from "../../navigation.service";
import {element} from "protractor";

@Component({
  selector: 'sg-crud',
  template: `
      <ng-template
              *ngIf="this.isCompact;then compactview; else fullview">
      </ng-template>
      <ng-template #fullview>
          <mat-toolbar id="search-toolbar" color="primary" class="mat-elevation-z4">
              <mat-icon>{{this.icon}}</mat-icon>
              <mat-card id="search-input">
                  <button mat-icon-button (click)="this.Search.emit(this.SearchString)">
                      <mat-icon>search</mat-icon>
                  </button>
                  <mat-form-field id="searchbar" class="searchbar-input" appearance="standard">
                      <input [(ngModel)]="SearchString" matInput placeholder="Поиск {{EntityName}}"
                        (keydown.enter)="this.Search.emit(this.SearchString)">
                  </mat-form-field>
              </mat-card>
              <mat-card id="paginator">
                  <div>
                      {{EntityNameCapitalized}} на странице:
                      <mat-form-field id="paginator-input" class="searchbar-input">
                          <mat-select [(value)]="ElementsPerPage">
                              <mat-option *ngFor="let amount of values" [value]="amount">
                                  {{amount}}
                              </mat-option>
                          </mat-select>
                      </mat-form-field>
                      {{this.CurrentPage}} из {{MaxPages}}
                      <button mat-icon-button class="sg-paginator-button"
                              (click)="MovePrevious()" [disabled]="!this.IsBackEnabled">
                          <mat-icon>arrow_back</mat-icon>
                      </button>
                      <button mat-icon-button class="sg-paginator-button" (click)="MoveNext()"
                              [disabled]="!this.IsNextEnabled">
                          <mat-icon>arrow_forward</mat-icon>
                      </button>
                  </div>
              </mat-card>
              <button mat-icon-button (click)="toggleFiltersMethod()">
                  <mat-icon>{{this.filterState ? "arrow_downward" : "filter_list"}}</mat-icon>
              </button>
              <button id="button-add" routerLink="{{this.link}}" mat-fab>
                  <mat-icon>add</mat-icon>
              </button>
          </mat-toolbar>
      </ng-template>
      <ng-template #compactview>
          <div id="search-toolbar">
              <div id="paginator">
                  <div>
                      {{EntityNameCapitalized}} на странице:
                      <mat-form-field id="paginator-input" class="searchbar-input">
                          <mat-select [(value)]="ElementsPerPage">
                              <mat-option *ngFor="let amount of values" [value]="amount">
                                  {{amount}}
                              </mat-option>
                          </mat-select>
                      </mat-form-field>
                      {{this.CurrentPage}} из {{MaxPages}}
                      <button mat-icon-button class="sg-paginator-button"
                              (click)="MovePrevious()" [disabled]="!this.IsBackEnabled">
                          <mat-icon>arrow_back</mat-icon>
                      </button>
                      <button mat-icon-button class="sg-paginator-button" (click)="MoveNext()"
                              [disabled]="!this.IsNextEnabled">
                          <mat-icon>arrow_forward</mat-icon>
                      </button>
                  </div>
              </div>
          </div>
      </ng-template>

  `,
  styles: [
      `#button-add {
          position: relative;
          margin-left: 24px;
          top: -32px;
          z-index: 2;
      }

      #search-toolbar {
          display: flex;
          font-size: 1em;
      }

      #search-input {
          flex-grow: 1;
          margin-left: 16px;
          margin-right: 12px;
          padding: 0;
      }

      .sg-paginator-button {
          position: relative;
          top: -1px;
          margin-left: 2px;
          margin-right: 2px;
      }

      #paginator {
          padding: 5px 4px 0 16px;
      }

      #searchbar {

          width: calc(100% - 56px);
      }

      #paginator-input {
          width: 50px;
      }

      .searchbar-input {
          flex-grow: 1;
          flex-direction: column;
          margin-top: -16px;
          margin-bottom: -11px !important;
      }
    `
  ]
})
export class CrudComponent implements OnInit {
  @Input('entity-name') EntityName: string;
  @Input() isCompact: boolean = false;
  @Input('router-link') link: string;

  @Input('count') set Count(value) {
    this.count = value;
    this.CheckButtons();
  }

  count: number;
  @Input() icon: string;
  @Output() Search: EventEmitter<string> = new EventEmitter<string>();
  @Output() Paginate: EventEmitter<{ offset: number, limit: number }>
    = new EventEmitter<{ offset: number, limit: number }>();
  @Output() toggleFilters : EventEmitter<boolean> = new EventEmitter<boolean>();

  public filterState : boolean = false;

  public values = [5, 10, 20, 100];

  public get EntityNameCapitalized() {

    return this.EntityName.charAt(0).toUpperCase() + this.EntityName.slice(1);
  }

  IsNextEnabled: boolean = false;
  IsBackEnabled: boolean = false;
  SearchString: string;
  private currentPage: number;
  public elementsPerPage: number = 10;

  public set CurrentPage(value) {
    this.currentPage = value;
    this.Paginate.emit(
      {offset: (this.currentPage - 1) * this.elementsPerPage, limit: this.elementsPerPage});
    this.CheckButtons();
  }

  public get CurrentPage() {
    return this.currentPage;
  }

  public set ElementsPerPage(value) {
    this.elementsPerPage = value;
    this.CurrentPage = 1;
  }

  public get ElementsPerPage() {
    return this.elementsPerPage;
  }

  public get MaxPages() {
    if (this.count != 0) {
      return Math.ceil(this.count / this.elementsPerPage);
    }

    return 1;
  }


  public MoveNext() {
    this.CurrentPage++;
  }

  public MovePrevious() {
    this.CurrentPage--;
  }

  public CheckButtons() {
    this.IsBackEnabled = this.currentPage != 1;
    this.IsNextEnabled = this.currentPage != this.MaxPages;
  }


  constructor() {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.CheckButtons();
  }

  toggleFiltersMethod() {
    this.filterState = !this.filterState;
    this.toggleFilters.emit(this.filterState);
  }
}
