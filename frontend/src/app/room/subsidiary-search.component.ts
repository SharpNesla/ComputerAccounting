import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Subsidiary} from "../subsidiary/subsidiary";
import {SubsidiaryService} from "../subsidiary/subsidiary.service";

@Component({
  selector: 'sg-subsidiary-search',
  template: `
      <mat-form-field class="sg-search">
          <mat-label>Выберите филиала помещения</mat-label>
          <mat-select [(value)]="selectedEntity">
                  <button mat-icon-button>
                      <mat-icon>search</mat-icon>
                  </button>
                  <mat-form-field appearance="standard">
                      <input matInput placeholder="Поиск сущности" 
                             (keydown)="$event.stopPropagation()"
                             type="search"
                             [(ngModel)]="searchString">
                  </mat-form-field>
              <mat-option [value]="null">Не задано</mat-option>
              <mat-option *ngFor="let entity of entities | async" [value]="entity">
                  {{entity.Id}} {{entity.Address}}
              </mat-option>
          </mat-select>
      </mat-form-field>`,
  styles: [`
      .sg-search{
          width: 100%;
      }
      button{
      margin-left: 8px;
      margin-right: 4px;
  }`]
})
export class SubsidiarySearchComponent implements OnInit {

  entities : Observable<Subsidiary[]>;
  selectedEntity : Subsidiary;
  searchString : string;

  search(){
    this.entities = this.service.get(0,10, null, null, null);
    console.log(this.entities);
  }

  constructor(private service : SubsidiaryService){

  }

  ngOnInit(): void {
    this.search();
  }

}
