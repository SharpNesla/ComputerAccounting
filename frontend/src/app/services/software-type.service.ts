import { Injectable } from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {Software} from "../entities/software";
import {HttpClient} from "@angular/common/http";
import {SoftwareType} from "../entities/software-type";

@Injectable({
  providedIn: 'root'
})
export class SoftwareTypeService extends EntityRepository<SoftwareType> {
  constructor(httpClient : HttpClient){
    super(httpClient,"software-type" ,[]);
  }
}
