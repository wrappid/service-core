import { ModelRegistry } from "../registry/ModelRegistry";
import { ModelDecorator } from "../decorators/model.decorator";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  ModelCtor,
  BelongsTo,
  DataType,
} from "sequelize-typescript";

// @ModelDecorator
@Table
export class Routes extends Model<Routes> {
  @Column({
    field: "id",
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: "name",
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    field: "url",
    type: DataType.STRING,
    allowNull: true,
  })
  url: string;

  @Column({
    field: "authRequired",
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  authRequired: boolean;

  @Column({
    field: "title",
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    field: "description",
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    field: "keywords",
    type: DataType.STRING,
    allowNull: true,
  })
  keywords: JSON;

  @Column({
    field: "extraInfo",
    type: DataType.STRING,
    allowNull: true,
  })
  extraInfo: JSON;

  @Column({
    field: "source",
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "server-side",
  })
  source: string;

  @Column({
    field: "_status",
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "new",
  })
  _status: string;

  @Column({
    field: "deletedAt",
    type: DataType.DATE,
    allowNull: false,
  })
  deletedAt: Date;

  @Column({
    field: "createdAt",
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    field: "updatedAt",
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

  @Column({
    field: "pageRef",
    type: DataType.STRING,
    allowNull: true,
  })
  pageRef: string;

  @Column({
    field: "createdBy",
    type: DataType.INTEGER,
    allowNull: true,
  })
  createdBy: number;

  @Column({
    field: "updatedBy",
    type: DataType.INTEGER,
    allowNull: true,
  })
  updatedBy: number;

  @Column({
    field: "deletedBy",
    type: DataType.INTEGER,
    allowNull: true,
  })
  deletedBy: number;

  @Column({
    field: "entityRef",
    type: DataType.STRING,
    allowNull: true,
  })
  entityRef: string;

  @Column({
    field: "comments",
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: [],
  })
  comments: JSON;

  @Column({
    field: "reqMethod",
    type: DataType.STRING,
    allowNull: true,
  })
  reqMethod: string;

  @Column({
    field: "controllerRef",
    type: DataType.STRING,
    allowNull: true,
  })
  controllerRef: string;
}
