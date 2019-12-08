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


    if (entity.PartType != null){
      entity.PartTypeId = entity.PartType.Id;
    }

    if(entity.Subsidiary){
      entity.SubsidiaryId = entity.Subsidiary.Id;
    }

    entity.ComputerId = undefined;
    entity.PartTypeId = undefined;
    entity.SubsidiaryId = undefined;

    return super.prepareEntity(entity);
  }
}


