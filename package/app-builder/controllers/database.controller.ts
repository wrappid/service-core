import { databaseProvider } from "../../database/provider.database";
import { getNormalCaseFromCamelCase } from "../utils/strings.utils";
import { getEntityColumns } from "../functions/businessEntity.get.helper";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getDatabaseTables = (req: any, res: any) => {
  try {
    // eslint-disable-next-line no-unused-vars
    let database = req.params.database;
    let requestedDBTables = databaseProvider.application.models;
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAttributes = async (req: any, res: any) => {
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
            .includes(req.query._searchValue?.toLocaleLowerCase());
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getBusinessEntityColumns = async (req: any, res: any) => {
  let entity = req.params.entity;

  console.log(`entity=${entity}`);
  try {
    if (!entity) {
      res.status(204).json({ data: 0, message: "No entity found" });
      return;
    }
    let db: any = "application";
    // eslint-disable-next-line no-undef
    let columns = await getEntityColumns(db, entity);

    res.status(200).json({
      data: columns,
      message: "Business entity columns found successfully",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

export { getDatabaseTables, getAttributes, getBusinessEntityColumns };
