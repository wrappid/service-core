import {Request, Response} from "express";
import { postCloneDataModelFunc, getDatabaseModelRowFunc, getModelsFunc, patchDatabaseModelFunc, putDatabaseModelFunc, putUpdateStatusFunc, getDatabaseModelsFunc, postDatabaseModelFunc, postDataModelSyncFunc } from "../functions/data.function";


export const getModels = async (req: Request, res: Response) => {
  try {
    const {status, ...resData} =  await getModelsFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};


export const getDatabaseModelRow = async (req: Request, res: Response) => {
  try {
    const {status, ...resData} =  await getDatabaseModelRowFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const postDatabaseModel = async ( req: Request, res: Response) =>{
  try {
    const {status, ...resData} = await postDatabaseModelFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({massage: "Faild to create data " + error.message});
    
  }
};


export const putDatabaseModel = async (req: Request, res: Response) => {
  try {
    const {status, ...resData} =  await putDatabaseModelFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};


export const putUpdateStatus = async (req: Request, res: Response) => {
  try {
    const {status, ...resData} =  await putUpdateStatusFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};


export const patchDatabaseModel = async (req: any, res: Response) => {
  try {
    const {status, ...resData} =  await patchDatabaseModelFunc(req);
    res.status(status).json(resData);
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getDatabaseModels = async (req: Request, res: Response) => {
  try {
    const result = await getDatabaseModelsFunc(req);
    const {status, ...resData} = result;
    res.status(status).json(resData);
  } catch (error:any) {
    console.log(error);
    res.status(500).json({message: error.message});
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
 * 
 * @param req 
 * @param res 
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
