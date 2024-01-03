import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "Routes" })
export class Routes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  authRequired: boolean;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "json" })
  keywords: JSON;

  @Column({ type: "json" })
  extraInfo: JSON;

  @Column()
  source: string;

  @Column()
  _status: string;

  @Column()
  deletedAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  pageRef: string;

  @Column()
  createdBy: number;

  @Column()
  updatedBy: number;

  @Column()
  deletedBy: number;

  @Column()
  entityRef: string;

  @Column({ type: "json" })
  comments: JSON;

  @Column()
  reqMethod: string;

  @Column()
  controllerRef: string;

  @Column()
  functionRef: string;
}
