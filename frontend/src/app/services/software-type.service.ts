import {Injectable} from '@angular/core';
import {EntityServiceBase} from "./entity-service-base";
import {Software} from "../entities/software";
import {HttpClient} from "@angular/common/http";
import {SoftwareType} from "../entities/software-type";

@Injectable({
  providedIn: 'root'
})
export class SoftwareTypeService extends EntityServiceBase<SoftwareType> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "software-type");
  }

  protected prepareEntitySave(entity: SoftwareType): SoftwareType {
    entity.SoftwareCount = undefined;

    if (entity.Dependencies){
      entity = Object.assign({DependenciesIds: entity.Dependencies.map(x => x.Id)}, entity);
    }
    entity.Dependencies = undefined;
    return super.prepareEntitySave(entity);
  }
}
