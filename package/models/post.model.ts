// post.model.ts
import {
  Table,
  Model,
  Column,
  ForeignKey,
  ModelCtor,
} from "sequelize-typescript";
import { Author } from "./author.model";
import { ModelDecorator } from "../decorators/model.decorator";
import { ModelRegistry } from "../registry/ModelRegistry";

// @ModelDecorator
@Table({ tableName: "Posts" })
export class Post extends Model<Post> {
  @Column
  title: string;

  @ForeignKey(() => Author)
  @Column
  authorId: number;

  // @BelongsTo(() => User)
  // user: User;

  static associate(): void {
    let model = ModelRegistry.getClass("Author");
    Post.belongsTo(model as ModelCtor, { foreignKey: "authorId" });
  }
}
