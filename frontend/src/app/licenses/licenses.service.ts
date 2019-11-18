import { Injectable } from '@angular/core';
import {EntityRepository} from "../model/repositories/entity-repository";
import {License} from "./license";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LicensesService extends EntityRepository<License> {
  constructor(httpClient : HttpClient){
    super(httpClient,"license" ,[]);
  }
}
