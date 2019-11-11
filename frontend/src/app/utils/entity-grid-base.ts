import {EntityBase} from "../model/entities/entity-base";
import {EntityRepository} from "../model/repositories/entity-repository";
import {Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";

export abstract class EntityGridBase<TEntity extends EntityBase,
  TRepository extends EntityRepository<TEntity>> implements OnInit {
  public Filter: TEntity[];
  public Entities: Observable<TEntity[]>;
  public SelectedEntity: TEntity;
  public IsCompact: boolean;
  public Count: number = 0;

  protected Repo: TRepository;

  @Input() public IsDisplaySubtotals: boolean;
  @Input() public IsSearchDrawerOpened: boolean;
  @Input() public DisplaySelectionColumn: boolean;

  public SearchString: string;

  protected constructor(repository: TRepository, displayedColumns: string[]) {
    this.Repo = repository;
    this.DisplayedColumns = displayedColumns;
  }

  public DisplayedColumns: string[];

  public Refresh(offset : number, limit : number) {

    this.Entities = this.Repo.get(offset, limit,
      [], null, null)
  }

  Remove() {
    this.Repo.remove(null);
  };

  ngOnInit(): void {
    this.Entities = this.Repo.get(0, 5, [], null, null)
    this.Repo.getCount(null).subscribe(x => this.Count = x);
  }
}
