import { databaseActions } from "../../../database/actions.database";
import {
  getEntityDataName,
  getEntityDataCount,
  getIndivEntityData,
} from "../functions/businessEntity.get.helper";

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getBusinessEntities = async (req: any, res: any) => {
  try {
    const data: any = await databaseActions.findAll(
      "application",
      "BusinessEntitySchemas",
      {
        where: { _status: "published" },
      }
    );

    if (!data || data.length === 0) {
      res.status(204).json({ message: "Business entities missing" });
      return;
    }

    res.status(200).json({
      data: {
        rows: data,
        totalRecords: data,
      },
      message: "Business entities found successfully",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getEntityData = async (req: any, res: any) => {
  const entity = req.params.entity;

  console.log(`entity=${entity}`);
  try {
    if (!entity) {
      res.status(204).json({ message: "No data found for entity" });
      return;
    }

    const data = await getEntityDataCount(databaseActions, entity, req.query);

    if (!data || data.length === 0) {
      res.status(204).json({ message: "Entity is missing" });
      return;
    }

    res.status(200).json({
      data: {
        count: data,
        entity: entity,
      },
      message: "Entity data found successfully",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getIndividualEntityData = async (req: any, res: any) => {
  const entity = req.params.entity;

  console.log(`entity=${entity}`);
  try {
    if (!entity) {
      res.status(204).json({ message: "Entity not found on the request" });
      return;
    }

    const data = await getIndivEntityData("application", entity, req.query);

    if (!data) {
      res
        .status(204)
        .json({ message: "Entity[" + entity + "] data not found" });
      return;
    }

    res.status(200).json({
      message: "Entity data found successfully",
      data: {
        data: data,
        entity: entity,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllEntityData = async (req: any, res: any) => {
  const entity = req.params.entity;

  console.log(`entity=${entity}`);
  try {
    if (!entity) {
      res
        .status(204)
        .json({ message: "You are requested for undefined business entity." });
      return;
    }

    const data: any = await getEntityDataName(entity, req.query);

    if (!data || data.length === 0) {
      res.status(204).json({ message: "Entity is missing" });
      return;
    }

    res.status(200).json({
      message: "Entity data found successfully",
      data: {
        entity: entity,
        ...data,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const noAuthGetAllEntityData = async (req: any, res: any) => {
  const entity = req.params.entity;

  console.log(`entity=${entity}`);

  try {

    const data: any = await getEntityDataName(entity, req.query);

    if (!data || data.length === 0) {
      res.status(204).json({ message: "No data found for entity" });
      return;
    }

    res.status(200).json({
      message: "Entity data found successfully",
      data: {
        entity: entity,
        ...data,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

export {
  getBusinessEntities,
  getEntityData,
  getIndividualEntityData,
  getAllEntityData,
  noAuthGetAllEntityData,
};
