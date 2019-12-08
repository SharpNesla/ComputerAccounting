import {EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable} from "rxjs";
import {Subsidiary} from "../entities/subsidiary";
import {map} from "rxjs/operators";
import {SubsidiaryService} from "../services/subsidiary.service";
import {EntityBase} from "../entities/entity-base";
import {EntityRepository} from "../services/entity-repository";

export class SingleSearchBase<TEntity extends EntityBase,
  TEntityRepository extends EntityRepository<TEntity>> implements OnInit {
  get searchString(): string {
    return this._searchString;
  }

  set searchString(value: string) {
    this._searchString = value;
  }


  entities: Observable<TEntity[]>;
  @Input('selected') selectedEntity: TEntity;
  @Input() hint: string;
  @Input() searchHint: string;
  @Input() filterDefinition: TEntity[];
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

  constructor(private service: TEntityRepository) {
    this.selectedEntityChanged = new EventEmitter<TEntity>();
  }

  ngOnInit(): void {
    // this.entities = new Observable<TEntity[]>((observer) => {
    //   observer.next([this.selectedEntity]);
    // });
    this.search()
  }

}
