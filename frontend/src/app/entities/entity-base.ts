export abstract class EntityBase {
  Id: number;
  Comment: string;

  CreatedAt: Date | string;
  UpdatedAt: Date | string;
  DeletedAt: Date | string;
}
