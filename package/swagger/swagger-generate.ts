import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { databaseActions } from "../database/actions.database";
import { GenericObject } from "../types/generic.types";


/**
 *
 */
interface Attribute {
  type: string;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  defaultValue?: any;
  allowNull?: boolean;
}

/**
 *
 */
interface Schema {
  table: string;
  database: string;
  attributes: { [key: string]: Attribute };
  associations: any[];
}

/**
 *
 */
interface ModelSchema {
  dataValues: {
    id: number;
    name: string;
    database: string;
    schema: Schema;
    [key: string]: any;
  };
}

type Property = {
  type: string;
  format?: string;
  example?: any;
  description?: string;
  enum?: string[];
};

type Schemas = {
  type: string;
  properties: {
    [key: string]: Property;
  };
};

const convertColumnType = (type: string): { type: string; format?: string; example?: any } => {
  switch (type.toUpperCase()) {
    case "INTEGER":
      return { type: "integer", format: "int64", example: 10 };
    case "STRING":
      return { type: "string", example: "example string" };
    case "BOOLEAN":
      return { type: "boolean", example: true };
    case "DATE":
      return { type: "string", format: "date-time", example: "2024-05-14T08:23:59.991Z" };
    case "JSONB":
      return { type: "object", example: {} };
    default:
      return { type: "string", example: null };
  }
};

const convertModeltoSwaggerSchema = (schema: Schema) => {
  const properties: { [key: string]: any } = {};
  for (const [key, attribute] of Object.entries(schema.attributes)) {
    properties[key] = convertColumnType(attribute.type);
    if (attribute.primaryKey) {
      properties[key].example = 1;
    }
  }
  return {
    type: "object",
    properties,
  };
};

const generateSwaggerSchemas = (modelSchemas: ModelSchema[]): { [key: string]: Schemas } => {
  const schemas: { [key: string]: Schemas } = {};
  modelSchemas.forEach((model) => {
    schemas[model.dataValues.name] = convertModeltoSwaggerSchema(model.dataValues.schema);
  });
  return schemas;
};

export const generateSwaggerJson = async (swaggerJson: GenericObject) => {
  const data = await databaseActions.findAll("application", "Routes", {
    where: {
      source: "server-side",
      _status: "published",

    }
  });
  // const models = await databaseActions.findAll("application", "ModelSchemas", {
  //   where: {
  //     _status: "published"
  //   }
  // });
  const models=ApplicationContext.getContext(constant.registry.MODELS__REGISTRY);
  swaggerJson.components.schemas = generateSwaggerSchemas(models);
  // console.log(data)
  const newSwaggerJson: { [key: string]: any } = {};
  data.forEach((element: any) => {

    console.log(element.dataValues.extraInfo);

    const path: string = element.dataValues.url;
    const method: string = element.dataValues.reqMethod;
    const pathValue: any = {
      [method]: {
        "tags": [
          element.dataValues.extraInfo.tags,
        ],
        "summary": element.dataValues.title,
        "description": element.dataValues.description,
        "requestBody": element.dataValues.extraInfo.requestBody,
        "responses": element.dataValues.extraInfo.responses,
      }

    };
    newSwaggerJson[path] = pathValue;

  });
  // console.log(newSwaggerJson)
  swaggerJson.paths = newSwaggerJson;
  // swaggerBasicInfo.components.schemas={...modelSchemaData};
  // console.log(swaggerBasicInfo)
  return swaggerJson;
};
