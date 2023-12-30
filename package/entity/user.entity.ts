import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Posts } from "./post.entity";
import { ModelDecorator } from "../decorators/model.decorator";

@ModelDecorator
@Entity({ name: "Users" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];
}
