import {EntityBase} from "../model/entities/entity-base";
import {EntityRepository} from "../model/repositories/entity-repository";
import {Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";

export abstract class EntityGridBase<TEntity extends EntityBase,
  TRepository extends EntityRepository<TEntity>> implements OnInit{
  public Filter: TEntity[];
  public Entities: Observable<TEntity[]>;
  public SelectedEntity: TEntity;
  public IsCompact: boolean;


  protected Repo: TRepository;

  @Input() public IsDisplaySubtotals: boolean;
  @Input() public IsSearchDrawerOpened : boolean;
  @Input() public DisplaySelectionColumn : boolean;

  public SearchString : string;

  protected constructor(repository : TRepository, displayedColumns : string[]){
    this.Repo = repository;
    this.DisplayedColumns = displayedColumns;
  }
  public DisplayedColumns: string[];
  get Count(){
    return this.Repo.getCount(this.Filter);
  }

  Remove(){
    this.Repo.remove(null);
  };

  ngOnInit(): void {
    this.Entities = this.Repo.get(0,100000,[],null,null)
  }
}
