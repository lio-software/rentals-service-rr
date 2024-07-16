import { RentalInterface } from "@src/domain/interfaces/rental.interface";
import signale from "signale";

export class DeleteRentalUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute(rental_id: string) {
    try {
      const rentalEntity = await this.rentalRepository.getRentalById(rental_id);
      if (!rentalEntity) {
        return false;
      }

      const deletedRental = await this.rentalRepository.deleteRental(rental_id);

      return deletedRental;
    } catch (error) {
      signale.error(error);
    }
  }
}