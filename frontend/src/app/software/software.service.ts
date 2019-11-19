import { Injectable } from '@angular/core';
import {EntityRepository} from "../model/repositories/entity-repository";
import {Software} from "./software";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService extends EntityRepository<Software> {
  constructor(httpClient : HttpClient){
    super(httpClient,"software" ,[]);
  }
}
