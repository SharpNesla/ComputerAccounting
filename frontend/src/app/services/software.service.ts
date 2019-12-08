import { Injectable } from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {Software} from "../entities/software";
import {HttpClient} from "@angular/common/http";
import {Part} from "../entities/part";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService extends EntityRepository<Software> {
  constructor(httpClient : HttpClient){
    super(httpClient,"software" ,[]);
  }

  protected prepareEntity(entity: Software): Software {
    entity.SoftwareTypeId = entity.SoftwareType.Id;

    if (entity.Computer != null){
      entity.ComputerId = entity.Computer.Id;
    }

    entity.ComputerId = undefined;

    return super.prepareEntity(entity);
  }
}
