import sequelize from "sequelize";
import { coreConstant, databaseActions, databaseProvider } from "../../../index";


// const entityStatus = coreConstant;
import { WrappidLogger } from "../../../logging/wrappid.logger";
import { GenericObject } from "../../../types/generic.types";
import whereConst from "../constants/whereConstants";
import { getNormalCaseFromCamelCase } from "../utils/strings.utils";

const auditAttributes = [
  "id",
  "_status",
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "deletedAt",
  "deletedBy",
];

/**
 * -------------------------------------
 * Get the schema from db
 * -------------------------------------
 *
 * @param {string} entityStr : entityStr value
 * @returns
 */
const getEntitySchema = async (entityStr: string) => {
  WrappidLogger.logFunctionStart("getEntitySchema");
  const businessEntitySchema = await databaseActions.findOne(
    "application",
    "BusinessEntitySchemas",
    {
      where: {
        name: entityStr,
        _status: coreConstant.entityStatus.PUBLISHED,
      },
    }
  );
  let EntitySchema =
    businessEntitySchema && businessEntitySchema.schema
      ? typeof businessEntitySchema.schema === "object"
        ? businessEntitySchema.schema
        : JSON.parse(businessEntitySchema.schema)
      : null;

  if (!EntitySchema) {
    if (databaseProvider.application.models[entityStr]) {
      EntitySchema = { model: entityStr };
    }
  }

  return EntitySchema;
};

/**
 * The total count of the rows based on the query generated
 *
 * @param db : db value
 * @param model : model value
 * @param schemaOptions : schemaOptions value
 * @returns
 */
const getTotalCount = async (db: string, model: string, schemaOptions: GenericObject) => {
  WrappidLogger.logFunctionStart("getTotalCount");
  let count = 0;
  try {
    const options = schemaOptions;
    // remove attributes
    delete options.attributes;

    count = await databaseProvider[db].models[model].count(options);
    return count;
  } catch (error:any) {
    WrappidLogger.error("-------businessEntityHelper>getTotalCount-------");
    WrappidLogger.error(error);
    WrappidLogger.error("------------------------------------------------");
    return count;
  }
};

/**
 * This function process recurrsive columns
 * 
 * @param dbName : dbName value
 * @param schema : schema value
 * @param preffix : preffix value
 * 
 * @returns
 */
function recurrsive_NestedColumns(dbName: string, schema: GenericObject, preffix = "") {
  WrappidLogger.logFunctionStart("recurrsive_NestedColumns");
  let columns: any = [];
  if (schema?.include) {
    schema?.include?.forEach((incSchema: any) => {
      const incSchemaAttr =
        databaseProvider[dbName].models[incSchema.model].rawAttributes;

      if (incSchema?.attributes) {
        incSchema?.attributes?.forEach((attr: any) => {
          const tmpID =
            (preffix ? preffix + "." : "") +
            (incSchema?.as || incSchema?.model) +
            "." +
            attr;
          columns.push({
            id: tmpID,
            label: getNormalCaseFromCamelCase(attr),
            type: incSchemaAttr[attr]?.type.toString() || "STRING",
          });
        });
      } else {
        Object.keys(incSchemaAttr)?.forEach((attrKey) => {
          /**
           * (preffix ? preffix + (preffix.includes(".") ? "" : ".") : "") + ((incSchema?.as || incSchema?.model) + ".") +
           */
          const tmpID =
            (preffix ? preffix + "." : "") +
            (incSchema?.as || incSchema?.model) +
            "." +
            attrKey;
          columns.push({
            id: tmpID,
            label: getNormalCaseFromCamelCase(attrKey),
            type: incSchemaAttr[attrKey]?.type.toString() || "STRING",
          });
        });
      }
      const tmpColumns = recurrsive_NestedColumns(
        dbName,
        incSchema,
        (preffix ? preffix + "." : "") + incSchema?.as || incSchema?.model
      );
      // console.log(
      //   `tmpColumns[${
      //     (preffix ? preffix + "." : "") + incSchema?.as || incSchema?.model
      //   }]==================================`
      // );
      // console.log(`==================================`);
      // console.log(tmpColumns);
      // console.log(`==================================`);
      columns = columns.concat(tmpColumns);
    });
  }
  // console.log(
  //   "+++++++++++++++++++++++++before return columns+++++++++++++++++++++++++"
  // );
  // console.log(columns);
  return columns;
}

