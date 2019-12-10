import {EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {BehaviorSubject, interval, Observable} from "rxjs";
import {Subsidiary} from "../entities/subsidiary";
import {map, throttle} from "rxjs/operators";
import {SubsidiaryService} from "../services/subsidiary.service";
import {EntityBase} from "../entities/entity-base";
import {EntityRepository} from "../services/entity-repository";

export class SingleSearchBase<TEntity extends EntityBase,
  TEntityRepository extends EntityRepository<TEntity>> implements OnInit, OnDestroy {
  get searchString(): string {
    return this._searchString;
  }

  set searchString(value: string) {
    this._searchString = value;
  }

  SearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  entities: Observable<TEntity[]>;
  @Input('selected') selectedEntity: TEntity;
  @Input() hint: string;
  @Input() searchHint: string;
  @Input() filterDefinition: TEntity[];
  @Input() disabled : boolean;

  @Output('selectedChange') selectedEntityChanged: EventEmitter<TEntity>;

  private _searchString: string;

  search() {
    this.entities =
      this.service.get(0, 10, null, null, null)
        .pipe(map(x => {
          if (this.selectedEntity != null) {
            x.unshift(this.selectedEntity);
          }
          return x;
        }));
  }

  makeSearchRequest(string: string) {
    this.SearchSubject.next(string);
  }

  constructor(private service: TEntityRepository) {
    this.selectedEntityChanged = new EventEmitter<TEntity>();
  }

  ngOnInit(): void {
    // this.entities = new Observable<TEntity[]>((observer) => {
    //   observer.next([this.selectedEntity]);
    // });
    this.SearchSubject
      .pipe(throttle(val => interval(500)))
      .subscribe(x=>this.search())
  }

  ngOnDestroy(): void {
    this.SearchSubject.unsubscribe()
  }
}
