import {Injectable} from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {HttpClient} from "@angular/common/http";
import {Part} from "../entities/part";


@Injectable({
  providedIn: 'root'
})
export class PartService extends EntityRepository<Part> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "part", [])
  }

  protected prepareEntity(entity: Part): Part {
    entity.ComputerId = entity.Computer.Id;
    delete entity.ComputerId;

    if (entity.PartType != null){
      entity.PartTypeId = entity.PartType.Id;
    }
    delete entity.PartTypeId;

    if(entity.Subsidiary){
      entity.SubsidiaryId = entity.Subsidiary.Id;
    }
    delete entity.SubsidiaryId;

    return super.prepareEntity(entity);
  }
}


