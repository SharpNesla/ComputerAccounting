import {Injectable} from '@angular/core';
import {EntityServiceBase} from "./entity-service-base";
import {HttpClient} from "@angular/common/http";
import {Room} from "../entities/room";

@Injectable({
  providedIn: 'root'
})
export class RoomService extends EntityServiceBase<Room> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "room");
  }

  protected prepareEntitySave(entity: Room): Room {
    entity.ComputersCount = undefined;

    entity.SubsidiaryId = entity.Subsidiary.Id;
    entity.Subsidiary = undefined;
    return super.prepareEntitySave(entity);
  }
}
