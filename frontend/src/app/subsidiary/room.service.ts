import {Injectable} from '@angular/core';
import {EntityRepository} from "../model/repositories/entity-repository";
import {HttpClient} from "@angular/common/http";
import {Room} from "./room";

@Injectable({
  providedIn: 'root'
})
export class RoomService extends EntityRepository<Room> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "room", []);
  }

  protected prepareEntity(entity: Room): Room {
    entity.SubsidiaryId = entity.Subsidiary.Id;
    delete entity.Subsidiary;
    return super.prepareEntity(entity);
  }
}
