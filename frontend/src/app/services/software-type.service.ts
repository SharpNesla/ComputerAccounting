import {Injectable} from '@angular/core';
import {EntityServiceBase} from "./entity-service-base";
import {SoftwareExtension} from "../entities/software";
import {HttpClient} from "@angular/common/http";
import {SoftwareTypeExtension} from "../entities/software-type";

@Injectable({
  providedIn: 'root'
})
export class SoftwareTypeService extends EntityServiceBase<SoftwareTypeExtension> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "software-type");
  }

  protected prepareEntitySave(entity: SoftwareTypeExtension): SoftwareTypeExtension {
    entity.SoftwareCount = undefined;

    if (entity.Dependencies){
      entity = Object.assign({DependenciesIds: entity.Dependencies.map(x => x.Id)}, entity);
    }
    entity.Dependencies = undefined;
    return super.prepareEntitySave(entity);
  }
}
