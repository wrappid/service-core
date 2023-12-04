import BaseModel from "../common/base.model";
import { ModelDecorator } from "../decorators/model.decorator";
import { Column, Model, Table } from "sequelize-typescript";

@ModelDecorator
@Table
export class CoreModel extends Model implements BaseModel {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
