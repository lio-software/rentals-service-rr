import { RentalInterface } from "@src/domain/interfaces/rental.interface";
import signale from "signale";

export class UpdateRentalUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute(rental_id: string, rental: any) {
    try {
      const rentalEntity = await this.rentalRepository.getRentalById(rental_id);
      if (!rentalEntity) {
        return null;
      }

      const updatedRental = await this.rentalRepository.updateRental(rental_id, rental);

      return updatedRental;
    } catch (error) {
      signale.error(error);
    }
  }
}