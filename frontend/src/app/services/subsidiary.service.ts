import { Injectable } from '@angular/core';
import {EntityServiceBase} from "./entity-service-base";
import {HttpClient} from "@angular/common/http";
import {SubsidiaryExtension} from "../entities/subsidiary";

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService extends EntityServiceBase<SubsidiaryExtension> {
  constructor(httpClient : HttpClient){
    super(httpClient, "subsidiary");
  }

  protected prepareEntitySave(entity: SubsidiaryExtension): SubsidiaryExtension {
    if (entity.Director){
      entity.DirectorId = entity.Director.Id;
    }

    entity.Director = undefined;
    entity.RoomsCount = undefined;

    return super.prepareEntitySave(entity);
  }
}
