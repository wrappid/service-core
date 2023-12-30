import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { DataSource } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModelRegistry } from "../registry/ModelRegistry";
import { join } from "path";
import { EntityRegistry } from "../registry/entity.registry";

/**
 * @todo missing coding documentation
 *
 * @description
 */
@Injectable()
export class DatabaseService {
  /**
   * @description
   */
  private connections: Map<string, DataSource> = new Map();
  constructor() {
    const modelArray = EntityRegistry.getRegistry();
    const registryEntityData = Array.from(modelArray.values()).map(
      ({ registryEntity }) => registryEntity
    );

    // console.log(registryEntityData);

    const databases = ConfigService.getCustomConfig()["databases"] || [];
    Object.keys(databases).forEach(async (dbIdentifier: string) => {
      const connectDB: DataSource = new DataSource({
        ...databases[dbIdentifier],
        entities: [...registryEntityData],
      });
      connectDB
        .initialize()
        .then(() => {
          console.log(`${dbIdentifier} Data Source has been initialized!`);
        })
        .catch((err) => {
          console.error(
            `Error during ${dbIdentifier} Data Source initialization ${err}`
          );
        });
      // load entities, establish db connection, sync schema, etc.
      // let seqObj: Sequelize = new Sequelize(databases[dbIdentifier]);
      this.connections.set(dbIdentifier, connectDB);
      // sequelize.addModels([]);
      // await sequelize.sync();
      // return sequelize;
    });
  }

  /**
   *
   * @returns
   */
  static getAllDatabaseProviders() {
    ModelRegistry.initialize([join(__dirname, "./")]);
    const modelArray = ModelRegistry.getClasses();
    console.log(modelArray);
    const databases = ConfigService.getCustomConfig()["databases"] || [];
    return Object.keys(databases).map((dbIdentifier: string) => {
      return {
        provide: TypeOrmModule,
        useFactory: async () => {
          const dataSource = new DataSource({
            ...databases[dbIdentifier],
            entities: [modelArray],
          });
          /**
           * @todo
           *
           * add models from registry
           */
          return dataSource;
        },
      };
    });
  }

  /**
   *
   * @param connectionName
   * @returns
   */
  async getConnection(connectionName: string): Promise<DataSource> {
    // console.log(this.connections);

    return this.connections.get(connectionName);
  }

  /**
   *
   * @param connection
   * @returns
   */
}
