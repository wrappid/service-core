import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Users } from "./user.entity";
// import { Users } from "./user.entity";
// import { ModelDecorator } from "../decorators/model.decorator";
// import { EntityRegistry } from "../registry/entity.registry";
// const Users = EntityRegistry.getRegistryEntity("Users");

@Entity({ name: "Posts" })
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Users, (users: any) => users.posts)
  @JoinColumn({ name: "authorId" })
  user: typeof Users;
}