/**
 * The columns array of the selected fields by default else all fields
 *
 * @param dbName : dbName value
 * @param schema : schema value
 * @returns
 */
const getColumnsFromSchema = (dbName: string, schema: GenericObject) => {
  WrappidLogger.logFunctionStart("getColumnsFromSchema");
  let columns: GenericObject[] = [];

  const schemaModelRawAttributes =
    databaseProvider[dbName].models[schema.model].rawAttributes;

  if (schema?.attributes) {
    schema?.attributes?.forEach((attr: any) => {
      columns.push({
        id: attr,
        label: getNormalCaseFromCamelCase(attr),
        type: schemaModelRawAttributes[attr].type.toString(),
      });
    });
  } else {
    Object.keys(schemaModelRawAttributes)?.forEach((attrKey) => {
      columns.push({
        id: attrKey,
        label: getNormalCaseFromCamelCase(attrKey),
        type: schemaModelRawAttributes[attrKey].type.toString(),
      });
    });
  }

  const tmpColumns = recurrsive_NestedColumns(dbName, schema);
  // console.log(`tmpColumns[${schema?.model}]==================================`);
  // console.log(tmpColumns);
  // console.log("tempColumns-------------------------");
  columns = columns.concat(tmpColumns);
  // console.log(columns);

  return columns;
};

/**
 * This function process column filter
 * 
 * @param _whereOB : _whereOB value
 * @param _attribute : _attribute value
 * @param _filterOB : _filterOB value
 * 
 * @returns
 */
function processColumnFilter(_whereOB: any, _attribute: any, _filterOB: any) {
  WrappidLogger.logFunctionStart("processColumnFilter");
  /**
     * 
      [Op.eq]: 3,                              // = 3 // Basics
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)
      [Op.col]: 'user.organization_id',        // = "user"."organization_id" // Using dialect specific column identifiers (PG in the following example):
      [Op.gt]: 6,                              // > 6 // Number comparisons
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15
      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1) // Other operators
      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]
      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)
      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat']) // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
    */
  const _where: any = {};
  const _attr = _attribute.substring(
    _attribute.lastIndexOf(".") + 1,
    _attribute.length
  );

  switch (_filterOB.conditionOP) {
    // common
    case whereConst.common.EQUALS:
      _where[_attr] = { [sequelize.Op.eq]: _filterOB?.value };
      break;
    case whereConst.common.NOT_EQUALS:
      _where[_attr] = { [sequelize.Op.ne]: _filterOB?.value };
      break;
    case whereConst.common.IS_EMPTY:
    case whereConst.common.IS_NULL:
      _where[_attr] = { [sequelize.Op.is]: null };
      break;
    case whereConst.common.IS_NOT_EMPTY:
    case whereConst.common.IS_NOT_NULL:
      _where[_attr] = { [sequelize.Op.not]: null };
      break;
    case whereConst.common.IS_ANY:
      _where[_attr] = { [sequelize.Op.in]: _filterOB?.value };
      break;
    case whereConst.common.IS_NOT_ANY:
      _where[_attr] = { [sequelize.Op.notIn]: _filterOB?.value };
      break;
    // string related
    case whereConst.string.CONTAINS:
      _where[_attr] = { [sequelize.Op.like]: `%${_filterOB?.value}%` };
      break;
    case whereConst.string.STARTS_WITH:
      _where[_attr] = { [sequelize.Op.startsWith]: _filterOB?.value };
      break;
    case whereConst.string.ENDS_WITH:
      _where[_attr] = { [sequelize.Op.endsWith]: _filterOB?.value };
      break;
    case whereConst.string.NOT_CONTAINS:
      _where[_attr] = { [sequelize.Op.notLike]: `%${_filterOB?.value}%` };
      break;
    case whereConst.string.NOT_STARTS_WITH:
      _where[_attr] = { [sequelize.Op.notLike]: `${_filterOB?.value}%` };
      break;
    case whereConst.string.NOT_ENDS_WITH:
      _where[_attr] = { [sequelize.Op.notLike]: `%${_filterOB?.value}` };
      break;
    // number related
    case whereConst.number.GREATER_THAN:
      _where[_attr] = { [sequelize.Op.gt]: _filterOB?.value };
      break;
    case whereConst.number.LESSER_THAN:
      _where[_attr] = { [sequelize.Op.lt]: _filterOB?.value };
      break;
    case whereConst.number.GREATER_THAN_EQUALS:
      _where[_attr] = { [sequelize.Op.gte]: _filterOB?.value };
      break;
    case whereConst.number.LESSER_THAN_EQUALS:
      _where[_attr] = { [sequelize.Op.lte]: _filterOB?.value };
      break;
    case "Op.between":
    case "Op.notBetween":
    case "Op.in":
    case "Op.notIn":
    case "Op.iLike":
    case "Op.notILike":
    case "Op.regexp":
    case "Op.notRegexp":
    case "Op.iRegexp":
    case "Op.notIRegexp":
    case "Op.any":
    case "Op.match":
    default:
      break;
  }

  if (_where) {
    switch (_filterOB?.whereOP) {
      case "OR":
        _whereOB[sequelize.Op.or] = _where;
        break;
      case "AND":
        _whereOB = { ..._whereOB, ..._where };
        break;
      default:
        _whereOB = { ..._whereOB, ..._where };
        break;
    }
  }
  WrappidLogger.info("---------------_whereOB---------------");
  WrappidLogger.info(_whereOB);
  WrappidLogger.info("--------------------------------------");
  return _whereOB;
}

