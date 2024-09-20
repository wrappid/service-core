import { coreConstant, databaseActions, databaseProvider } from "../../../index";
import { WrappidLogger } from "../../../logging/wrappid.logger";

// const { httpMethod, entityStatus } = coreConstant;
import { getColumnsFromSchema, getEntitySchema } from "./businessEntity.helper";

const auditAttributes = [
  "id",
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "deletedAt",
  "deletedBy",
];

/**
 * Determines the field type based on the provided attribute type.
 * @param {string} attributeType - The type of attribute to determine the field type for.
 * @returns {string} The field type corresponding to the attribute type.
 */
function getFieldType(attributeType: string) {
  try {
    let type = "text";
    switch (attributeType) {
      case "INTEGER":
        type = "number";
        break;
      case "DATE":
      case "TIMESTAMP":
        type = "date";
        break;
      case "JSONB":
        type = "json";
        break;
      default:
        type = "text";
        break;
    }
    return type;
  } catch (error:any) {
    WrappidLogger.error("----------------------------------------");
    WrappidLogger.error("formSchema.helper>getFieldType");
    WrappidLogger.error(error);
    WrappidLogger.error("----------------------------------------");
    throw error;
  }
}

/**
 * This function will generate form schema
 * 
 * @param {string} modelName : model name 
 * @returns 
 */
async function generateFormSchema(modelName: string) {
  try {
    /**
     * @todo check if present in business entity
     */

    const schema = await getEntitySchema(modelName);
    let fieldsData: any = [];
    if (schema && schema?.model) {
      const entityDB = "application" || schema?.database;
      fieldsData = getColumnsFromSchema(entityDB, schema)?.filter(
        (col: any) => {
          return !auditAttributes.includes(col.id);
        }
      );
      fieldsData?.forEach((fieldData: any) => {
        fieldData.type = getFieldType(fieldData.type);
      });
    }

    const endpoint = "/data/" + modelName;
    const actions: any = [];
    const formSchema = {
      create: {
        endpoint: endpoint,
        method: coreConstant.httpMethod.HTTP_POST,
        authRequired: true,
        successType: [
          "CREATE_" + modelName.toLocaleUpperCase() + "_SUCCESS",
          "CREATE_DATA_SUCCESS",
        ],
        errorType: [
          "CREATE_" + modelName.toLocaleUpperCase() + "_ERROR",
          "CREATE_DATA_ERROR",
        ],
        // reload: true,
      },
      // read: {
      //   endpoint: endpoint,
      //   method: httpMethod.HTTP_GET,
      //   authRequired: true,
      //   successType: "READ_" + modelName.toLocaleUpperCase() + "_SUCCESS",
      //   errorType: "READ_" + modelName.toLocaleUpperCase() + "_ERROR",
      //   onSubmitRefine: "San_URL_ADD_PATH_PARAM_ID",
      // },
      edit: {
        endpoint: endpoint,
        method: coreConstant.httpMethod.HTTP_PUT,
        authRequired: true,
        successType: [
          "UPDATE_" + modelName.toLocaleUpperCase() + "_SUCCESS",
          "UPDATE_DATA_SUCCESS",
        ],
        errorType: [
          "UPDATE_" + modelName.toLocaleUpperCase() + "_ERROR",
          "UPDATE_DATA_ERROR",
        ],
        onSubmitRefine: "San_URL_ADD_PATH_PARAM_ID",
      },
      delete: {
        endpoint: endpoint,
        method: coreConstant.httpMethod.HTTP_PATCH,
        authRequired: true,
        successType: [
          "DELETE_" + modelName.toLocaleUpperCase() + "_SUCCESS",
          "DELETE_DATA_SUCCESS",
        ],
        errorType: [
          "DELETE_" + modelName.toLocaleUpperCase() + "_ERROR",
          "DELETE_DATA_ERROR",
        ],
        onSubmitRefine: "San_URL_ADD_PATH_PARAM_ID",
      },
      fields: fieldsData,
      actions,
    };
    return { formID: modelName, schema: formSchema };
  } catch (error:any) {
    WrappidLogger.error("----------------------------------------");
    WrappidLogger.error("formSchema.helper>generateFormSchemaFromTableAttributes");
    WrappidLogger.error(error);
    WrappidLogger.error("----------------------------------------");
    throw error;
  }
}

