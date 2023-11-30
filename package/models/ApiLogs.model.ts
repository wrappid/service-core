const Sequelize = require('sequelize');
import { Column, Model, Table, DataType} from "sequelize-typescript";


@Table
export class ApiLogs extends Model {
    @Column({
        field: "id",
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

      @Column({
        field: "apiId",
        type: DataType.TEXT
      })
      apiId: string;
      
      @Column({
        field: "route",
        type: DataType.TEXT
      })
      route: string;

      @Column({
        field: "status",
        type: DataType.TEXT
      })
      status:string;

      @Column({
        field: "extraInfo",
        type: DataType.JSONB
      })
      extraInfo:JSON;

      @Column({
        field: "isActive",
        type: DataType.BOOLEAN
      })
      isActive: boolean;

      @Column({
        field: "source",
        type: DataType.TEXT
      })
      source:string;

      @Column({
        field: "_status",
        type: DataType.TEXT
      })
      _status:string;

      @Column({
        field: "deletedAt", 
        type: DataType.DATE,
        allowNull: true,
      })
      deletedAt: Date;

      @Column({
        field: "createdAt", 
        type: DataType.DATE,
        allowNull: false,
      })
      createdAt: Date;


      @Column({
        field: "updatedAt", 
        type: DataType.DATE,
        allowNull: false,
      })
      updatedAt: Date;

      @Column({
        field: "createdBy", 
        type: DataType.INTEGER,
        allowNull: true,
      })
      createdBy: number;

      @Column({
        field: "updatedBy", 
        type: DataType.INTEGER,
        allowNull: true,
      })
      updatedBy: number;

      @Column({
        field: "userId", 
        type: DataType.INTEGER,
        allowNull: true,
      })
      userId: number;

      @Column({
        field: "deletedBy", 
        type: DataType.INTEGER,
        allowNull: true,
      })
      deletedBy: number;


}
