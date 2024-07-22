import RentalModel from "../../database/mysql/models/rental.model";
import { RentalEntity } from "../../domain/entities/rental.entity";
import { RentalInterface } from "../../domain/interfaces/rental.interface";
import sendMessageAndWaitForResponse from "../sagaMessagin";
import { Op } from 'sequelize';
import sendMessageToUsersAndWaitForResponse from "../sagaUsersMessagin";

export class MysqlRentalRepository implements RentalInterface {
  async createRental(rental: RentalEntity): Promise<RentalEntity> {
    try {
      console.log(rental);

      const lesseRentals = await this.getRentalsByLesseId(rental.lesse_id, true);
      const vehicleIds = lesseRentals.map(rental => rental.vehicle_id?.uuid);
      console.log(vehicleIds);
      if (vehicleIds.includes(rental.vehicle_id)) {
        throw new Error('This vehicle is already rented by this user');
      }

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

      const vehicleId = rental?.vehicle_id;

      const response = await sendMessageAndWaitForResponse("getCarFromOrder", { vehicleId });

      rental!.vehicle_id = response.vehicle;

      const lesseId = rental?.lesse_id;
      const lesse = await sendMessageToUsersAndWaitForResponse("getUserFromCar", { userId: lesseId });
      rental!.lesse_id = lesse.data;

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

  async getRentalsByLessorId(lessor_id: string): Promise<RentalEntity[]> {
    try {
      const rentals = await RentalModel.findAll({
        where: {
          lessor_id,
        },
      });


      for (let i = 0; i < rentals.length; i++) {
        const vehicleId = rentals[i].vehicle_id;
        const response = await sendMessageAndWaitForResponse("getCarFromOrder", { vehicleId });
        rentals[i].vehicle_id = response.vehicle;

        const lesseId = rentals[i].lesse_id;
        const lesse = await sendMessageToUsersAndWaitForResponse("getUserFromCar", { userId: lesseId });
        rentals[i].lesse_id = lesse.data;

        console.log(lesse);

      }

      return rentals;
    } catch (error) {
      throw error;
    }
  }

  async getRentalsByLesseId(lesse_id: string, active?: boolean): Promise<RentalEntity[]> {
    try {
      const query: any = {
        where: {
          lesse_id,
        },
      };

      // Add the filter for active rentals if 'active' is true
      if (active) {
        query.where.status = {
          [Op.ne]: 'FINISHED', // Sequelize's operator for 'not equal'
        };
      }

      const rentals = await RentalModel.findAll(query);

      for (let i = 0; i < rentals.length; i++) {
        const vehicleId = rentals[i].vehicle_id;
        const response = await sendMessageAndWaitForResponse("getCarFromOrder", { vehicleId });
        rentals[i].vehicle_id = response.vehicle;
      }

      return rentals;
    } catch (error) {
      throw error;
    }
  }

  async isRentalActiveByVehicleId(vehicle_id: string): Promise<boolean> {
    try {
      const rental = await RentalModel.findOne({
        where: {
          vehicle_id,
          status: {
            [Op.ne]: 'FINISHED',
          },
        },
      });

      return !!rental;
    } catch (error) {
      throw error;
    }
  }
}
