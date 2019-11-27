import { Injectable } from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {HttpClient} from "@angular/common/http";
import {Subsidiary} from "../entities/subsidiary";

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService extends EntityRepository<Subsidiary> {
  constructor(httpClient : HttpClient){
    super(httpClient,"subsidiary" ,[]);
  }
}
