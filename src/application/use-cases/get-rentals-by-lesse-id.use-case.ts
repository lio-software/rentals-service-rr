import { RentalInterface } from "@src/domain/interfaces/rental.interface";
import signale from "signale";

export class GetRentalsByLesseIdUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute(lesse_id: string, active?: boolean) {
    try {
      const rentals = await this.rentalRepository.getRentalsByLesseId(lesse_id, active? active : undefined);

      return rentals;
    } catch (error) {
      signale.error(error);
    }
  }
}