import { Injectable } from '@angular/core';
import {EntityRepository, PackEntityRepository} from "./entity-repository";
import {Software} from "../entities/software";
import {HttpClient} from "@angular/common/http";
import {Part} from "../entities/part";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService extends PackEntityRepository<Software> {
  constructor(httpClient : HttpClient){
    super(httpClient, "software");
  }

  protected prepareEntityRange(entity: Software): Software {
    entity = this.prepareEntity(entity);

    entity.ComputerId = null;

    return super.prepareEntityRange(entity);
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
