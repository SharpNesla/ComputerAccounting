import {EntityBase} from './entity-base';
import {SubsidiaryExtension} from './subsidiary';
import {ComputerExtension} from './computer';

export class Room extends EntityBase {
  Number: string;
  Subsidiary: SubsidiaryExtension;
}

export class RoomExtension extends Room {
  SubsidiaryId: number;

  Name: string;

  Computers: ComputerExtension[];
  ComputersCount: number;
}
