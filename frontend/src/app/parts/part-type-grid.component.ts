import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "./part-type.service";


@Component({
  selector: 'sg-part-type-grid',
  template: `
      <sg-crud router-link="/part-types/add"
               icon="memory"
               entity-name="типов комплектующих"
               is-compact="false"></sg-crud>`
})
export class PartTypeGridComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}