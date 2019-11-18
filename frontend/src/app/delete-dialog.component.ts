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
          Удалить сущность?
      </header>
  </sg-dialog-layout>`
})
export class DeleteDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>) {
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
