import { RentalInterface } from "@src/domain/interfaces/rental.interface";
import signale from "signale";

export class GetRentalsUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute() {
    try {
      const rentals = await this.rentalRepository.getRentals();

      return rentals;
    } catch (error) {
      signale.error(error);
    }
  }
}