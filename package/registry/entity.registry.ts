import { Wrappid } from "@wrappid/root";
import { BaseEntity } from "typeorm";
import { Users } from "../entity/user.entity";
import { Posts } from "../entity/post.entity";

export const EntityRegistry = Wrappid.createRegistry(BaseEntity);
EntityRegistry.register("Users", Users);
EntityRegistry.register("Posts", Posts);
