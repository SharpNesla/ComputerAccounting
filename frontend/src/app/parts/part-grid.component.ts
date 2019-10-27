import {Component, OnInit} from '@angular/core';
import {PartTypeService} from "./part-type.service";


@Component({
  selector: 'sg-part-grid',
  template: `
      <sg-crud router-link="/part-types/add"
               icon="memory"
               entity-name="комплектующих"
               is-compact="false"></sg-crud>`
})
export class PartGridComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
