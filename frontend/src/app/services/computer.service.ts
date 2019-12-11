import {EntityRepository} from "./entity-repository";
import {Computer} from "../entities/computer";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Subsidiary} from "../entities/subsidiary";
import {CountableBySubsidiaries, CountBySubsidiaryResult} from "../analytics/chartable-by-date";

@Injectable({
  providedIn: 'root'
})
export class ComputerService extends EntityRepository<Computer> implements CountableBySubsidiaries{
  constructor(httpClient : HttpClient){
    super(httpClient, "computer");
  }

  protected prepareEntity(entity: Computer): Computer {
    if (entity.Room.Id != null){
      entity.RoomId = entity.Room.Id;
    }

    entity.ResponsibleId = entity.Responsible.Id;

    entity = Object.assign(entity, {UserIds: entity.Users.map(x=>x.Id) });

    entity.Room = undefined;
    entity.Responsible = undefined;
    entity.Users = undefined;

    return super.prepareEntity(entity);
  }

  getCountBySubsidiaries(filterDefinition: object): CountBySubsidiaryResult[] {
    return [];
  }

}
