import {EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {BehaviorSubject, interval, Observable} from "rxjs";
import {Subsidiary} from "../entities/subsidiary";
import {debounce, exhaustMap, map, mergeMap, throttle} from "rxjs/operators";
import {SubsidiaryService} from "../services/subsidiary.service";
import {EntityBase} from "../entities/entity-base";
import {EntityServiceBase} from "../services/entity-service-base";
import {Room} from "../entities/room";
import {RoomService} from "../services/room.service";
import {ControlValueAccessor} from "@angular/forms";


export class SingleSearchBase<TEntity extends EntityBase> implements ControlValueAccessor, OnInit {
  @Input() required: boolean;

  set searchString(value: string) {
    this.searchBehaviourSubject.next(value);
  }

  get searchString() {
    return null;
  }

  searchBehaviourSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

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

  entities: Observable<TEntity[]>;
  private _selectedEntity: TEntity;

  @Input() disabled: boolean;
  @Input() hint: string;
  @Input() searchHint: string;
  @Input() filterDefinition;

  public dataSource(searchString, filterDefinition: object): Observable<TEntity[]> {
    return this.service.get(searchString, 0, 10, null, null, null)
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
    this.onChange(obj);
  }

  ngOnInit(): void {
    this.entities = this.searchBehaviourSubject.asObservable()
      .pipe(
        debounce(val => interval(300)),
        exhaustMap(x => this.disabled ? [] : this.dataSource(x, this.filterDefinition)),
        map(x => {
          if (this.selectedEntity != null) {
            x = x.filter(y => y.Id != this.selectedEntity.Id);
            x.unshift(this.selectedEntity);
          }
          return x;
        })
      );
  }
}
