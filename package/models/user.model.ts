// user.model.ts
import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { Post } from "./post.model";
import { ModelDecorator } from "../decorators/model.decorator";

@ModelDecorator
@Table({ tableName: "Users" })
export class User extends Model<User> {
  @Column
  name: string;

  @HasMany(() => Post)
  posts: Post[];
}
