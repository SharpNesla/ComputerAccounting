import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'sg-delete-dialog',
  template: `<!--<h1 mat-dialog-title>Удаление сущности</h1>-->
  <!--  <div mat-dialog-actions>-->
  <!--      <button mat-button (click)="onNoClick()">No Thanks</button>-->
  <!--      <button mat-button cdkFocusInitial>Ok</button>-->
  <!--  </div>-->

  <sg-dialog-layout (Accept)="apply()" (Deny)="deny()">
      <header>
          <mat-icon>delete</mat-icon>
          Ошибка
      </header>
      <p>
          В процессе передачи данных произошло повреждение данных<br>
          совершите новую попытку, либо отмените внесение данных.
      </p>
  </sg-dialog-layout>`
})
export class BadRequestDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<BadRequestDialogComponent>) {
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
