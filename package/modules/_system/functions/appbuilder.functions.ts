/* eslint-disable no-console */
import { v4 as uuidv4 } from "uuid";
import {
  coreConstant,
  databaseActions,
  databaseProvider,
} from "../../../index";
import { WrappidLogger } from "../../../logging/wrappid.logger";

// eslint-disable-next-line no-unused-vars
const putFormSchemaFunc = async (req: any, res: any) => {
  try {
    WrappidLogger.logFunctionStart("putFormSchemaFunc");
    const model = req?.params?.model;
    console.log("model=" + model);
    const modelID = req.params.id;
    console.log("modelID=" + modelID);

    const body = req.body;
    console.log(body);

    if (!model) {
      WrappidLogger.error("model missing in path parameter");
      throw new Error("model missing in path parameter");
    }
    if (!databaseProvider.application.models[model]) {
      WrappidLogger.error("model[" + model + "] not defined in database");
      throw new Error("model[" + model + "] not defined in database");
    }

    // data preparation
    Object.keys(
      databaseProvider.application.models[model].rawAttributes
    ).forEach((rawAttribute) => {
      // if json save object in db
      if (
        databaseProvider.application.models[model].rawAttributes[
          rawAttribute
        ].type
          .toString()
          .startsWith("JSON") &&
        Object.prototype.hasOwnProperty.call(body, rawAttribute) &&
        typeof body[rawAttribute] === "string" &&
        body[rawAttribute] !== ""
      ) {
        body[rawAttribute] = JSON.parse(body[rawAttribute]);
      }
    });

    // null if attribute value is empty
    Object.keys(body).forEach((_bodyKey) => {
      if (
        !Object.prototype.hasOwnProperty.call(body, _bodyKey) ||
        body[_bodyKey] === ""
      ) {
        body[_bodyKey] = null;
      }
    });

    let result = null;

    const models = [
      { model: "FormSchemas" },
      { model: "BusinessEntitySchemas" },
      // { model: "Routes" },
      { model: "Pages" },
    ];

    const currentEntry = await databaseActions.findByPk(
      "application",
      model,
      body.id
    );

    if (
      models.findIndex((f) => f.model === model) !== -1 &&
      currentEntry._status !== coreConstant.entityStatus.DRAFT &&
      currentEntry._status !== coreConstant.entityStatus.CHANGE_REQUESTED
    ) {
      // create new entry as draft
      const createData = { ...body };
      delete createData["id"];

      /* let newEntry =  */ await databaseActions.create("application", model, {
        ...createData,
        _status: coreConstant.entityStatus.DRAFT,
        updatedBy: req.user.userId,
        commitId: uuidv4(),
      });

      WrappidLogger.info("New entry created as draft");
      // console.log("New entry created as draft");
      return { status: 200, message: "New entry created as draft" };
      // res.status(200).json({ message: "New entry created as draft" });
    } else {
      // update model
      result = await databaseActions.update(
        "application",
        model,
        { ...body, updatedBy: req.user.userId },
        { where: { id: modelID } }
      );

      console.log(result);

      if (result)
        return {
          status: 200,
          entity: model,
          message: model + " updated successfully",
        };
      // res.status(200).json({
      //   entity: model,
      //   message: model + " updated successfully",
      // });
      else {
        WrappidLogger.error("Something went wrong");
        throw new Error("Something went wrong");
      }
    }
  } catch (error:any) {
    // console.error(error);
    WrappidLogger.error(error);
    return {
      status: 200,
      error: error,
      message: "Error to update",
    };
    // res.status(500).json({
    //   entity: model,
    //   error: error,
    //   message: "Error to update " + model,
    // });
  }
};

export { putFormSchemaFunc };
