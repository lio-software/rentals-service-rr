import RentalModel from "../../database/mysql/models/rental.model";
import { RentalEntity } from "../../domain/entities/rental.entity";
import { RentalInterface } from "../../domain/interfaces/rental.interface";

export class MysqlRentalRepository implements RentalInterface {
  async createRental(rental: RentalEntity): Promise<RentalEntity> {
    try {
      const newRental = await RentalModel.create({
        lesse_id: rental.lesse_id,
        lessor_id: rental.lessor_id,
        vehicle_id: rental.vehicle_id,
        start_date: rental.start_date,
        end_date: rental.end_date,
        uuid: rental.uuid,
        total_amount: rental.total_amount,
        status: rental.status,
      });

      return newRental;
    } catch (error) {
      throw error;
    }
  }

  async getRentalById(id: string): Promise<RentalEntity | null> {
    try {
      const rental = await RentalModel.findOne({
        where: {
          uuid: id,
        },
      });
      if (!rental) {
        return null;
      }
      return rental;
    } catch (error) {
      throw error;
    }
  }

  async getRentals(): Promise<RentalEntity[]> {
    try {
      const rentals = await RentalModel.findAll();
      return rentals;
    } catch (error) {
      throw error;
    }
  }

  async updateRental(id: string, rental: RentalEntity): Promise<RentalEntity | null> {
    try {
      const rentalToUpdate = await RentalModel.findOne({
        where: {
          uuid: id,
        },
      });

      if (!rentalToUpdate) {
        return null;
      }

      await RentalModel.update(rental, {
        where: {
          uuid: id,
        },
      });

      return rental;
    }
    catch (error) {
      throw error;
    }
  }

  async deleteRental(id: string): Promise<boolean> {
    try {
      await RentalModel.destroy({
        where: {
          uuid: id,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
