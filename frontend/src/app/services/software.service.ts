import { Injectable } from '@angular/core';
import {EntityServiceBase, PackEntityRepository} from "./entity-service-base";
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

    if (entity.License != null){
      entity.LicenseId = entity.License.Id;
    }

    entity.ComputerId = undefined;

    return super.prepareEntity(entity);
  }
}
