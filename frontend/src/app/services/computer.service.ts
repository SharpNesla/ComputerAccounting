import {EntityServiceBase, keysToCamel} from './entity-service-base';
import {ComputerExtension} from "../entities/computer";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {SubsidiaryExtension} from "../entities/subsidiary";
import {CountableBySubsidiaries, CountBySubsidiaryResult} from '../analytics/countable-by-subsidiary';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComputerService extends EntityServiceBase<ComputerExtension> implements CountableBySubsidiaries{
  constructor(httpClient : HttpClient){
    super(httpClient, "computer");
  }

  protected prepareEntitySave(entity: ComputerExtension): ComputerExtension {
    if (entity.Room){
      entity.RoomId = entity.Room.Id;
    }

    if (entity.Subsidiary){
      entity.SubsidiaryId = entity.Subsidiary.Id;
    }

    entity.ResponsibleId = entity.Responsible.Id;

    if (entity.Users){

      entity = Object.assign(entity, {UserIds: entity.Users.map(x=>x.Id) });
    }

    entity.Room = undefined;
    entity.Subsidiary = undefined;
    entity.Responsible = undefined;
    entity.Users = undefined;

    entity.UsersCount = undefined;

    return super.prepareEntitySave(entity);
  }

  getCountBySubsidiaries(filterDefinition: object): CountBySubsidiaryResult[] {
    return [];
  }

  getCountBySubs(): Observable<SubsidiaryExtension[]> {
    return this.client.get<SubsidiaryExtension[]>(`api/${this.entityPrefix}/get-count-by-subsidiary`)
      .pipe(map(x=>keysToCamel(x)));
  }

}