/**
 * This function helps us to process recurrsive business entity where clauses
 * 
 * @param dbName : dbName value
 * @param schema : schema value
 * @param where : where value
 * 
 * @returns
 */
function recurrsive_BusinessEntityWhere(dbName: any, schema: any, where: any) {
  WrappidLogger.logFunctionStart("recurrsive_BusinessEntityWhere");
  const whereSchema: any = where || {};
  const whereOB: any = {};
  Object.keys(whereSchema).forEach((whereKey: any) => {
    if (["and", "or"].includes(whereKey)) {
      whereOB[sequelize.Op[whereKey as keyof typeof sequelize.Op]] =
        recurrsive_BusinessEntityWhere(dbName, schema, whereSchema[whereKey]);
    } else {
      // it's an attribute
      // check if it belongs to models
      const columns: any = getColumnsFromSchema(dbName, schema).map(
        (col: any) => {
          return col.id;
        }
      );
      if (
        columns &&
        columns.filter((column: any) => {
          return whereKey.includes(column);
        }).length > 0
      ) {
        // valid attribute
        const whereVal = whereSchema[whereKey];
        if (typeof whereVal === "object") {
          const opList = Object.keys(sequelize.Op).filter((opKey) => {
            return !["and", "or"].includes(opKey);
          });
          const operator: any = Object.keys(whereVal)[0];
          const value = whereVal[operator];
          if (opList.includes(operator)) {
            whereOB[whereKey] = {
              [sequelize.Op[operator as keyof typeof sequelize.Op]]: value,
            };
          }
        } else {
          if (whereKey.includes(".")) {
            whereOB["$" + whereKey + "$"] = whereVal;
          } else {
            whereOB[whereKey] = whereVal;
          }
        }
      }
    }
  });
  return whereOB;
}

/**
 * This func is helps to process business entity where clause
 *
 * Sample JSON:
 * {
 *    // root level
 *    "column1": "value1",
 *    "column2": {
 *        "like": "value2"
 *    },
 *    "and/or": [
 *        // one level
 *        "Table1.column3": {
 *            "eq": "value3"
 *        },
 *        // n-level
 *        "Table1.Table2.column4": {
 *            "eq": "value4"
 *        }
 *    ]
 * }
 *
 * @param db : db value
 * @param schema : schema value
 * 
 * @returns
 */
function prepareBusinessEntityWhere(db: string, schema: GenericObject) {
  WrappidLogger.logFunctionStart("prepareBusinessEntityWhere");
  const whereSchema = schema?.where || {};
  let whereOB = {};
  const rootModel = schema?.model;
  if (rootModel) {
    whereOB = recurrsive_BusinessEntityWhere(db, schema, whereSchema);
  }
  return whereOB;
}

