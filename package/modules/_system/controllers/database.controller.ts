import { databaseProvider } from "../../../database/provider.database";
import { getEntityColumns } from "../functions/businessEntity.get.helper";
import { getNormalCaseFromCamelCase } from "../utils/strings.utils";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getDatabaseTables = (req: any, res: any) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const database = req.params.database;
    const requestedDBTables = databaseProvider.application.models;
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
  const entity = req.params.entity;

  console.log(`entity=${entity}`);
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
    console.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

export { getDatabaseTables, getAttributes, getBusinessEntityColumns };
