// post.model.ts
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { ModelDecorator } from "../decorators/model.decorator";

@ModelDecorator
@Table
export class Post extends Model<Post> {
  @Column
  title: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