/**
 * return: where clause generated with the below fields
 *    default: attributes and _searchValue
 *    else: rawAttributes of the model and _searchValue
 *
 * @param db : db value
 * @param model : model value
 * @param attributes : attributes value
 * @param whereKeys : whereKeys value
 * @param attributeSuffix : attributeSuffix value
 * @param _searchValue : _searchValue value
 * @returns
 */
function prepareGeneralSearchWhereOB(
  db: string,
  model: string,
  attributes: string[],
  whereKeys: string[],
  attributeSuffix: string,
  _searchValue: any
) {
  WrappidLogger.logFunctionStart("prepareGeneralSearchWhereOB");
  const whereOB: GenericObject = {};
  _searchValue = decodeURIComponent(_searchValue).toString();
  if (_searchValue) {
    const rawAttributes = databaseProvider[db].models[model].rawAttributes;
    const selectedAttributes = attributes || Object.keys(rawAttributes);

    selectedAttributes?.forEach((attr: string) => {
      if (whereKeys.includes(attr) && auditAttributes.includes(attr)) {
        return;
      }
      if (
        /* isNaN(_searchValue) && */
        rawAttributes[attr].type.toString().startsWith("STRING") ||
        rawAttributes[attr].type.toString().startsWith("TEXT") ||
        rawAttributes[attr].type.toString().startsWith("CHAR") ||
        rawAttributes[attr].type.toString().startsWith("VARCHAR")
        /*  ||(!isNaN(_searchValue) &&
          (rawAttributes[attr].type.toString().startsWith("INT") ||
            rawAttributes[attr].type.toString().endsWith("INT"))) */
      ) {
        if (!auditAttributes.includes(attr)) {
          whereOB[
            "$" + (attributeSuffix ? attributeSuffix + "." : "") + attr + "$"
          ] = {
            [sequelize.Op.iLike]: `%${_searchValue}%`,
          };
        }
        return;
      }
    });
  }
  return whereOB;
}

/**
 * This function prepares nested search where object
 *
 * @param db : db value
 * @param model : model value
 * @param incSchemas : incSchemas value
 * @param attributeSuffix : attributeSuffix value
 * @param _searchValue : _searchValue value
 * 
 * @returns
 */
function nestedSearchWhereOB(
  db: any,
  model: any,
  incSchemas: any,
  attributeSuffix: any,
  _searchValue: any
) {
  WrappidLogger.logFunctionStart("nestedSearchWhereOB");
  let whereOB = {};
  if (incSchemas && Array.isArray(incSchemas) && incSchemas?.length > 0) {
    incSchemas.forEach((incSchema) => {
      let tempModelAs = incSchema?.as || "";
      Object.keys(databaseProvider[db].models[model].associations).forEach(
        (_o) => {
          if (
            databaseProvider[db].models[model].associations[_o].target
              .tableName === incSchema.model
          ) {
            tempModelAs = _o;
          }
        }
      );
      attributeSuffix = /* attributeSuffix
        ? attributeSuffix + "." + tempModelAs
        :  */ tempModelAs;
      whereOB = {
        ...whereOB,
        ...prepareGeneralSearchWhereOB(
          db,
          incSchema.model,
          incSchema.attributes,
          Object.keys(incSchema?.where || {}),
          attributeSuffix,
          _searchValue
        ),
        ...nestedSearchWhereOB(
          db,
          incSchema?.model,
          incSchema?.include,
          attributeSuffix,
          _searchValue
        ),
      };
    });
  }
  return whereOB;
}

/**
 * This functions prepares search where object
 *
 * @param db : db value
 * @param _schema : _schema value
 * @param _orderQuery : _orderQuery value
 * @param _searchValue : _searchValue value
 * 
 * @returns
 */
function prepareSearchWhereOB(db: string, _schema: GenericObject, _searchValue: any) {
  WrappidLogger.logFunctionStart("prepareSearchWhereOB");
  let whereOB = {};
  if (_searchValue) {
    // for root model
    const rootWhereOB = prepareGeneralSearchWhereOB(
      db,
      _schema.model,
      _schema.attributes,
      Object.keys(_schema?.where || {}),
      null,
      _searchValue
    );
    // for nested included models
    const nestedWhereOB = nestedSearchWhereOB(
      db,
      _schema?.model,
      _schema?.include,
      null,
      _searchValue
    );

    whereOB = {
      // for root models
      ...rootWhereOB,
      // for nested included models
      ...nestedWhereOB,
    };
  }

  return whereOB;
}

