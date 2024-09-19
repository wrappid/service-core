import { databaseActions, databaseProvider } from "../../../index";
import { WrappidLogger } from "../../../logging/wrappid.logger";

import { GenericObject } from "../../../types/generic.types";
import {
  auditAttributes,
  getColumnsFromSchema,
  getEntityOption,
  getEntitySchema,
  getFinalWhereClause,
  prepareOrderOB
} from "./businessEntity.helper";


/**
 * The get entity data count
 * 
 * @param dbName : dbName value
 * @param entityName : entityName value
 * @param query : query value
 * @returns
 */
const getEntityDataCount = async (
  dbName: string,
  entityName: string,
  query: any
) => {
  try {
    WrappidLogger.logFunctionEnd("getEntityDataCount");
    const schema = await getEntitySchema(entityName);
    if (!schema) {
      WrappidLogger.error("Entity is missing");
      throw new Error("Entity is missing");
    }

    const entityDatabaseName = dbName || "application"; // getRequiredDB(schema?.database || DB_CONST.RXEFY_DB);

    // eslint-disable-next-line no-unused-vars
    const { where, ...schemaOptions }: GenericObject = getEntityOption(
      entityDatabaseName,
      schema,
      query
    );
    let finalWhereOB = {};
    finalWhereOB = getFinalWhereClause(
      entityDatabaseName,
      schema,
      query?._defaultFilter,
      query?._searchValue
    );

    // order filter
    const orderOB = prepareOrderOB(entityDatabaseName, schema, query?._order);

    const _options: GenericObject = {
      benchmark: true,
      logging: console.log,
      ...schemaOptions,
    };

    if (Object.prototype.hasOwnProperty.call(schema, "raw")) {
      _options["raw"] = schema.raw;
    }
    if (Object.prototype.hasOwnProperty.call(schema, "nest")) {
      _options["nest"] = schema.nest;
    }

    if (finalWhereOB) {
      _options["where"] = finalWhereOB;
    }
    if (orderOB) {
      _options["order"] = orderOB;
    }

    if (schema?.attributes && schema?.attributes?.length > 0) {
      const tempAuditAttributes = auditAttributes.filter((value) =>
        /** @todo hard-coded database name */
        Object.keys(
          databaseProvider["application"].models[schema?.model]?.rawAttributes
        ).includes(value)
      );
      // if (schema?.model === "Users") {
      //   tempAuditAttributes = tempAuditAttributes.filter((auditAttribute) => {
      //     return (
      //       auditAttribute !== "createdBy" && auditAttribute !== "updatedBy"
      //     );
      //   });
      // }
      _options["attributes"] = [
        ...(schema?.attributes || []),
        ...tempAuditAttributes,
      ];
    }

    const count = await databaseProvider[entityDatabaseName].models[
      schema.model
    ].count(_options);

    return count;
  } catch (error: any) {
    WrappidLogger.error("-------------------------------------");
    WrappidLogger.error("getBusinessEntity.helper>getEntityData");
    WrappidLogger.error(error);
    WrappidLogger.error("-------------------------------------");
    throw error;
  }
};

const getEntityColumns = async (db: any, entityName: any) => {
  try {
    WrappidLogger.logFunctionStart("getEntityColumns");
    const schema: any = await getEntitySchema(entityName);
    if (!schema) {
      WrappidLogger.error("Entity is missing");
      throw new Error("Entity is missing");
    }

    return getColumnsFromSchema(db, schema);
  } catch (error: any) {
    WrappidLogger.error("-------------------------------------");
    WrappidLogger.error("getBusinessEntity.helper>getEntityData");
    WrappidLogger.error(error);
    WrappidLogger.error("-------------------------------------");
    throw error;
  }
};

/**
 * This is to get entity data name
 * 
 * @param db : db value
 * @param entityName : entityName value
 * @param query : query value
 * @returns
 */
