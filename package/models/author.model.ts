// user.model.ts
import { Table, Model, Column, HasMany, ModelCtor } from "sequelize-typescript";
import { ModelDecorator } from "../decorators/model.decorator";
import { ModelRegistry } from "../registry/ModelRegistry";

@ModelDecorator
@Table({ tableName: "Authors" })
export class Author extends Model<Author> {
  @Column
  name: string;

  // static associate(): void {
  //   let model = ModelRegistry.getClass("Post");
  //   Author.hasMany(model as ModelCtor, { foreignKey: "authorId" });
  // }
}
