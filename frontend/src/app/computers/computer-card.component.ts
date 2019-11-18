import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "../utils/card-base";
import {Computer} from "./computer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'sg-computer-card',
  template: `
      <h1 mat-dialog-title>Hi {{data.Name}}</h1>
      <div mat-dialog-content>
          <p>What's your favorite animal?</p>
          <mat-form-field>
              <input matInput [(ngModel)]="data.InventoryId">
          </mat-form-field>
      </div>
      <div mat-dialog-actions>
          <button mat-button (click)="onNoClick()">No Thanks</button>
          <button mat-button [mat-dialog-close]="null" cdkFocusInitial>Ok</button>
      </div>`
})
export class ComputerCardComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ComputerCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Computer) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
