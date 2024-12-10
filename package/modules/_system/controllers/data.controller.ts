import { Request, Response } from "express";
import { WrappidLogger } from "../../../logging/wrappid.logger";
import { createBulkData, getDatabaseModelRowFunc, getDatabaseModelsFunc, getMetaDatas, getModelsFunc, patchDatabaseModelFunc, postCloneDataModelFunc, postDataModelSyncFunc, postDatabaseModelFunc, putDatabaseModelFunc, putUpdateStatusFunc, updateMetaData } from "../functions/data.function";


export const getModels = async (req: Request, res: Response) => {
  try {
    WrappidLogger.logFunctionStart("getModels");
    const {status, ...resData} =  await getModelsFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    console.error("Error :: ", error);
    WrappidLogger.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getDatabaseModelRow = async (req: Request, res: Response) => {
  try {
    WrappidLogger.logFunctionStart("getDatabaseModelRow");
    const {status, ...resData} =  await getDatabaseModelRowFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    WrappidLogger.error(error);
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const postDatabaseModel = async ( req: Request, res: Response) =>{
  try {
    const {status, ...resData} = await postDatabaseModelFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    WrappidLogger.error(error);
    // console.error("Error :: ", error);
    res.status(500).json({massage: "Faild to create data " + error.message});
    
  }
};


export const putDatabaseModel = async (req: Request, res: Response) => {
  try {
    WrappidLogger.logFunctionStart("putDatabaseModel");
    const {status, ...resData} =  await putDatabaseModelFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    // console.error("Error :: ", error);
    WrappidLogger.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const putUpdateStatus = async (req: Request, res: Response) => {
  try {
    WrappidLogger.logFunctionStart("putUpdateStatus");
    const {status, ...resData} =  await putUpdateStatusFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    // console.error("Error :: ", error);
    WrappidLogger.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const patchDatabaseModel = async (req: any, res: Response) => {
  try {
    WrappidLogger.logFunctionStart("patchDatabaseModel");
    const {status, ...resData} =  await patchDatabaseModelFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    // console.error("Error :: ", error);
    WrappidLogger.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getModelsData = async (req: Request, res: Response) => {
  try {
    WrappidLogger.logFunctionStart("getModelsData");
    const result = await getDatabaseModelsFunc(req);
    const {status, ...resData} = result;
    res.status(status).json(resData);
  } catch (error:any) {
    // console.log("Error:: " error);
    WrappidLogger.error(error);
    res.status(500).json({message: error.message});
  }finally{
    WrappidLogger.logFunctionEnd("getModelsData");
  }
};




export const postDataModelSync = async (req: Request, res: Response) => {
  try {
    const result = await postDataModelSyncFunc(req);
    const {status, ...resData} = result;
    res.status(status).json(resData);
  } catch (error:any) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
};

/**
 * This function helps to clone model data
 * 
 * @param req : req value
 * @param res : res value
 */
export const postCloneDataModel = async (req: Request, res: Response) => {
  try {
    const result = await postCloneDataModelFunc(req);
    const {status, ...resData} = result;
    res.status(status).json(resData);
  } catch (error:any) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
};


/**
 * This function helps to create bulk data in meta table
 * @param req : Request
 * @param res : Response
 */
export const createMeataController = async (req:any, res:any) => {
  try {
    WrappidLogger.logFunctionStart("createMeataController");
    const tableName:string = req.params.tableName;
    const parentID = Number(req.params.parentID);
    const bodyData = req.body;
    const {status, ...resData} = await createBulkData(tableName, parentID, bodyData);
    res.status(status).json(resData);
  } catch (error:any) {
    WrappidLogger.error(error);
    res.status(500).json({ message: error.message });
  }finally{
    WrappidLogger.logFunctionEnd("createMeataController");
  }
};

/**
 * This function helps to get meta data
 * @param req : Req
 * @param res : Res
 */
export const getMetaController = async(req:any, res:any) => {
  try {
    WrappidLogger.logFunctionStart("getMetaController");
    const tableName:string = req.params.tableName;
    const parentID = Number(req.params.parentID);
    const {status, ...resData} = await getMetaDatas(tableName, parentID);
    res.status(status).json(resData);
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("getMetaController");
  }
};

/**
 * This function helps to update meta data
 * @param req :
 * @param res :
 */
export const updateMeataController = async(req:any, res:any) => {
  try {
    WrappidLogger.logFunctionStart("updateMeataController");
    
    const tableName:string = req.params.tableName;
    const parentID = Number(req.params.parentID);
    const bodyData = req.body;
    const {status, ...resData} = await updateMetaData(tableName, parentID, bodyData);
    res.status(status).json(resData);
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("updateMeataController");
  }
};

