import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'sg-dialog-layout',
  template: `
      <main>
          <mat-toolbar color="primary" class="mat-elevation-z8">
              <ng-content select="header"></ng-content>
          </mat-toolbar>
          <ng-content></ng-content>
          <div id="sg-button-container">
              <button mat-button color="primary">ПРИНЯТЬ</button>
              <button id="discard-button" (click)="this.cancel()"
                      mat-button color="primary">ОТМЕНИТЬ</button>
          </div>
      </main>`,
  styles: [`
      #sg-button-container {
          padding: 1.5em;
          display: flex;
          width: calc(100% - 2.6rem);
      }
    
    #discard-button{
        margin-left: auto;
    }
        
  `]
})
export class DialogLayoutComponent implements OnInit {

  constructor(private location: Location) { }

  cancel() {
    this.location.back()
  }

  ngOnInit() {
  }

}
