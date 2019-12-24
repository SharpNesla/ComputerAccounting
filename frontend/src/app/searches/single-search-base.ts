import {EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, interval, observable, Observable, of, Subject} from 'rxjs';
import {debounce, exhaustMap, flatMap, map, mergeMap, throttle} from 'rxjs/operators';
import {EntityBase} from '../entities/entity-base';
import {EntityServiceBase} from '../services/entity-service-base';
import {ControlValueAccessor} from '@angular/forms';


export class SingleSearchBase<TEntity extends EntityBase> implements ControlValueAccessor, OnInit {
  get searchHint(): string {

    if (this._searchHint) {
      return this._searchHint;
    } else {
      return 'сущность';
    }
  }

  @Input() set searchHint(value: string) {
    this._searchHint = value;
  }

  @Input() required: boolean;

  searchString: string;

  search() {
    this.searchBehaviourSubject.next(this.searchString);
  }

  searchBehaviourSubject: Subject<string> = new Subject<string>();

  get selectedEntity(): TEntity {
    return this._selectedEntity;
  }

  set selectedEntity(value: TEntity) {
    this._selectedEntity = value;
    this.writeValue(value);
    this.onTouched();
  }

  constructor(protected service: EntityServiceBase<TEntity>) {

  }

  entities: TEntity[];
  private _selectedEntity: TEntity;

  @Input() disabled: boolean;
  @Input() hint: string;
  private _searchHint: string;
  @Input() filterDefinition;

  public dataSource(searchString, filterDefinition: object): Observable<TEntity[]> {
    if (searchString && searchString != '') {

      return this.service.get(searchString, 0, 10, null, null, null);
    } else {
      return of([]);
    }
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this._selectedEntity = obj;
    this.searchBehaviourSubject.next(null);
    this.onChange(obj);
  }

  ngOnInit(): void {
    this.searchBehaviourSubject.asObservable()
      .pipe(
        flatMap(x => this.dataSource(x, this.filterDefinition)),
        map(x => {
          if (this.selectedEntity != null) {
            x = x.filter(y => y.Id != this.selectedEntity.Id);
            x.unshift(this.selectedEntity);
          }
          return x;
        })
      ).subscribe(x => {
      this.entities = x;
    });
  }
}
