import { Injectable } from '@angular/core';
import {EntityRepository} from "../model/repositories/entity-repository";
import {PartType} from "./part-type";

@Injectable({
  providedIn: 'root'
})
export class PartTypeService extends EntityRepository<PartType> {

}
