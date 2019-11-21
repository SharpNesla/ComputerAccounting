import {EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable} from "rxjs";
import {Subsidiary} from "../subsidiary/subsidiary";
import {map} from "rxjs/operators";
import {SubsidiaryService} from "../subsidiary/subsidiary.service";
import {EntityBase} from "../model/entities/entity-base";
import {EntityRepository} from "../model/repositories/entity-repository";

export class SingleSearchBase<TEntity extends EntityBase,
  TEntityRepository extends EntityRepository<TEntity>> {


  entities: Observable<TEntity[]>;
  @Input('selected') selectedEntity: TEntity;
  @Input() hint : string;
  @Input() searchHint : string;
  @Input() filterDefinition : TEntity[];
  @Output('selectedChange') selectedEntityChanged: EventEmitter<TEntity>;
  searchString: string;

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

  constructor(private service : TEntityRepository) {
    this.selectedEntityChanged = new EventEmitter<TEntity>();
  }

}
