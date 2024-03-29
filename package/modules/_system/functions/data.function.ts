import { Request } from "express";
import moment from "moment";
import { UUIDV4 } from "sequelize";
import { databaseActions } from "../../../database/actions.database";
import { databaseProvider  } from "../../../database/provider.database";
import { coreConstant } from "../../../index";
// import { getNormalCaseFromCamelCase } from "../utils/strings.utils";


export const getModelsFunc = async (req:Request) => {
  try{
    const db = req.params?.database;
    const _data:any = databaseProvider[db].models;
    const output = Object.entries(_data)
      .map(([key], index) => ({ id: index + 1, name: key }));
  
    // const _data = {
    //   rows: Object.keys(db)
    //     ?.filter((key) => {
    //       return key
    //         .toLocaleLowerCase()
    //         .includes(searchValue?.toLocaleLowerCase());
    //     })
    //     .map((key) => {
    //       return { id: key, name: getNormalCaseFromCamelCase(key) };
    //     }),
    //   totalRecords: Object.keys(db).length,
    // };
    return {
      status: 200,
      message: "Models fetched successfully",
      data: output,
      totalRecords: output.length
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Error to fetch models"
    };
  }
};

export const getDatabaseModelRowFunc = async (req: Request) => {
  const database = req.params.database;
  console.log("database=" + database);
  const model = req.params.model;
  console.log("model=" + model);
  const modelID = req.params.id;
  console.log("modelID=" + modelID);
  try {
    const modelData = await databaseActions.findOne(database,model,{ where: { id: modelID } });

    if (modelData) {
      return{
        status: 200,
        message: "Data fetched successfully",
        data: modelData,
      };
    } else {
      return {status:204};
    }
  } catch (error) {
    console.error(error);
    return{
      error: error,
      message:
          "Error to fetch data from model " + model + " with ID=" + modelID,
    };
  }
};

export const putUpdateStatusFunc = async (req:any) => {
  try {
    const model = req.params.model;
    const database = req.params.database;
    const currentEntry = await databaseActions.findByPk(database, model, Number(req.params.id));
    const comments = currentEntry?.dataValues?.comments;
    const comment = {
      comment: req.body.comment,
      currentStatus: currentEntry._status,
      nextStatus: req.body.nextStatus,
      userId: req.user.userId,
      requestTime: req.body.requestTime,
    };
    // if next status is published then update old ref as inactive
    if (req.body.nextStatus === coreConstant.entityStatus.PUBLISHED) {
      // update old ref as inactive
      const updated_result = await databaseActions.update(database, model,
        { _status: coreConstant.entityStatus.INACTIVE },
        { where: { entityRef: currentEntry.entityRef } }
      );
      if (!updated_result) {
        throw new Error("Error to update old ref");
      }
    }
    // update the status of the particular entry
    const updated_result = await databaseActions.update(database, model,
      {
        _status: req.body.nextStatus,
        comments: [...comments, comment],
      },
      { where: { id: req.params.id } }
    );
    if (!updated_result) {
      throw new Error("Error to update status");
    } else {
      console.log("Status updated sucvcessfully");
      return{status:200, message: "Status updated successfully" };
    }
  } catch (err:any) {
    console.log(err);
    return{
      status:500,
      error: err,
      message: err.message,
    };
  }
};


export const patchDatabaseModelFunc = async (req: any) => {
  const database = req.params.database;
  console.log("database=" + database);
  const model = req.params.model;
  console.log("model=" + model);
  try {
    const modelID = req.params.id;
    console.log("modelID=" + modelID);

    // update model
    const result = await databaseActions.update(database, model,
      {
        _status: coreConstant.entityStatus.DELETED,
        deletedAt: moment().format("YYYY-MM-DD"),
        deletedBy: req.user.userId,
      },
      { where: { id: modelID } }
    );

    console.log(result);

    if (result) {
      return {status:200,  entity: model,message: model + " deleted successfully"};
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);

    return{
      status:500,
      entity: model,
      message: "Error to delete " + model,
    };
  }
};

