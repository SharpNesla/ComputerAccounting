import {EntityBase} from '../entities/entity-base';
import {EntityServiceBase, PackEntityService} from '../services/entity-service-base';
import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {BadRequestDialogComponent} from '../bad-request-dialog.component';
import {first, mergeMap} from 'rxjs/operators';
import {EntityNotFoundDialogComponent} from '../entity-not-found-dialog.component';

export class EditorBase<TEntity extends EntityBase,
  TRepository extends EntityServiceBase<TEntity>> implements OnInit {
  public entity: TEntity;
  public isNew: boolean;

  constructor(protected repo: TRepository, protected route: ActivatedRoute, protected dialog: MatDialog,
              addEntity: TEntity, protected router: Router, public readonly endLink = '') {
    this.entity = addEntity;
  }

  //Perform request from backend and define is result valid or invalid, then
  //return user to table or show error message
  public applyChanges() {
    let observable;
    if (this.isNew) {
      observable = this.repo.add(this.entity);
    } else {
      observable = this.repo.update(this.entity);
    }
    observable
      .pipe(first())
      .subscribe(
        next => this.router.navigateByUrl(this.endLink),
        error => this.dialog.open(BadRequestDialogComponent, {width: '300px'})
      );
  }

  //Return user to table page
  public discardChanges() {
    this.router.navigateByUrl(this.endLink);
  }

  //Define what is editor for: editing or adding entity to system
  ngOnInit() {
    if (this.route.snapshot.url[1].path == 'add') {
      this.isNew = true;
    } else {
      this.route.params
        .pipe(
          mergeMap(x => this.repo.getById(x['id'])),
          first()
        ).subscribe(
        x => {

          this.entity = x;
          this.onEntityGot();
        },
        err => {
          this.isNew = true;
          this.dialog.open(EntityNotFoundDialogComponent)
            .afterClosed().pipe(first()).subscribe(() => this.router.navigateByUrl(this.endLink));
        }
      );
    }
  }

  protected onEntityGot() {

  }
}

export class PackEditorBase<TEntity extends EntityBase,
  TRepository extends PackEntityService<TEntity>> extends EditorBase<TEntity, TRepository> implements OnInit {
  isPackAdd: boolean;
  packCount: number;

  constructor(repository: TRepository,
              route: ActivatedRoute,
              router: Router,
              dialog: MatDialog,
              addEntity: TEntity, endLink: string = '') {

    super(repository, route, dialog, addEntity, router, endLink);
  }


  public applyChanges() {
    if (this.isPackAdd && this.isNew) {
      this.repo.addPack(this.entity, this.packCount).pipe(first()).subscribe(
        response => this.router.navigateByUrl(this.endLink),
        error => {
          this.dialog.open(BadRequestDialogComponent, {
            width: '300px'
          });
        }
      );
    } else {
      super.applyChanges();
    }
  }
}
