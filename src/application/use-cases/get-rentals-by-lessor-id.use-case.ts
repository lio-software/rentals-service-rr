import { RentalInterface } from "@src/domain/interfaces/rental.interface";
import signale from "signale";

export class GetRentalsByLessorIdUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute(lessor_id: string) {
    try {
      const rentals = await this.rentalRepository.getRentalsByLessorId(lessor_id);

      return rentals;
    } catch (error) {
      signale.error(error);
    }
  }
}