import {EntityBase} from "../model/entities/entity-base";
import {EntityRepository} from "../model/repositories/entity-repository";
import {OnInit} from "@angular/core";

export class EditorBase<TEntity extends EntityBase,
  TRepository extends EntityRepository<TEntity>> implements OnInit {
  public Entity: TEntity;
  private IsNew: boolean = true;
  protected Repo: TRepository;

  constructor(repository : TRepository, addEntity : TEntity){
    this.Repo = repository;
    console.log(addEntity);
    this.Entity = addEntity;
  }

  public applyChanges()
  {
    if (this.IsNew)
    {
      this.Repo.add(this.Entity);
    }
    else
    {
      this.Repo.update(this.Entity);
    }
  }

  public discardChanges(){

  }

  ngOnInit(): void {

  }
}
