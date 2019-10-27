import { Component, OnInit } from '@angular/core';
import {ComputerService} from "./computer.service";

@Component({
  selector: 'sg-computer-grid',
  template: ``
})
export class ComputerGridComponent implements OnInit {

  constructor(private computers : ComputerService) { }

  ngOnInit() {
  }

}
