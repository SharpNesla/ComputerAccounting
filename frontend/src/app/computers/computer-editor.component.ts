import { Component, OnInit } from '@angular/core';
import {ComputerService} from "./computer.service";
import {Computer} from "./computer";

@Component({
  selector: 'sg-computer-editor',
  template:`<sg-dialog-layout (Accept)="add()">
      <header>Добавление компьютера</header>
      <div id="sg-table-container"></div>
  </sg-dialog-layout>`,
  styles: [
    `:host {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
      }
      #sg-table-container{
          flex-grow: 1;
      }
      table {
          margin: 2em;
          width: calc(100% - 4em);
      }`]
})
export class ComputerEditorComponent implements OnInit {

  constructor(private service : ComputerService) { }
  add(){
    this.service.add({Name: "testname", InventoryId: "inventoryId", id: 0, Owner: null});
  }
  ngOnInit() {
  }

}
