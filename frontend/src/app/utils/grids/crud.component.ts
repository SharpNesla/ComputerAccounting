import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'sg-crud',
  template: `

      <mat-toolbar id="search-toolbar" color="primary">
          <mat-icon>{{this.icon}}</mat-icon>
          <mat-card id="search-input">
              <button mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field class="searchbar-input" appearance="standard">
                  <input matInput placeholder="Поиск {{EntityName}}">
              </mat-form-field>
          </mat-card>
          <mat-card id="paginator">
              <div>
                  {{EntityName}} на странице 10 1 из 1
                  <button mat-flat-button>
                      <mat-icon>arrow_back</mat-icon>
                  </button>
                  <button mat-flat-button>
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
          padding: 4px 4px 4px 24px;
      }

      .searchbar-input{
          width: calc(100% - 56px);
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
  @Input() icon: string;
  @Output() Search;
  @Output() Paginate;

  constructor() {
  }

  ngOnInit() {
  }

}
