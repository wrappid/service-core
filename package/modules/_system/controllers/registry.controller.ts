import {Request, Response} from "express";
import { WrappidLogger } from "../../../logging/wrappid.logger";
import { getRegistryFunc, getRegistryListFunc } from "../functions/registry.function";

export const getRegistry = async (req: Request, res: Response) => {
  try{
    WrappidLogger.logFunctionStart("getRegistry");
    const data = await getRegistryFunc(req);
    const { status, ...restData } = data;
    res.status(status).json(restData);
  }catch(error:any){
    // console.error("Error:: ", error);
    WrappidLogger.error(error);
    res.status(500).json({ message: error.message });
  }                           
};
  
  
  
export const getRegistryList = async (req: Request, res: Response) => {
  try{
    const data = await getRegistryListFunc();
    console.log("##############");
    const { status, ...restData } = data;
    res.status(status).json(restData);
  }catch(error:any){
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }                           
};