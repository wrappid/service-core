import { Column, Model, Table } from "sequelize-typescript";
import { ModelDecorator } from "../../decorators/model.decorator";

// @ModelDecorator
@Table
export class CronSchemas extends Model {
  @Column
  name: string;

  @Column
  expression: string;

  @Column
  cronModule: string;
}