/**
 * This function helps to prepare where clause
 *
 * @param db : db value
 * @param _schema : _schema value
 * @param _filterQuery : _filterQuery value
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function prepareWhereOB(db: string, _schema: GenericObject, _filterQuery: any) {
  WrappidLogger.logFunctionStart("prepareWhereOB");
  let whereOB = _schema?.where || {};
  if (_filterQuery) {
    const modelAttr = Object.keys(
      databaseProvider[db].models[_schema.model].rawAttributes
    );
    const filterQuery = JSON.parse(_filterQuery);
    if (filterQuery) {
      WrappidLogger.info("---------------filterQuery---------------");
      WrappidLogger.info(filterQuery);
      WrappidLogger.info("-----------------------------------------");

      Object.keys(filterQuery?.query).forEach((_eachFilter) => {
        if (
          modelAttr.includes(
            _eachFilter.substring(
              _eachFilter.lastIndexOf(".") + 1,
              _eachFilter.length
            )
          )
        ) {
          whereOB = processColumnFilter(
            whereOB,
            _eachFilter,
            filterQuery?.query[_eachFilter]
          );
        }
      });
    }
  }
  return whereOB;
}

/**
 * This function process nested model order
 * @param db : db value
 * @param parentModel : parentModel value
 * @param _incSchema : _incSchema value
 * @param orderQuery : orderQuery value
 */
// eslint-disable-next-line no-unused-vars
function processNestedModelOrder(
  db: string,
  parentModel: string,
  _incSchema: GenericObject,
  orderQuery: any
) {
  WrappidLogger.logFunctionStart("processNestedModelOrder");
  Object.keys(orderQuery).forEach((_eachOrder) => {
    if (_eachOrder.includes(".")) {
      // if included model attribute
    }
  });
}

/**
 * This function prepare order object
 * 
 * @todo
 * one level nested data order by is working
 * more than one level not working
 *
 * @param db : db value
 * @param schema : schema value
 * @param orderQuery : orderQuery value
 * @returns
 */
const prepareOrderOB = (db: string, schema: GenericObject, orderQuery: any) => {
  try {
    WrappidLogger.logFunctionStart("prepareOrderOB");
    const orderOB: any = [];

    /**
     * Schema based order
     */
    if (schema && schema?.order) {
      schema?.order?.forEach((eachOrder: any) => {
        orderOB.push([sequelize.literal(`"${eachOrder[0]}"`), eachOrder[1]]);
      });
    }
    /**
     * Query based order
     */
    if (orderQuery) {
      orderQuery = JSON.parse(orderQuery);
      if (orderQuery) {
        WrappidLogger.info("---------------orderQuery---------------");
        WrappidLogger.info(orderQuery);
        WrappidLogger.info("-----------------------------------------");
        /**
         * proceess loop on requested order cause it's less
         */
        Object.keys(orderQuery).forEach((eachOrderQuery) => {
          // if it's exist
          if (
            /**
             * @todo
             *
             * 1. check if the eachOrderQuery
             * includes in (root / nested) schema(s) attributes
             * if schema(s) attributes were present
             * else check with the column names
             * 2.
             */
            // eslint-disable-next-line no-constant-condition
            true
          ) {
            orderOB.push([
              sequelize.literal(`"${eachOrderQuery}"`),
              orderQuery[eachOrderQuery],
            ]);
          }
        });
      }
    }
    return orderOB;
  } catch (error:any) {
    WrappidLogger.error("-------------------------------------");
    WrappidLogger.error("getBusinessEntity.helper>prepareOrderOB");
    WrappidLogger.error(error);
    WrappidLogger.error("-------------------------------------");
    throw error;
  }
};

/**
 * Recursive function to prepare model options
 * @param databaseName | holds database name
 * @param {*} schema | holds business entity schema
 * @param {*} query | holds query params
 * @returns
 */
