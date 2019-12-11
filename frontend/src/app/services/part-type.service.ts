import { Injectable } from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {PartType} from "../entities/part-type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PartTypeService extends EntityRepository<PartType> {
  constructor(httpClient : HttpClient){

    super(httpClient, "part-type")
  }
}
