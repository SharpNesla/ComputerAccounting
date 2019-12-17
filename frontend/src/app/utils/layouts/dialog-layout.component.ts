import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'sg-dialog-layout',
  template: `
      <mat-toolbar color="primary" class="mat-elevation-z2 sg-appbar">
          <ng-content select="header"></ng-content>
      </mat-toolbar>
      <main class="mat-app-background">
          <ng-content></ng-content>

          <div id="sg-button-container">
              <button mat-button color="primary"
                      (click)="accept.emit()"
                      [disabled]="!acceptDisabled">ПРИНЯТЬ
              </button>
              <button id="discard-button"
                      *ngIf="!acceptOnly" (click)="deny.emit()"
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
  @Output() accept = new EventEmitter();
  @Output() deny = new EventEmitter();
  @Input() acceptOnly: boolean;
  @Input() acceptDisabled: boolean = true;

  constructor(private location: Location) {
  }

  cancel() {
    this.location.back()
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event:
                                                                          KeyboardEvent) {
    this.deny.emit();
  }

  ngOnInit() {
  }

}
