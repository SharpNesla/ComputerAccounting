import { Injectable } from '@angular/core';
import {EntityRepository} from "../model/repositories/entity-repository";
import {Software} from "./software";
import {HttpClient} from "@angular/common/http";
import {SoftwareType} from "./software-type";

@Injectable({
  providedIn: 'root'
})
export class SoftwareTypeService extends EntityRepository<SoftwareType> {
  constructor(httpClient : HttpClient){
    super(httpClient,"software-type" ,[]);
  }
}
