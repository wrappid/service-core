import {Request, Response} from "express";
import { getSettingMetaFunc } from "../functions/_system.function";

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
    const {status, ...restData} = await getSettingMetaFunc();
    res.status(status).json({
      ...restData
    });
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error in User Setting  fetch" });
  }

};