import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
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

/**
 *  Convert url pattern to swagger pattern
 * @param input string
 * @returns 
 */
function convertUrlPattern(input:string) {
  // If input is empty or not a string, return as is
  if (!input || typeof input !== "string") {
    return input;
  }

  // Check if the input contains colon parameters
  if (input.includes(":")) {
    // Convert from :param to {param}
    return "/"+input.replace(/:([^/]+)/g, "{$1}");
  } 
  // Check if the input contains curly brace parameters
  else if (input.includes("{")) {
    // Convert from {param} to :param
    return "/"+input.replace(/\{([^}]+)\}/g, ":$1");
  }
  // If no parameters found, return as is
  return "/"+input;
}

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
  const models:ModelSchema[] = ApplicationContext.getContext(constant.registry.MODELS__REGISTRY);
  const allRoutes = ApplicationContext.getContext(constant.registry.ROUTES_REGISTRY);
  const modelsSchema = generateSwaggerSchemas(models);
  // if (swaggerJson.components["schemas"] === undefined) {
  swaggerJson.components["schemas"] = modelsSchema;
  // }
  const newSwaggerJson: { [key: string]: any } = {};
  Object.keys(allRoutes).forEach((key) => {
    const route = allRoutes[key];
    if(route?._status != undefined){
      if(route?._status != "published"){
        return;
      }
    }
    const path: string = convertUrlPattern( route.url);
    const method: string = route.reqMethod;
    const pathValue: any = {
      [method]: {
        "tags": [
          route?.swaggerJson?.tags,
        ],
        "summary": route?.title,
        "parameters": route?.swaggerJson?.parameters,
        "description": route?.description,
        "requestBody": route?.swaggerJson?.requestBody,
        "responses": route?.swaggerJson?.responses,
        "security": route?.swaggerJson?.security
      }

    };
    newSwaggerJson[path] = pathValue;
  });

  if (swaggerJson["paths"] === undefined) {
    swaggerJson["paths"] = newSwaggerJson;
  }
  else {
    swaggerJson.paths = newSwaggerJson;
  }
  return swaggerJson;
};
