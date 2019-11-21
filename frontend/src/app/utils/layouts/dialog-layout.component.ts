import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'sg-dialog-layout',
  template: `
      <main>
          <mat-toolbar color="primary" class="mat-elevation-z2 sg-appbar">
              <ng-content select="header"></ng-content>
          </mat-toolbar>
          <ng-content></ng-content>
          <div id="sg-button-container">
              <button mat-button color="primary" [routerLink]="EndLink"
                      (click)="Accept.emit()">ПРИНЯТЬ
              </button>
              <button id="discard-button"
                      [routerLink]="EndLink" (click)="Deny.emit()"
                      mat-button color="primary">ОТМЕНИТЬ
              </button>
          </div>
      </main>`,
  styles: [`
      #sg-button-container {
          padding: 1.5em;
          display: flex;
          width: calc(100% - 2.6rem);
      }

      #discard-button {
          margin-left: auto;
      }

  `]
})
export class DialogLayoutComponent implements OnInit {
  @Input('end-link') EndLink: string;
  @Output() Accept = new EventEmitter();
  @Output() Deny = new EventEmitter();

  constructor(private location: Location) {
  }

  cancel() {
    this.location.back()
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event:
                                                                          KeyboardEvent) {
    this.Deny.emit();
  }

  ngOnInit() {
  }

}