export const putDatabaseModelFunc = async (req:any) => {
  const model = req.params.model;
  const database = req.params.database;
  console.log("model=" + model);
  console.log("database=" + database);
  try {
    const modelID = req.params.id;
    console.log("modelID=" + modelID);

    const body = req.body;
    console.log(body);

    if (!model) {
      throw new Error("model missing in path parameter");
    }
    if (!databaseProvider[database].models) {
      throw new Error("model[" + model + "] not defined in database");
    }

    // data preparation
    Object.keys(databaseProvider[database].models.rawAttributes).forEach((rawAttribute) => {
      // if json save object in db
      if (
        databaseProvider[database].models.rawAttributes.type
          .toString()
          .startsWith("JSON") &&
          // body.hasOwnProperty(rawAttribute) &&
          Object.prototype.hasOwnProperty.call(body, rawAttribute) &&
          typeof body[rawAttribute] === "string" &&
          body[rawAttribute] !== ""
      ) {
        body[rawAttribute] = JSON.parse(body[rawAttribute]);
      }
    });

    // null if attribute value is empty
    Object.keys(body).forEach((_bodyKey) => {
      if (!Object.prototype.hasOwnProperty.call(body, _bodyKey) || body[_bodyKey] === "") {
      // if (!body.hasOwnProperty(_bodyKey) || body[_bodyKey] === "") {
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

    const currentEntry = await databaseActions.findByPk(database,model,body.id);

    if (
      models.findIndex((f) => f.model === model) !== -1 &&
        currentEntry._status !== coreConstant.entityStatus.DRAFT &&
        currentEntry._status !== coreConstant.entityStatus.CHANGE_REQUESTED
    ) {
      // create new entry as draft
      const createData = { ...body };
      delete createData["id"];

      await databaseActions.create(database,model,{
        ...createData,
        _status: coreConstant.entityStatus.DRAFT,
        updatedBy: req.user.userId,
        commitId: UUIDV4(),
      });

      console.log("New entry created as draft");
      return { message: "New entry created as draft" };
    } else {
      // update model
      result = await databaseActions.update(database, model,
        { ...body, updatedBy: req.user.userId },
        { where: { id: modelID } }
      );

      console.log(result);

      if (result)
        return{status: 200,
          entity: model,
          message: model + " updated successfully",
        };
      else throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    return{
      status:500,
      entity: model,
      error: error,
      message: "Error to update " + model,
    };
  }
};

export const getDatabaseModelsFunc = async () => {
  try {
    // let model = req.params.model;
    // console.log("model=" + model);

    // var baseQuery = {};
    // if (req.query.search) {
    //   baseQuery["search"] = req.query.search;
    // }
    // let columns = db[model]?.rawAttributes || [];
    // let fieldsData = Object.keys(columns).filter((col) => {
    //   return ![
    //     "id",
    //     "createdAt",
    //     "createdBy",
    //     "updatedAt",
    //     "updatedBy",
    //   ].includes(col);
    // });
    // fieldsData.forEach((field) => {
    //   if (req.query[field]) {
    //     switch (columns[field].type.toString()) {
    //       case "INTEGER":
    //         baseQuery[field] = req.query[field];
    //         return;
    //       default:
    //         baseQuery[field] = {
    //           [sequelize.Op.like]: `%${req.query[field]}%`,
    //         };
    //         return;
    //     }
    //   }
    // });

    // var pageQuery = {};
    // pageQuery["start"] = req.query.start;
    // pageQuery["length"] = req.query.length;
    // // below parameters not considered now
    // // pageQuery["page"] = req.query.page;
    // // pageQuery["maxRowInPage"] = req.query.maxRowInPage;
    // // pageQuery["pagesToCache"] = req.query.maxRowInPage;
    // // pageQuery["orderBy"] = req.query.orderBy;
    // // pageQuery["order"] = req.query.order;

    // // Get Data From Model
    // // let _data = await db[model].findAll();
    // console.log("___________________________________");
    // //   console.log("data=" + Object.keys(_data[0].dataValues));
    // console.log(Object.keys(db[model].rawAttributes));
    // console.log("___________________________________");

    // paginate(db[model], [], baseQuery, pageQuery)
    //   .then((_data) => {
    //     res.status(200).json({
    //       message: "Data fetched successfully",
    //       data: _data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({ message: "Error to fetch data from model" });
    //   });
    return {status:200, message: "API Call successfully!!"};
    throw new Error("API unavailable!");
  } catch (err) {
    console.log(err);
    return({status: 500, message: "Error to fetch data from model" });
  }
};

export const postDatabaseModelFunc = async (req : any) => {
  const model = req.params.model;
  const database = req.params.database;
  console.log("model=" + model);
  console.log("database=" + database);
  try {
    if (!model) {
      throw new Error("Model is missing in path parameter");
    }
    if (!databaseProvider[database].models[model]) {
      throw new Error("Model[" + model + "] is not defined in database");
    }

    const body = req.body;
    console.log(body);

    // data preparation
    Object.keys(databaseProvider[database].models[model].rawAttributes).forEach((rawAttribute) => {
      // if json save object in db
      if (
        databaseProvider[database].models[model].rawAttributes[rawAttribute].type
          .toString()
          .startsWith("JSON") &&
          Object.prototype.hasOwnProperty.call(body, rawAttribute) &&
          body[rawAttribute] !== ""
      ) {
        body[rawAttribute] = JSON.parse(body[rawAttribute]);
      }
    });

    // null if attribute value is empty
    Object.keys(body).forEach((_bodyKey) => {
      if (!Object.prototype.hasOwnProperty.call(body, _bodyKey) || body[_bodyKey] === "") {
        body[_bodyKey] = null;
      }
    });

    // update model
    const result = await databaseActions.create(database, model,{
      ...body,
      createdBy: req.user.userId,
      updatedBy: req.user.userId,
    });

    console.log(result);

    if (result)
      return{
        status:200,
        entity: model,
        message: model + " created successfully",
      };
    else throw new Error("Something went wrong");
  } catch (error) {
    console.error(error);
    return{
      return:500,
      entity: model,
      message: "Error to create " + model,
      error: error,
    };
  }
};