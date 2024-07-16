export class RentalEntity {
  public lesse_id: string;
  public lessor_id: string;
  public vehicle_id: string;
  public start_date: Date;
  public end_date: Date;
  public uuid: string;
  public total_amount: number;
  public status: string;

  constructor(lesse_id: string, lessor_id: string, vehicle_id: string, start_date: Date, end_date: Date, uuid: string, total_amount: number, status: string) {
    this.lesse_id = lesse_id;
    this.lessor_id = lessor_id;
    this.vehicle_id = vehicle_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.uuid = uuid;
    this.total_amount = total_amount;
    this.status = status;
  }
}