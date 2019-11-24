import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-about',
  template: `
      <sg-drawer-appbar-base>

          <header>О системе</header>
          <div style="display: flex; flex-direction: column; align-items: center; margin-top: 2em">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24  24"
                   width="40em" fill="#000000">
                  <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;
              text-decoration-style:solid;text-decoration-color:#ffffff;text-transform:none;
              block-progression:tb;isolation:auto;mix-blend-mode:normal"

                        d="M 6 2 C 4.9069372 2 4 2.9069372 4 4 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 
                    C 19.093063 22 20 21.093063 20 20 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6 2 z M 6 4 
                    L 11 4 L 11 9 L 6 9 L 6 4 z M 13 4 L 18 4 L 18 9 L 13 9 L 13 4 z M 6 11 L 11 11 L 11 20
                     L 6 20 L 6 11 z M 13 11 L 18 11 L 18 20 L 13 20 L 13 11 z"

                        font-weight="200" font-family="sans-serif" white-space="normal" overflow="visible"
                        fill="#FFFFFF"/>

              </svg>
              <h2 class="mat-headline" style="text-align: center">
                  Система управления компьютерным парком предприятия.<br>
                  Лабораторная работа №7.
                  Группа ИС-18-1, Корж Даниил Андреевич.</h2>
          </div>
      </sg-drawer-appbar-base>`
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
