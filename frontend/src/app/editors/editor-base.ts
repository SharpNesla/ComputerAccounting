import {EntityBase} from "../entities/entity-base";
import {EntityServiceBase, PackEntityService} from "../services/entity-service-base";
import {OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BadRequestDialogComponent} from "../bad-request-dialog.component";

export class EditorBase<TEntity extends EntityBase,
  TRepository extends EntityServiceBase<TEntity>> implements OnInit {
  public Entity: TEntity;
  public isNew: boolean;
  protected Repo: TRepository;

  constructor(repository: TRepository, protected route: ActivatedRoute, protected dialog: MatDialog,
              addEntity: TEntity, protected router: Router, public readonly endLink = "") {
    this.Repo = repository;
    this.Entity = addEntity;
  }

  public applyChanges() {
    let observable;
    if (this.isNew) {
      observable = this.Repo.add(this.Entity)
    } else {
      observable = this.Repo.update(this.Entity)
    }
    observable.subscribe(
      response => this.router.navigateByUrl(this.endLink),
      error => this.dialog.open(BadRequestDialogComponent, {width: '300px'})
    );
  }

  public discardChanges() {
  }

  ngOnInit() {
    if (this.route.snapshot.url[1].path == 'add') {
      this.isNew = true;
    } else {
      this.route.params.subscribe(params => {
        this.Repo.getById(+params['id']).subscribe(x => this.Entity = x, err => {
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
              router : Router,
              dialog: MatDialog,
              addEntity: TEntity, endLink : string = "") {

    super(repository, route, dialog, addEntity, router, endLink)
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
