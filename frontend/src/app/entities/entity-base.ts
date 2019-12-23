export abstract class EntityBase {
  Id: number;
  Comment: string;

  CreatedAt: Date | string;
  UpdatedAt: Date | string;
  DeletedAt: Date | string;
}

export abstract class EntityWithAddress extends EntityBase{
  House: string;
  City: string;
  Street: string;
  FlatOrOffice: string;
}
