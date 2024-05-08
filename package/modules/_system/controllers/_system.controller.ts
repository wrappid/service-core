import {Request, Response} from "express";
import { WrappidLogger } from "../../../logging/wrappid.logger";
import { getMasterDataFunc, getSettingMetaFunc, postTestCommunicationFunc } from "../functions/_system.function";

export const getVersion = async (req: Request, res: Response) => {
  try {
    /**
     * @todo
     * get version logic
     */
    res.status(200).json({ message: "Get Version API call Sucessfully" });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSettingMeta = async (req:Request, res:Response) => {
  try{
    WrappidLogger.logFunctionStart("getSettingMeta");
    const {status, ...restData} = await getSettingMetaFunc();
    res.status(status).json({
      ...restData
    });
  }catch(err:any){
    WrappidLogger.error(err);
    res.status(500).json({ message: "Error in User Setting  fetch" });
  }

};


export const postTestCommunication = async (req:Request, res:Response) => {
  try {
    WrappidLogger.logFunctionStart("postTestCommunication");
    const {status, ...restData} = await postTestCommunicationFunc(req, res);
    res.status(status).json({
      ...restData
    });
  } catch (error:any) {
    WrappidLogger.error(error);
    res.status(500).json({ message: "Error ::" +error.message  });
  }
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

export const masterData = async (req: Request, res: Response) => {
  try{
    WrappidLogger.logFunctionStart("masterData");
    const data = await getMasterDataFunc(req);
    const { status, ...restData } = data;
    res.status(status).json(restData);
  }catch(error:any){
    // console.error("Error:: ", error);
    WrappidLogger.error(error);
    res.status(500).json({ message: error.message });
  }         
                  
};

