import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Users } from "./user.entity";
import { ModelDecorator } from "../decorators/model.decorator";

@ModelDecorator
@Entity({ name: "Posts" })
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Users, (users) => users.posts)
  @JoinColumn({ name: "authorId" })
  user: Users;
}
