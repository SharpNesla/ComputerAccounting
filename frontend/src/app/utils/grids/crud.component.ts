import {Component, Input, OnInit, Output} from '@angular/core';
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'sg-crud',
  template: `

      <mat-toolbar id="search-toolbar" style="margin-top: 32px" color="primary">
          <mat-card id="search-input">
              <button mat-icon-button>
                  <mat-icon>search</mat-icon>
              </button>
              <mat-form-field appearance="standard">
                  <input matInput placeholder="Поиск {{EntityName}}">
              </mat-form-field>
          </mat-card>
          <mat-card id="paginator">
              <div >
                  {{EntityName}} на странице  10  1 из 1
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
      }

      #search-input {
          flex-grow: 1;
          margin-right: 24px;
          padding: 0;
      }


      #paginator {
          padding: 4px 4px 4px 24px;
      }
    `
  ]
})
export class CrudComponent implements OnInit {
  @Input('entity-name') EntityName: string;
  @Input('is-compact') IsCompact: boolean;
  @Input('router-link') link: string;
  @Output() Add;
  @Output() Search;
  @Output() Paginate;

  constructor() {
  }

  ngOnInit() {
  }

}
