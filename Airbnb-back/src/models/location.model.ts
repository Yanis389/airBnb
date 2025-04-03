import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'locations',
  timestamps: true,
})
export class Location extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likes!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;
}