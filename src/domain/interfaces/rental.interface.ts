import { RentalEntity } from "../entities/rental.entity";

export interface RentalInterface {
  createRental(rental: RentalEntity): Promise<RentalEntity>;
  getRentalById(id: string): Promise<RentalEntity | null>;
  getRentals(): Promise<RentalEntity[]>;
  updateRental(string: string, rental: any): Promise<RentalEntity | null>;
  deleteRental(id: string): Promise<boolean>;
}