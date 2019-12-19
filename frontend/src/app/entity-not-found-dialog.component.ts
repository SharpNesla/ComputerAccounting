import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'sg-delete-dialog',
  template: `<!--<h1 mat-dialog-title>Удаление сущности</h1>-->
  <!--  <div mat-dialog-actions>-->
  <!--      <button mat-button (click)="onNoClick()">No Thanks</button>-->
  <!--      <button mat-button cdkFocusInitial>Ok</button>-->
  <!--  </div>-->

  <sg-dialog-layout (accept)="apply()" acceptOnly="true" (deny)="deny()">
      <header>
          <mat-icon>warning</mat-icon>
          Ошибка
      </header>
      <mat-card id="sg-entity-not-fount-content-card">
          <p>
              Запрашиваемая сущность не найдена.<br>
              Вы будете перенаправлены в справочник вида запрашиваемой сущности.<br>
              
          </p>
      </mat-card>
  </sg-dialog-layout>`,
  styles: [`#sg-entity-not-fount-content-card {
      margin-top: 1.5em;
      margin-right: 1.5em;
      margin-left: 1.5em;
  }`]
})
export class EntityNotFoundDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<EntityNotFoundDialogComponent>) {
  }

  deny() {
    this.dialogRef.close(false);
  }

  apply(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
