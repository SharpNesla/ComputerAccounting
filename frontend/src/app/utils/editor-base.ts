import {EntityBase} from "../model/entities/entity-base";
import {EntityRepository} from "../model/repositories/entity-repository";
import {OnDestroy, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

export class EditorBase<TEntity extends EntityBase,
  TRepository extends EntityRepository<TEntity>> implements OnInit {
  public Entity: TEntity;
  public isNew: boolean;
  protected Repo: TRepository;

  constructor(repository : TRepository, protected route : ActivatedRoute, addEntity : TEntity){
    this.Repo = repository;
    console.log(addEntity);
    this.Entity = addEntity;
  }

  public applyChanges()
  {
    if (this.isNew)
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

  ngOnInit() {
    if (this.route.snapshot.url[1].path == 'add') {
      this.isNew = true;
    } else {
      this.route.params.subscribe(params => {
        this.Repo.getById(+params['id']).subscribe(x => this.Entity = x)
      });
    }
  }
}
