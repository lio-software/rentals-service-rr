import { RentalInterface } from "../../domain/interfaces/rental.interface";
import signale from "signale";

export class GetRentalByIdUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute(rental_id: string) {
    try {
      const rental = await this.rentalRepository.getRentalById(rental_id);

      return rental;
    } catch (error) {
      signale.error(error);
    }
  }
}