import {EntityBase, EntityWithAddress} from './entity-base';
import {EmployeeExtension} from './employee';
import {RoomExtension} from './room';

export class Subsidiary extends EntityWithAddress {
  Director: EmployeeExtension;
}

export class SubsidiaryExtension extends Subsidiary {
  Name: string;
  Address: string;
  RoomsCount: number;
  Rooms: RoomExtension[];
  EmployeesCount: number;
  ComputersCount: number;

  DirectorId: number | null;
}
