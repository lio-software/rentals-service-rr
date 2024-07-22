import { CreateRentalUseCase } from "../application/use-cases/create-rental.use-case";
import { GetRentalByIdUseCase } from "../application/use-cases/get-rental-by-id.use-case";  
import { GetRentalsUseCase } from "../application/use-cases/get-rentals.use-case";
import { RentalController } from "../infrastructure/controllers/rental.controller";
import { UpdateRentalUseCase } from "../application/use-cases/update-rental.use-case";
import { DeleteRentalUseCase } from "../application/use-cases/delete-rental.use-case";
import { GetRentalsByLessorIdUseCase } from "../application/use-cases/get-rentals-by-lessor-id.use-case";
import { GetRentalsByLesseIdUseCase } from "../application/use-cases/get-rentals-by-lesse-id.use-case";
import { MysqlRentalRepository } from "../infrastructure/repositories/mysql-rentals.repository";
import { IsRentalActiveByVehicleIdUseCase } from "../application/use-cases/is-rental-active-by-vehicle-id.use-case";

const mysqlRentalRepository = new MysqlRentalRepository();

const createRentalUseCase = new CreateRentalUseCase(mysqlRentalRepository);
const getRentalByIdUseCase = new GetRentalByIdUseCase(mysqlRentalRepository);
const getRentalsUseCase = new GetRentalsUseCase(mysqlRentalRepository);
const updateRentalUseCase = new UpdateRentalUseCase(mysqlRentalRepository);
const deleteRentalUseCase = new DeleteRentalUseCase(mysqlRentalRepository);
const getRentalsByLessorIdUseCase = new GetRentalsByLessorIdUseCase(mysqlRentalRepository);
const getRentalsByLesseIdUseCase = new GetRentalsByLesseIdUseCase(mysqlRentalRepository);
const isRentalActiveByVehicleIdUseCase = new IsRentalActiveByVehicleIdUseCase(mysqlRentalRepository);

export const rentalController = new RentalController(createRentalUseCase, 
  getRentalByIdUseCase, 
  getRentalsUseCase, 
  updateRentalUseCase, 
  deleteRentalUseCase, 
  getRentalsByLessorIdUseCase, 
  getRentalsByLesseIdUseCase,
  isRentalActiveByVehicleIdUseCase
);
