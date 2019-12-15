import {EntityBase} from "../entities/entity-base";
import {EntityServiceBase, PackEntityService} from "../services/entity-service-base";
import {OnDestroy, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog.component";
import {BadRequestDialogComponent} from "../bad-request-dialog.component";

export class EditorBase<TEntity extends EntityBase,
  TRepository extends EntityServiceBase<TEntity>> implements OnInit {
  public Entity: TEntity;
  public isNew: boolean;
  protected Repo: TRepository;

  constructor(repository: TRepository, protected route: ActivatedRoute, protected dialog: MatDialog,
              addEntity: TEntity) {
    this.Repo = repository;
    this.Entity = addEntity;
  }

  public applyChanges() {
    if (this.isNew) {
      this.Repo.add(this.Entity).subscribe(
        response => console.log(response),
        error => {
          console.log(error);
          this.dialog.open(BadRequestDialogComponent, {
            width: '300px',
            data: true
          })
        }
      );
    } else {
      this.Repo.update(this.Entity);
    }
  }

  public discardChanges() {
  }

  ngOnInit() {
    if (this.route.snapshot.url[1].path == 'add') {
      this.isNew = true;
    } else {
      this.route.params.subscribe(params => {
        this.Repo.getById(+params['id']).subscribe(x => this.Entity = x, err =>{
          this.dialog.open(BadRequestDialogComponent)
        })
      });
    }
  }
}

export class PackEditorBase<TEntity extends EntityBase,
  TRepository extends PackEntityService<TEntity>> extends EditorBase<TEntity, TRepository> implements OnInit {
  isPackAdd: boolean;
  packCount: number;

  constructor(repository: TRepository,
              route: ActivatedRoute,
              dialog: MatDialog,
              addEntity: TEntity) {

    super(repository, route, dialog, addEntity)
  }


  public applyChanges() {
    if (this.isPackAdd && this.isNew) {
      this.Repo.addRange(this.Entity, this.packCount).subscribe(
        response => console.log(response),
        error => {
          console.log(error);
          this.dialog.open(BadRequestDialogComponent, {
            width: '300px',
            data: true
          })
        }
      );
    } else {
      super.applyChanges();
    }
  }
}
