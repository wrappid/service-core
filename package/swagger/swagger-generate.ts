import swaggerJson from "../../../test-wrappid-service/src/swagger-output.json";
import {databaseActions} from "../database/actions.database";

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
  
const convertType = (type: string): { type: string; format?: string; example?: any } => {
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
  
const mapSchemaToFormat = (schema: Schema) => {
  const properties: { [key: string]: any } = {};
  
  for (const [key, attribute] of Object.entries(schema.attributes)) {
    properties[key] = convertType(attribute.type);
    if (attribute.primaryKey) {
      properties[key].example = 1;
    }
  }
  
  return {
    type: "object",
    properties,
  };
};
  
const generateFormattedSchemas = (modelSchemas: ModelSchema[]) => {
  return modelSchemas.map((model) => {
    return {
      [model.dataValues.name]: mapSchemaToFormat(model.dataValues.schema),
    };
  });
};
  

  
export const getSwaggerJson= async()=>{
  const data=await databaseActions.findAll("application","Routes",{
    where:{
      source:"server-side",
      _status:"published",
           
    }
  });
  const modelData=await databaseActions.findAll("application","ModelSchemas",{
    where:{
      _status:"published"
    }
  });
  const modelSchemaData=generateFormattedSchemas(modelData);
    
  const schemas: { [key: string]: Schemas } = {};
  
  modelSchemaData.forEach(item => {
    const [key, value] = Object.entries(item)[0];
    schemas[key] = {
      type: value["type"],
      properties: value["properties"]
    };
  });
  // console.log(schemas)
  swaggerJson.components.schemas=schemas;
  // console.log(data)
  const newSwaggerJson:{[key:string]:any}={};
  data.forEach((element:any) => {
        
    console.log(element.dataValues.extraInfo);
    
    const path:string=element.dataValues.url;
    const method:string=element.dataValues.reqMethod;
    const pathValue:any={
      [method]:{
        "tags": [
          element.dataValues.extraInfo.tags,
        ],
        "summary":element.dataValues.title,
        "description":element.dataValues.description,
        "requestBody":element.dataValues.extraInfo.requestBody,
        "responses":element.dataValues.extraInfo.responses,
      }
            
    };
    newSwaggerJson[path]=pathValue;
       
  });
  // console.log(newSwaggerJson)
  swaggerJson.paths=newSwaggerJson;
  // swaggerJson.components.schemas={...modelSchemaData};
  // console.log(swaggerJson)
  return swaggerJson;
};
export default swaggerJson;

// export default swaggerJson