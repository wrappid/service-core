import { databaseProvider } from "./provider.database";

const getDatabases = (req: any, res: any) => {
  try {
    let searchValue = req.query._searchValue;
    let dataBases = databaseProvider;
    let searchedDatabase = Object.keys(dataBases);

    if (searchValue) {
      searchedDatabase = Object.keys(dataBases)?.filter((key) => {
        return key
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    }

    let _data = {
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
    console.error(error);
    res.status(500).json({ message: "Error to fetch databases" });
  }
};
const getTables = (req: any, res: any) => {
  try {
    // eslint-disable-next-line no-unused-vars
    let database = req.params.database;
    let requestedDBTables = databaseProvider[database].models;
    let searchValue = req.query._searchValue;

    let searchedTables = Object.keys(requestedDBTables);

    if (searchValue) {
      searchedTables = Object.keys(requestedDBTables)?.filter((key) => {
        return key
          .toLocaleLowerCase()
          .includes(searchValue?.toLocaleLowerCase());
      });
    }

    let _data = {
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
    console.error(error);
    res.status(500).json({ message: "Error to fetch tables" });
  }
};
const getColumns = async (req: any, res: any) => {
  try {
    let database = req.params.database;
    let table = req.params.table;
    // eslint-disable-next-line no-unused-vars
    let _searchValue = req.query._searchValue;

    let requestedDBTables: any = Object.keys(databaseProvider[database].models);
    let rawAttributes = requestedDBTables[table]?.rawAttributes || {};

    let _data = {
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
    console.error(error);
    res.status(500).json({ message: "Error to fetch attributes" });
  }
};

const getNormalCaseFromCamelCase = (camelCase: any) => {
  const result = camelCase.replace(/([A-Z])/g, " $1");
  const normalCase = result.charAt(0).toUpperCase() + result.slice(1);
  return normalCase;
};
export { getDatabases, getTables, getColumns };