const getEntityDataName = async (entityName: string, query: GenericObject) => {
  try {
    WrappidLogger.logFunctionStart("getEntityDataName");
    const db = "application";
    const schema = await getEntitySchema(entityName);
    if (!schema) {
      WrappidLogger.error("Entity is missing");
      throw new Error("Entity is missing");
    }

    const entityDatabaseName = /* schema?.database ||  */ "application";

    // eslint-disable-next-line no-unused-vars
    const { where, ...schemaOptions }: any = getEntityOption(
      entityDatabaseName,
      schema,
      query
    );
    let finalWhereOB = {};
    finalWhereOB = getFinalWhereClause(
      entityDatabaseName,
      schema,
      query?._defaultFilter,
      query?._searchValue
    );

    // order filter
    const orderOB = prepareOrderOB(entityDatabaseName, schema, query?._order);

    const _options = {
      benchmark: true,
      logging: console.log,
      ...schemaOptions,
    };

    if (Object.prototype.hasOwnProperty.call(schema, "raw")) {
      _options["raw"] = schema.raw;
    }
    if (Object.prototype.hasOwnProperty.call(schema, "nest")) {
      _options["nest"] = schema.nest;
    }

    if (finalWhereOB) {
      _options["where"] = finalWhereOB;
    }
    if (orderOB) {
      _options["order"] = orderOB;
    }

    if (schema?.attributes && schema?.attributes?.length > 0) {
      const tempAuditAttributes = auditAttributes.filter((value) =>
        Object.keys(
          databaseProvider[db].models[schema?.model]?.rawAttributes
        ).includes(value)
      );
      // if (schema?.model === "Users") {
      //   tempAuditAttributes = tempAuditAttributes.filter((auditAttribute) => {
      //     return (
      //       auditAttribute !== "createdBy" && auditAttribute !== "updatedBy"
      //     );
      //   });
      // }
      _options["attributes"] = [
        ...(schema?.attributes || []),
        ...tempAuditAttributes,
      ];
    }

    if (query?.offset) {
      _options["offset"] = query?.offset;
    }
    if (query?.limit) {
      _options["limit"] = query?.limit;
    }

    const columns = getColumnsFromSchema(entityDatabaseName, schema);
    const { count, rows } = await databaseActions.findAndCountAll(
      entityDatabaseName,
      schema?.model,
      _options
    );

    return { columns: columns, rows: rows, totalRecords: count };
  } catch (error: any) {
    WrappidLogger.error("-------------------------------------");
    WrappidLogger.error("getBusinessEntity.helper>getEntityData");
    WrappidLogger.error(error);
    WrappidLogger.error("-------------------------------------");
    console.log(error);
    throw error;
  }
};

/**
 * This function helps to get entity single data
 * 
 * @param entityDatabaseName : entityDatabaseName value
 * @param entityName : entityName value
 * @param query : query value
 * 
 * @returns
 */
const getIndivEntityData = async (
  entityDatabaseName: string,
  entityName: string,
  query: GenericObject
) => {
  WrappidLogger.logFunctionStart("getIndivEntityData");
  const schema = await getEntitySchema(entityName);
  if (!schema) {
    WrappidLogger.error("Entity is missing");
    throw new Error("Entity is missing");
  }

  // eslint-disable-next-line no-unused-vars
  const { where, ...schemaOptions }: any = getEntityOption(
    entityDatabaseName,
    schema,
    query
  );
  let finalWhereOB = {};
  finalWhereOB = getFinalWhereClause(
    entityDatabaseName,
    schema,
    query?._defaultFilter,
    query?._searchValue
  );

  const _options = {
    benchmark: true,
    logging: console.log,
    raw: Object.prototype.hasOwnProperty.call(schema, "raw")
      ? schema.raw
      : true,
    nest: Object.prototype.hasOwnProperty.call(schema, "nested")
      ? schema.nested
      : false,
    where: finalWhereOB,
    ...schemaOptions,
  };

  return await databaseActions.findOne(
    entityDatabaseName,
    schema?.model,
    _options
  );
};

// ---------------------------------------------------------------

export {
  getEntityColumns, getEntityDataCount, getEntityDataName, getEntitySchema, getIndivEntityData
};