const getEntityOption = (databaseName: string, schema: GenericObject, query: any) => {
  try {
    WrappidLogger.logFunctionStart("getEntityOption");
    const model = schema?.model;
    if (!schema?.model) {
      WrappidLogger.info("Schema invalid model string");
      throw new Error("Schema invalid model string");
    }
    if (!databaseProvider.application.models[model]) {
      WrappidLogger.error("Schema invalid model");
      throw new Error("Schema invalid model");
    }
    const includeOB: any = [];
    schema?.include?.forEach((schema: any) => {
      includeOB.push(getEntityOption(databaseName, schema, query));
    });

    const options: any = {
      model: databaseProvider.application.models[model],
      as: schema?.as,
      include: includeOB || [],
    };

    if (Object.prototype.hasOwnProperty.call(schema, "required")) {
      options["required"] = schema.required;
    }
    if (Object.prototype.hasOwnProperty.call(schema, "right")) {
      options["right"] = schema.right;
    }

    if (schema?.attributes && schema?.attributes?.length > 0) {
      const tempAuditAttributes = auditAttributes.filter((value) =>
        Object.keys(
          databaseProvider.application.models[model].rawAttributes
        ).includes(value)
      );
      options["attributes"] = [
        ...(schema?.attributes || []),
        ...tempAuditAttributes,
      ];
    }

    /**
     * Add sequelize function attribute
     */

    if (
      schema?.where &&
      typeof schema?.where === "object" &&
      Object.keys(schema?.where).length > 0
    ) {
      options["where"] = recurrsive_BusinessEntityWhere(
        databaseName,
        schema,
        schema.where
      );
    }

    return options;
  } catch (error:any) {
    WrappidLogger.error("-------------------------------------");
    WrappidLogger.error("getBusinessEntity.helper>getEntityOption");
    WrappidLogger.error(error);
    WrappidLogger.error("-------------------------------------");
    throw error;
  }
};

/**
 * This function helps to get final where clause
 * 
 * @param db : db value 
 * @param schema : schema value 
 * @param defaultFilterQuery : defaultFilterQuery value 
 * @param searchValue : searchValue value
 *  
 * @returns 
 */
const getFinalWhereClause = (
  db: string,
  schema: GenericObject,
  defaultFilterQuery: any,
  searchValue: any
) => {
  WrappidLogger.logFunctionStart("getFinalWhereClause");
  let finalWhereOB: any = {};

  const defaultFilterOB = defaultFilterQuery
    ? JSON.parse(defaultFilterQuery)
    : {};
  let defaultFilterWhereOB = {};
  if (defaultFilterOB && Object.keys(defaultFilterOB).length > 0) {
    defaultFilterWhereOB = recurrsive_BusinessEntityWhere(
      db,
      schema,
      defaultFilterOB
    );
    // Object.keys(defaultFilterOB).forEach((defaultEachFilter) => {
    //   if (
    //     defaultEachFilter.endsWith("createdAt") ||
    //     defaultEachFilter.endsWith("updatedAt")
    //   ) {
    //     // timestamp
    //     defaultFilterWhereOB["$" + defaultEachFilter + "$"] = {
    //       [sequelize.Op.gte]: sequelize.literal(
    //         "DATE('" + defaultFilterOB[defaultEachFilter] + "')"
    //       ),
    //     };
    //   } else {
    //     // not timestamp
    //     if (defaultFilterOB[defaultEachFilter] === "") {
    //       // is null
    //       defaultFilterWhereOB["$" + defaultEachFilter + "$"] = {
    //         [sequelize.Op.is]: null,
    //       };
    //     } else {
    //       // value
    //       defaultFilterWhereOB["$" + defaultEachFilter + "$"] =
    //         defaultFilterOB[defaultEachFilter];
    //     }
    //   }
    // });
  }

  // schema filter
  finalWhereOB = prepareBusinessEntityWhere(db, schema) || {};
  /**
   * default filter
   * @todo check where keys are valid or not
   */
  if (defaultFilterWhereOB) {
    finalWhereOB[sequelize.Op.and] = defaultFilterWhereOB;
  }

  // search filter
  const whereOB = prepareSearchWhereOB(db, schema, searchValue);
  if (whereOB && Object.keys(whereOB)?.length > 0) {
    finalWhereOB[sequelize.Op.or] = whereOB;
  }
  return finalWhereOB;
};

// ---------------------------------------------------------------

export {
  auditAttributes, getColumnsFromSchema, getEntityOption, getEntitySchema, getFinalWhereClause, getTotalCount, prepareOrderOB
};

