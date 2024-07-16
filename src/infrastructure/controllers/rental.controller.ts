import { CreateRentalUseCase } from "@src/application/use-cases/create-rental.use-case";
import { GetRentalByIdUseCase } from "@src/application/use-cases/get-rental-by-id.use-case";
import { GetRentalsUseCase } from "@src/application/use-cases/get-rentals.use-case";
import { UpdateRentalUseCase } from "@src/application/use-cases/update-rental.use-case";
import { DeleteRentalUseCase } from "@src/application/use-cases/delete-rental.use-case";
import { Request, Response } from "express";

export class RentalController {
  constructor(
    private readonly createRentalUseCase: CreateRentalUseCase,
    private readonly getRentalByIdUseCase: GetRentalByIdUseCase,
    private readonly getRentalsUseCase: GetRentalsUseCase,
    private readonly updateRentalUseCase: UpdateRentalUseCase,
    private readonly deleteRentalUseCase: DeleteRentalUseCase
  ) { }

  async createRental(req: Request, res: Response) {
    try {
      const { lesse_id, lessor_id, vehicle_id, start_date, end_date, total_amount, status } = req.body;

      const rental = await this.createRentalUseCase.execute(lesse_id, lessor_id, vehicle_id, start_date, end_date, total_amount, status);

      if (!rental) {
        return res.status(400).json({ message: "Error creating rental" });
      }
      return res.status(201).json({ message: "Rental created successfully!", data: rental });
    } catch (error) {
      res.status(500).json({ message: "Error creating rental" });
    }
  }

  async getRentalById(req: Request, res: Response) {
    try {
      const rental_id = req.params.id;

      console.log(rental_id);

      const rental = await this.getRentalByIdUseCase.execute(rental_id);

      if (!rental) {
        return res.status(400).json({ message: "Rental not found" });
      }
      return res.status(200).json({ message: "Rental found!", data: rental });
    } catch (error) {
      res.status(500).json({ message: "Error getting rental" });
    }
  }

  async getRentals(req: Request, res: Response) {
    try {
      const rentals = await this.getRentalsUseCase.execute();

      if (!rentals) {
        return res.status(400).json({ message: "Rentals not found" });
      }
      return res.status(200).json({ message: "Rentals found!", data: rentals });
    } catch (error) {
      res.status(500).json({ message: "Error getting rentals" });
    }
  }

  async updateRental(req: Request, res: Response) {
    try {
      const rental_id = req.params.id;
      const { lesse_id, lessor_id, vehicle_id, start_date, end_date, total_amount, status } = req.body;

      const rental = await this.updateRentalUseCase.execute(rental_id, { lesse_id, lessor_id, vehicle_id, start_date, end_date, total_amount, status });

      if (!rental) {
        return res.status(400).json({ message: "Error updating rental" });
      }
      return res.status(200).json({ message: "Rental updated successfully!", data: rental });
    } catch (error) {
      res.status(500).json({ message: "Error updating rental" });
    }
  }

  async deleteRental(req: Request, res: Response) {
    try {
      const rental_id = req.params.id;

      const rental = await this.deleteRentalUseCase.execute(rental_id);

      if (!rental) {
        return res.status(400).json({ message: "Error deleting rental" });
      }
      return res.status(200).json({ message: "Rental deleted successfully!", data: rental });
    } catch (error) {
      res.status(500).json({ message: "Error deleting rental" });
    }
  }
}