import { RentalInterface } from "../../domain/interfaces/rental.interface";
import signale from "signale";
import { v4 as uuidv4 } from "uuid";

export class CreateRentalUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute(lesse_id: string, lessor_id: string, vehicle_id: string, start_date: Date, end_date: Date, total_amount: number, status: string) {
    try {
      const rental = await this.rentalRepository.createRental({
        lesse_id,
        lessor_id,
        vehicle_id,
        start_date,
        end_date,
        uuid: uuidv4(),
        total_amount,
        status,
      });

      return rental;
    } catch (error) {
      signale.error(error);
    }
  }
}
