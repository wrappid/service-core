// post.model.ts
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  ModelCtor,
} from "sequelize-typescript";
import { User } from "./user.model";
import { ModelDecorator } from "../decorators/model.decorator";
import { ModelRegistry } from "../registry/ModelRegistry";

@ModelDecorator
@Table({ tableName: "Posts" })
export class Post extends Model<Post> {
  @Column
  title: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  // @BelongsTo(() => User)
  // user: User;

  static associate(): void {
    let model = ModelRegistry.getClass("User");
    Post.belongsTo(model as ModelCtor, { foreignKey: "userId" });
  }
}
