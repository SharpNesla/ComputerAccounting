import { Injectable } from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {License} from "../entities/license";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LicensesService extends EntityRepository<License> {
  constructor(httpClient : HttpClient){
    super(httpClient,"license" ,[]);
  }
}
