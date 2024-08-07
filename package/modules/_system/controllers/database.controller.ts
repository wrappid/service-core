import { databaseProvider } from "../../../database/setup.database";
import { WrappidLogger } from "../../../logging/wrappid.logger";
import { getEntityColumns } from "../functions/businessEntity.get.helper";
import { getNormalCaseFromCamelCase } from "../utils/strings.utils";


/**
 * This function helps to get databases
 *
 * @param req : req value
 * @param res : res value
 * @returns
 */
export const getDatabases =  (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getDatabases");
    const databases = Object.keys(databaseProvider);
    const searchValue = req.query._searchValue;
    const searchedDatabases = databases.filter(
      (database) => database.toLowerCase().startsWith(searchValue)
    );

    const _data = {
      rows: searchedDatabases.map((key) => {
        return { id: key, label: key };
      }),
      totalRecords: Object.keys(searchedDatabases).length,
    };

    res.status(200).json({
      data: _data,
      message: "Databases fetched successfully",
    });
  } catch (error: any) {
    WrappidLogger.error(error);
    res.status(500).json({ message: "Error to fetch databases" });
  } finally {
    WrappidLogger.logFunctionEnd("getDatabases");
  }
};

/**
 * This function helps to get database tables
 *
 * @param req : req value
 * @param res : res value
 * @returns
 */
const getDatabaseTables = (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getDatabaseTables");
    const database = req.params.database;
    const requestedDBTables = databaseProvider[database].models;
    const searchValue = req.query._searchValue;

    let searchedTables = Object.keys(requestedDBTables);

    if (searchValue) {
      searchedTables = Object.keys(requestedDBTables)?.filter((key) => {
        return key
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    }

    const _data = {
      rows: searchedTables.map((key) => {
        return { id: key, name: key };
      }),
      totalRecords: Object.keys(searchedTables).length,
    };

    res.status(200).json({
      data: _data,
      message: "Tables fetched successfully",
    });
  } catch (error: any) {
    WrappidLogger.error(error);
    res.status(500).json({ message: "Error to fetch tables" });
  } finally {
    WrappidLogger.logFunctionEnd("getDatabaseTables");
  }
};

/**
 * This function helps to get table attributes
 *
 * @param req : req value
 * @param res : res value
 * @returns
 */
const getAttributes = async (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getAttributes");
    const database = req.params.database;
    const table = req.params.table;
    // eslint-disable-next-line no-unused-vars
    const _searchValue = req.query?._searchValue || "";

    const rawAttributes = databaseProvider[database].models[table]?.rawAttributes || {};

    const _data = {
      entity: table,
      rows: Object.keys(rawAttributes)
        ?.filter((key) => {
          return key
            .toLocaleLowerCase()
            .includes(_searchValue?.toLocaleLowerCase());
        })
        .map((key) => {
          return { id: key, name: getNormalCaseFromCamelCase(key) };
        }),
      totalRecords: Object.keys(rawAttributes).length,
    };

    res.status(200).json({
      data: _data,
      message: "Attributes fetched successfully",
    });
  } catch (error: any) {
    WrappidLogger.error(error);
    res.status(500).json({ message: "Error to fetch attributes" });
  } finally {
    WrappidLogger.logFunctionEnd("getAttributes");
  }
};

/**
 * This function helps to get business entity columns
 * 
 * @param req : req value
 * @param res : res value
 * @returns
 */
const getBusinessEntityColumns = async (req: any, res: any) => {
  WrappidLogger.logFunctionStart("getBusinessEntityColumns");
  const entity = req.params.entity;

  console.log(`entity=${entity}`);
  WrappidLogger.info(`entity=${entity}`);
  try {
    if (!entity) {
      res.status(204).json({ data: 0, message: "No entity found" });
      return;
    }
    const db: any = "application";
    // eslint-disable-next-line no-undef
    const columns = await getEntityColumns(db, entity);

    res.status(200).json({
      data: columns,
      message: "Business entity columns found successfully",
    });
  } catch (error: any) {
    WrappidLogger.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  } finally {
    WrappidLogger.logFunctionEnd("getBusinessEntityColumns");
  }
};

export { getAttributes, getBusinessEntityColumns, getDatabaseTables };