import { Injectable } from '@angular/core';
import {EntityServiceBase} from "./entity-service-base";
import {PartType} from "../entities/part-type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PartTypeService extends EntityServiceBase<PartType> {
  constructor(httpClient : HttpClient){

    super(httpClient, "part-type")
  }
}
