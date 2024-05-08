import { WrappidLogger } from "../logging/wrappid.logger";
import { getNormalCaseFromCamelCase } from "../utils/business.utilis";
import { databaseProvider } from "./setup.database";

const getDatabases = (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getDatabases");
    const searchValue = req.query._searchValue;
    const dataBases = databaseProvider;
    let searchedDatabase = Object.keys(dataBases);

    if (searchValue) {
      searchedDatabase = Object.keys(dataBases)?.filter((key) => {
        return key
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    }

    const _data = {
      rows: searchedDatabase.map((key) => {
        return { id: key, name: key };
      }),
      totalRecords: Object.keys(searchedDatabase).length,
    };
    res.status(200).json({
      data: _data,
      message: "Databses fetched successfully",
    });
  } catch (error: any) {
    WrappidLogger.error(error);
    res.status(500).json({ message: "Error to fetch databases" });
  }finally {
    WrappidLogger.logFunctionEnd("getDatabases");
  }
};
const getTables = (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getTables");
    // eslint-disable-next-line no-unused-vars
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
    WrappidLogger.logFunctionEnd("getTables");
  }
  
};
const getColumns = async (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getColumns");
    const database = req.params.database;
    const table = req.params.table;
    // eslint-disable-next-line no-unused-vars
    const _searchValue = req.query._searchValue;

    const requestedDBTables: any = Object.keys(databaseProvider[database].models);
    const rawAttributes = requestedDBTables[table]?.rawAttributes || {};

    const _data = {
      entity: table,
      rows: Object.keys(rawAttributes)
        ?.filter((key) => {
          return key
            .toLocaleLowerCase()
            .includes(_searchValue?.toLocaleLowerCase());
        })
        .map((key) => {
          // eslint-disable-next-line no-undef
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
  }finally {
    WrappidLogger.logFunctionEnd("getColumns");
  }
};

export { getColumns, getDatabases, getTables };

