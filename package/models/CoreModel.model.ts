import { ModelDecorator } from 'decorators/ModelDecorator';
import { Column, Model, Table } from 'sequelize-typescript';

@ModelDecorator
@Table
export class CoreModel extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
