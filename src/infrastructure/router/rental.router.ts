import express from 'express';
import { rentalController } from '../rental.dependencies';

export const rentalRouter = express.Router();

rentalRouter.post('/', rentalController.createRental.bind(rentalController));
rentalRouter.get('/:id', rentalController.getRentalById.bind(rentalController));
rentalRouter.get('/', rentalController.getRentals.bind(rentalController));
rentalRouter.put('/:id', rentalController.updateRental.bind(rentalController));
rentalRouter.delete('/:id', rentalController.deleteRental.bind(rentalController));