import { Injectable } from '@angular/core';
import {EntityRepository} from "./entity-repository";
import {Computer} from "../entities/computer";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComputerService extends EntityRepository<Computer> {
  constructor(httpClient : HttpClient){
    super(httpClient,"computer" ,[]);
  }

  protected prepareEntity(entity: Computer): Computer {
    if (entity.Room.Id != null){
      entity.RoomId = entity.Room.Id;
    }

    entity.ResponsibleId = entity.Responsible.Id;

    entity = Object.assign(entity, {UserIds: entity.Users.map(x=>x.Id) });

    delete entity.Room;
    delete entity.Responsible;
    delete entity.Users;

    return super.prepareEntity(entity);
  }
}
