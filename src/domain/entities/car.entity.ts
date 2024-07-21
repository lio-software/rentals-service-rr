export class CarEntity {
  public uuid: string;
  public brand: string;
  public model: string;
  public year: number;
  public type: string;
  public price: number;

  constructor(uuid: string, brand: string, model: string, year: number, type: string, price: number) {
    this.uuid = uuid;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.type = type;
    this.price = price;
  }
}