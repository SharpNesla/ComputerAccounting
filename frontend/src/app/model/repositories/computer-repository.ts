import {EntityRepository} from "./entity-repository";
import {Computer} from "../entities/entity-base";
import {HttpClient} from "@angular/common/http";

export class ComputerRepository extends EntityRepository<Computer>{
  constructor(client : HttpClient) {
    super(client);
  }

}
