import { ModelDecorator } from "../decorators/model.decorator";
import BaseModel from "../common/base.model";
import { Column, Model, Table, DataType } from "sequelize-typescript";
import { Sequelize } from "sequelize";

@ModelDecorator
@Table
export class ApiRequestLogs extends Model implements BaseModel {
  static associate(models: any) {}

  @Column({
    field: "id",
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: "ip",
    type: DataType.TEXT,
    allowNull: true,
  })
  ip: string;

  @Column({
    field: "access_key",
    type: DataType.TEXT,
    allowNull: true,
  })
  access_key: string;

  @Column({
    field: "endpoint",
    type: DataType.TEXT,
    allowNull: true,
  })
  endpoint: string;

  @Column({
    field: "request",
    type: DataType.TEXT,
    allowNull: true,
  })
  request: string;

  @Column({
    field: "req_body",
    type: DataType.JSONB,
    allowNull: true,
  })
  req_body: JSON;

  @Column({
    field: "response",
    type: DataType.JSONB,
    allowNull: true,
  })
  response: JSON;
  @Column({
    field: "response_status",
    type: DataType.TEXT,
    allowNull: true,
  })
  response_status: string;

  @Column({
    field: "response_header",
    type: DataType.JSONB,
    allowNull: true,
  })
  response_header: JSON;

  @Column({
    field: "header_stack",
    type: DataType.JSONB,
    allowNull: true,
  })
  header_stack: JSON;

  @Column({
    field: "start_ts",
    type: DataType.DATE,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  start_ts: Date;

  @Column({
    field: "end_ts",
    type: DataType.DATE,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  end_ts: Date;

  @Column({
    field: "created_ts",
    type: DataType.DATE,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  createdAt: Date;

  @Column({
    field: "updated_ts",
    type: DataType.DATE,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  updatedAt: string;
}