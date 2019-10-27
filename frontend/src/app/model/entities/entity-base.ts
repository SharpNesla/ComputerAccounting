export abstract class EntityBase {
  private id: Number;

  get Id(): Number {
    return this.id;
  }

  set Id(value: Number) {
    this.id = value;
  }


}
