import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "./part-type.service";


@Component({
  selector: 'sg-computer-grid',
  template: `    
      <sg-crud router-link="/computers/add" entity-name="компьютеров" is-compact="false"></sg-crud>`
})
export class PartTypeGridComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
