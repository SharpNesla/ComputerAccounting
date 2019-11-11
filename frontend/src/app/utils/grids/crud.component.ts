import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'sg-crud',
  template: `

      <mat-toolbar id="search-toolbar" color="primary">
          <mat-icon>{{this.icon}}</mat-icon>
          <mat-card id="search-input">
              <button mat-icon-button (click)="this.Search.emit(this.SearchString)">
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field id="searchbar" class="searchbar-input" appearance="standard">
                  <input matInput placeholder="Поиск {{EntityName}}">
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
                  {{currentPage}} из {{MaxPages}}
                  <button mat-flat-button (click)="MoveNext()" disabled="!this.IsBackEnbaled">
                      <mat-icon>arrow_back</mat-icon>
                  </button>
                  <button mat-flat-button (click)="MovePrevious()" disabled="!this.IsNextEnbaled">
                      <mat-icon>arrow_forward</mat-icon>
                  </button>
              </div>
          </mat-card>
          <button id="button-add" routerLink="{{this.link}}" mat-fab>
              <mat-icon>add</mat-icon>
          </button>
      </mat-toolbar>

  `,
  styles: [
      `#button-add {
          position: relative;
          margin-left: 24px;
          top: -32px;
      }

      #search-toolbar {
          display: flex;
          font-size: 1em;
          margin-top: 32px
      }

      #search-input {
          flex-grow: 1;
          margin-left: 16px;
          margin-right: 12px;
          padding: 0;
      }


      #paginator {
          padding: 5px 4px 0 16px;
      }
      #searchbar{

          width: calc(100% - 56px);
      }
      #paginator-input{
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
  @Input('is-compact') IsCompact: boolean;
  @Input('router-link') link: string;
  @Input() count: number;
  @Input() icon: string;
  @Output() Search: EventEmitter<string>;
  @Output() Paginate: EventEmitter<number>;
  public values = [5, 10, 20, 100];
  public get EntityNameCapitalized(){

    return this.EntityName.charAt(0).toUpperCase() + this.EntityName.slice(1);
  }
  IsNextEnabled: boolean;
  IsBackEnabled: boolean;
  SearchString: string;
  public currentPage: number;
  public elementsPerPage: number = 5;

  public set ElementsPerPage(value) {
    this.elementsPerPage = value;
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
    this.currentPage++;
  }

  public ChangeElementsPerPage() {
    this.currentPage = 1;
  }


  public MovePrevious() {
    this.currentPage--;
  }

  public CheckButtons() {
    this.IsBackEnabled = this.currentPage != 1;
    this.IsNextEnabled = this.currentPage != this.MaxPages;
  }


  constructor() {
  }

  ngOnInit() {
    this.currentPage = 1;
  }

}
