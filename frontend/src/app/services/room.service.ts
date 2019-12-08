import {Injectable} from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {HttpClient} from "@angular/common/http";
import {Room} from "../entities/room";

@Injectable({
  providedIn: 'root'
})
export class RoomService extends EntityRepository<Room> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "room", []);
  }

  protected prepareEntity(entity: Room): Room {
    entity.SubsidiaryId = entity.Subsidiary.Id;
    entity.Subsidiary = undefined;
    return super.prepareEntity(entity);
  }
}
