import { WrappidLogger } from "../../../logging/wrappid.logger";
import { putFormSchemaFunc } from "../functions/appbuilder.functions";
import * as formsController from "../functions/formSchema.helper";

/**
 * This functions helps to get no auth form schema
 * @param req : req value
 * @param res : res value
 * @returns
 */
const getNoAuthFormSchema = async (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getNoAuthFormSchema");
    const formID = req.params.formID;

    if (!formID) {
      return res
        .status(500)
        .json({ message: "formID is missing api path parameter" });
    }

    const formSchema = await formsController.getFormSchema(formID, false);

    if (formSchema) {
      res.status(200).json({
        message: "Entity data found successfully",
        data: formSchema,
        formID: formID,
      });
    } else {
      res.status(204).send();
    }
  } catch (error: any) {
    console.error("Error:: ",error);
    WrappidLogger.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

/**
 * This functions helps to get form schema
 *
 * @param req : req value
 * @param res : res value
 * @returns
 */
const getFormSchema = async (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("getFormSchema");
    const formID: any = req.params.formID;

    if (!formID) {
      return res
        .status(500)
        .json({ message: "formID is missing api path parameter" });
    }

    const formSchema = await formsController.getFormSchema(formID);

    if (formSchema) {
      res.status(200).json({
        message: "FormSchema data found successfully",
        data: formSchema,
        formID: formID,
      });
    } else {
      res.status(204);
    }
  } catch (error: any) {
    // console.error("Error:: ",error);
    WrappidLogger.error(error);
    res.status(500).json({
      error: error?.message || error,
      message: "Something went wrong",
    });
  }
};

const putFormSchema = async (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("putFormSchema");
    // res.status(200).json({message: "API call succecfully!!"});
    const result = await putFormSchemaFunc(req, res);
    const { status, ...resdata } = result;
    res.status(status).json({ ...resdata });
  } catch (error: any) {
    // console.log("Error:: ", error);
    WrappidLogger.error(error);
    res.status(500).json({ message: error });
  }
};

export { getFormSchema, getNoAuthFormSchema, putFormSchema };

