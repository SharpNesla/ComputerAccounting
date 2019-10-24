import {EntityBase} from "../entities/entity-base";
import {HttpClient} from "@angular/common/http";

export abstract class EntityRepository<T extends EntityBase> {
  protected constructor(private client : HttpClient){

  }

  public get() {
    return this.client.get("")
  }
}
