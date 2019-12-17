import { Injectable } from '@angular/core';
import {EntityServiceBase, PackEntityService} from "./entity-service-base";
import {Software} from "../entities/software";
import {HttpClient} from "@angular/common/http";
import {Part} from "../entities/part";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService extends PackEntityService<Software> {
  constructor(httpClient : HttpClient){
    super(httpClient, "software");
  }

  protected prepareEntityAddPack(entity: Software): Software {
    entity.SoftwareTypeId = entity.SoftwareType.Id;

    entity.ComputerId = undefined;
    entity.LicenseId = undefined;

    entity.License = undefined;
    entity.SoftwareType = undefined;
    entity.Computer = undefined;

    return super.prepareEntityAddPack(entity);
  }

  protected prepareEntitySave(entity: Software): Software {
    entity.SoftwareTypeId = entity.SoftwareType.Id;

    if (entity.Computer){
      entity.ComputerId = entity.Computer.Id;
    }else {
      entity.ComputerId = null;
    }

    if (entity.License){
      entity.LicenseId = entity.License.Id;
    }else{
      entity.LicenseId = null;
    }

    entity.License = undefined;
    entity.SoftwareType = undefined;
    entity.Computer = undefined;

    return super.prepareEntitySave(entity);
  }
}
