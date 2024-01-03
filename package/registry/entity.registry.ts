import { Wrappid } from "@wrappid/root";
import { BaseEntity } from "typeorm";

export const EntityRegistry = Wrappid.createRegistry(BaseEntity);
