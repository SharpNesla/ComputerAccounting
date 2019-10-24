import { Injectable } from '@angular/core';
import {ComputerRepository} from "./repositories/computer-repository";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public readonly Computers : ComputerRepository ;
  constructor(httpClient : HttpClient) {
    this.Computers = new ComputerRepository(httpClient);
  }
}
