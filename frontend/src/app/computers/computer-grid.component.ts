import {Component, OnInit} from '@angular/core';
import {ComputerService} from "./computer.service";


@Component({
  selector: 'sg-computer-grid',
  template: `    
      <sg-crud router-link="/computers/add"
               icon="desktop_mac"
               entity-name="компьютеров"
               is-compact="false"></sg-crud>`
})
export class ComputerGridComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
