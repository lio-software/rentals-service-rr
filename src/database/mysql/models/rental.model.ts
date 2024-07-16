import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface RentalAttributes {
  id: number;
  lesse_id: string;
  lessor_id: string;
  vehicle_id: string;
  start_date: Date;
  end_date: Date;
  uuid: string;
  total_amount: number;
  status: string;
}

@Table({
  tableName: "rentals",
  modelName: "Rental",
  timestamps: true,
})

export default class RentalModel extends Model implements RentalAttributes {

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
  })
  declare id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare lesse_id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare lessor_id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare vehicle_id: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare start_date: Date;
  
  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare end_date: Date;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare uuid: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL,
  })
  declare total_amount: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare status: string;
}