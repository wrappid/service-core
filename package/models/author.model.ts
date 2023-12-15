import { ModelRegistry } from "../registry/ModelRegistry";
import { ModelDecorator } from "../decorators/model.decorator";
import { Table, Model, Column, HasMany, ModelCtor } from "sequelize-typescript";

// @ModelDecorator
@Table({ schema: "wrappid", tableName: "Authors" })
export class Author extends Model<Author> {
  @Column
  name: string;

  static associate(): void {
    let modelPost: ModelCtor = <ModelCtor>ModelRegistry.getClass("Post");
    let modelAuthor: ModelCtor = <ModelCtor>ModelRegistry.getClass("Author");
    modelAuthor.hasMany(modelPost, { foreignKey: "authorId" });
  }
}