/**
 * This function will get form schema from database
 * 
 * @param {string} formID : formID stored in databse 
 * @param {boolean} auth : defines authenticated or guest schema resource
 * @returns formSchema
 */
async function getFormSchemaFromDB(formID: string, auth: boolean) {
  try {
    const dbName = "application";
    const dbSequelize = databaseProvider[dbName].Sequelize;
    let whereClause: any = {
      name: formID,
      _status: coreConstant.entityStatus.PUBLISHED,
    };
    if (auth) {
      whereClause["extraInfo.authRequired"] = true;
    } else  {
      whereClause = {
        ...whereClause,
        [dbSequelize.Op.or]: [
          { "extraInfo.authRequired": true },
          { "extraInfo.authRequired": false },
          { "extraInfo.authRequired": null }
        ],
      };
    }

    const formSchema = await databaseActions.findOne(dbName, "FormSchemas", {
      where: whereClause,
    });
    return formSchema;
  } catch (error:any) {
    WrappidLogger.error("----------------------------------------");
    WrappidLogger.error("formSchema.helper>getFormSchema");
    WrappidLogger.error(error);
    WrappidLogger.error("----------------------------------------");
    throw error;
  }
}

/**
 * This function will return FormSchema
 * 
 * @param {string} formID : formID stored in databse 
 * @param {boolean} auth : defines authenticated or guest schema resource
 * @returns formSchema
 */
export const getFormSchema = async (formID: string, auth = true) => {
  try {
    let formSchema = await getFormSchemaFromDB(formID, auth);
    if (!formSchema && auth) {
      formSchema = generateFormSchema(formID);
    }
    return formSchema;
  } catch (error:any) {
    WrappidLogger.error("----------------------------------------");
    WrappidLogger.error("formSchema.helper>getFormSchema");
    WrappidLogger.error(error);
    WrappidLogger.error("----------------------------------------");
    throw error;
  }
};

const updateStringValue = async (databaseProvider: any, req: any) => {
  // var table = req.body.table;
  // var whereOb = {};
  // switch (table) {
  //   case "MasterData":
  //     whereOb = id ? { id } : { key: req.body.key, locale: req.body.locale };
  //     break;
  //   default:
  //     break;
  // }

  const result = await databaseProvider.application.sequelize.transaction(
    async (t: any) => {
      const stringValue = await databaseActions.findOne(
        "application",
        "StringValues",
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const [nrows, rows] = await databaseActions.update(
        "application",
        "StringValues",
        {
          _status: "inactive",
          updatedBy: req.user.userId,
        },
        {
          where: {
            id: req.params.id,
          },
        },
        { transaction: t }
      );
      WrappidLogger.info(`nrows=${nrows}`);
      WrappidLogger.info(`rows=${rows}`);
      WrappidLogger.info("Old data deactivated");

      const freshData = {
        // key: req.body.key,
        key: stringValue.key,
        value: req.body.value,
        locale: req.body.locale,
      };
      WrappidLogger.info(`BODY ${freshData}`);

      const data = await databaseActions.create(
        "application",
        "StringValues",
        {
          ...freshData,
          _status: "active",
          createdBy: req.user.userId,
          updatedBy: req.user.userId,
        },
        {
          transaction: t,
        }
      );
      WrappidLogger.info("New Data created");
      return data.id;
    }
  );
  WrappidLogger.info("Transaction commited");
  return result;
};

module.exports = { getFormSchema, updateStringValue };
