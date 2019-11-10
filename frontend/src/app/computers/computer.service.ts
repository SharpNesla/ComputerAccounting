import { Injectable } from '@angular/core';
import {EntityRepository} from "../model/repositories/entity-repository";
import {Computer} from "./computer";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComputerService extends EntityRepository<Computer> {
  constructor(httpClient : HttpClient){
    super(httpClient,"computer" ,[]);
  }
}
