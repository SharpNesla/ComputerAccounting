import {EntityServiceBase} from "./entity-service-base";
import {Computer} from "../entities/computer";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Subsidiary} from "../entities/subsidiary";
import {CountableBySubsidiaries, CountBySubsidiaryResult} from '../analytics/countable-by-subsidiary';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComputerService extends EntityServiceBase<Computer> implements CountableBySubsidiaries{
  constructor(httpClient : HttpClient){
    super(httpClient, "computer");
  }

  protected prepareEntitySave(entity: Computer): Computer {
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

  getCountBySubs(): Observable<Subsidiary[]> {
    return this.client.get<Subsidiary[]>(`api/${this.entityPrefix}/get-count-by-subsidiary`);
  }

}
