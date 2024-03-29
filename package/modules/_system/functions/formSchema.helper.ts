import { coreConstant , databaseProvider , databaseActions } from "../../../index";

// const { httpMethod, entityStatus } = coreConstant;
import { getEntitySchema, getColumnsFromSchema } from "./businessEntity.helper";

const auditAttributes = [
  "id",
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "deletedAt",
  "deletedBy",
];

function getFieldType(attributeType: any) {
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
  } catch (error) {
    console.error("----------------------------------------");
    console.error("formSchema.helper>getFieldType");
    console.error(error);
    console.error("----------------------------------------");
    throw error;
  }
}

async function generateFormSchema(modelName: any) {
  try {
    /**
     * @todo check if present in business entity
     */

    const schema = await getEntitySchema(modelName);
    let fieldsData = [];
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
  } catch (error) {
    console.error("----------------------------------------");
    console.error("formSchema.helper>generateFormSchemaFromTableAttributes");
    console.error(error);
    console.error("----------------------------------------");
    throw error;
  }
}

/**
 *
 * @param {*} dbName
 * @param {*} formID
 */
async function getFormSchemaFromDB(formID: any, auth: any) {
  try {
    const dbName = "application";
    const dbSequelize = databaseProvider[dbName].Sequelize;
    const whereClause: any = {
      formID: formID,
      _status: coreConstant.entityStatus.PUBLISHED,
    };
    if (auth) {
      whereClause["authRequired"] = true;
    } else  {
      whereClause["authRequired"] = {
        [dbSequelize.Op.or]: {
          [dbSequelize.Op.eq]: false,
          [dbSequelize.Op.is]: null,
        },
      };
    }

    const formSchema = await databaseActions.findOne(dbName, "FormSchemas", {
      where: whereClause,
    });
    return formSchema;
  } catch (error) {
    console.error("----------------------------------------");
    console.error("formSchema.helper>getFormSchema");
    console.error(error);
    console.error("----------------------------------------");
    throw error;
  }
}

/**
 *
 * @param {*} dbName
 * @param {*} formID
 */
export const getFormSchema = async (formID: any, auth = true) => {
  try {
    let formSchema = await getFormSchemaFromDB(formID, auth);
    if (!formSchema && auth) {
      formSchema = generateFormSchema(formID);
    }
    return formSchema;
  } catch (error) {
    console.error("----------------------------------------");
    console.error("formSchema.helper>getFormSchema");
    console.error(error);
    console.error("----------------------------------------");
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
      console.log(`nrows=${nrows}`);
      console.log(`rows=${rows}`);
      console.log("Old data deactivated");

      const freshData = {
        // key: req.body.key,
        key: stringValue.key,
        value: req.body.value,
        locale: req.body.locale,
      };
      console.log("BODY", freshData);

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
      console.log("New Data created");
      return data.id;
    }
  );
  console.log("Transaction commited");
  return result;
};

module.exports = { getFormSchema, updateStringValue };
