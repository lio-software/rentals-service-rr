import { RentalInterface } from "@src/domain/interfaces/rental.interface";
import signale from "signale";

export class IsRentalActiveByVehicleIdUseCase {
  constructor(private readonly rentalRepository: RentalInterface) {}

  async execute(vehicle_id: string) {
    try {
      const isActive = await this.rentalRepository.isRentalActiveByVehicleId(vehicle_id);

      return isActive;
    } catch (error) {
      signale.error(error);
    }
  }
}