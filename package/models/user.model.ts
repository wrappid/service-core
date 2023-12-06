// user.model.ts
import { Table, Model, Column, HasMany, ModelCtor } from "sequelize-typescript";
import { Post } from "./post.model";
import { ModelDecorator } from "../decorators/model.decorator";
import { ModelRegistry } from "../registry/ModelRegistry";

@ModelDecorator
@Table({ tableName: "Users" })
export class User extends Model<User> {
  @Column
  name: string;

  // @HasMany(() => Post)
  // posts: Post[];

  static associate(): void {
    let model = ModelRegistry.getClass("Post");
    User.hasMany(model as ModelCtor, { foreignKey: "userId" });
  }
}
