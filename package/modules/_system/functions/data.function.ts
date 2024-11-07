import { Request } from "express";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { APP_BUILDER_MODELS, constant } from "../../../constants/server.constant";
import { databaseActions } from "../../../database/actions.database";
import { databaseProvider } from "../../../database/setup.database";
import { coreConstant } from "../../../index";
import { WrappidLogger } from "../../../logging/wrappid.logger";
import { GenericObject } from "../../../types/generic.types";

export const getModelsFunc = async (req:Request) => {
  try{
    WrappidLogger.logFunctionStart("getModelsFunc");
    const database:string = <string>req.query?.database || "application";
    const _data:any = databaseProvider[database].models;
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
  } catch (error:any) {
    WrappidLogger.error(error);
    return {
      status: 500,
      message: "Error to fetch models"
    };
  }
};

export const getDatabaseModelRowFunc = async (req: Request) => {
  WrappidLogger.logFunctionStart("getDatabaseModelRowFunc");
  const database:string = <string>req.query?.database || "application";
  WrappidLogger.info("database=" + database);
  const model = req.params.model;
  WrappidLogger.info("model=" + model);
  const modelID = req.params.id;
  WrappidLogger.info("modelID=" + modelID);
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
  } catch (error:any) {
    WrappidLogger.error(error);
    return{
      error: error,
      message:
          "Error to fetch data from model " + model + " with ID=" + modelID,
    };
  }
};

export const putUpdateStatusFunc = async (req:any) => {
  try {
    WrappidLogger.logFunctionStart("putUpdateStatusFunc");
    const model = req.params.model;
    const database:string = <string>req.query?.database || "application";
    const currentEntry = await databaseActions.findByPk(database, model, Number(req.params.id));
    const comments = currentEntry?.dataValues?.comments;
    if (currentEntry?.dataValues?._status === req.body.nextStatus){
      throw new Error("Status update error");
    }
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
        WrappidLogger.error("Error to update old ref");
        throw new Error("Error to update old ref");
      }
    }
    // update the status of the particular entry
    const updated_result = await databaseActions.update(database, model,
      {
        _status: req.body?.nextStatus,
        comments: [...(comments || []), comment],
      },
      { where: { id: req.params.id } }
    );
    if (!updated_result) {
      WrappidLogger.error("Error to update status");
      throw new Error("Error to update status");
    } else {
      WrappidLogger.info("Status updated sucvcessfully");
      // WrappidLogger.info("Status updated sucvcessfully");
      return{status:200, message: "Status updated successfully" };
    }
  } catch (err:any) {
    WrappidLogger.error(err);
    return{
      status:500,
      error: err,
      message: err.message,
    };
  }
};


export const patchDatabaseModelFunc = async (req:any) => {
  WrappidLogger.logFunctionStart("patchDatabaseModelFunc");
  const database:string = <string>req.query?.database || "application";
  WrappidLogger.info("database=" + database);
  const model = req.params.model;
  WrappidLogger.info("model=" + model);
  try {
    const modelID = req.params.id;
    WrappidLogger.info("modelID=" + modelID);

    // update model
    const result = await databaseActions.update(database, model,
      {
        _status: coreConstant.entityStatus.DELETED,
        deletedAt: moment().format("YYYY-MM-DD"),
        deletedBy: req.user.userId,
      },
      { where: { id: modelID } }
    );

    WrappidLogger.info(result);

    if (result) {
      return {status:200,  entity: model,message: model + " deleted successfully"};
    } else {
      WrappidLogger.error("Something went wrong");
      throw new Error("Something went wrong");
    }
  } catch (error:any) {
    WrappidLogger.error(error);

    return{
      status:500,
      entity: model,
      message: "Error to delete " + model,
    };
  }
};

export const putDatabaseModelFunc = async (req:any) => {
  WrappidLogger.logFunctionStart("putDatabaseModelFunc");
  const model:string = req.params.model;
  const database:string = <string>req.query?.database || "application";
  WrappidLogger.info(`model= ${model}`);
  WrappidLogger.info(`database= + ${database}`);
  try {
    const modelID = req.params.id;
    WrappidLogger.info(`modelID= ${modelID}`);

    const body = req.body;
    WrappidLogger.info(body);

    if (!model) {
      WrappidLogger.error("model missing in path parameter");
      throw new Error("model missing in path parameter");
    }
    if (databaseProvider[database].models && !Object.prototype.hasOwnProperty.call(databaseProvider[database].models, model)) {
      WrappidLogger.error("model[" + model + "] not defined in database");
      throw new Error("model[" + model + "] not defined in database");
    }

    const appBuilderModels = await databaseActions.findOne("application", "SettingMeta", {
      where: {
        name: "appBuilderModels",
        status: constant.entityStatus.ACTIVE
      }
    });
    const isBuilderModel = appBuilderModels?.value?.includes(model);
    let result = null;
    if(isBuilderModel){
      // data preparation
      Object.keys(databaseProvider[database].models[model].rawAttributes).forEach((rawAttribute) => {
      // if json save object in db
        if (
          databaseProvider[database].models[model].rawAttributes[rawAttribute].type
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
      const currentEntry = await databaseActions.findByPk(database,model,modelID);

      if (currentEntry._status !== coreConstant.entityStatus.PUBLISHED &&
        currentEntry._status !== coreConstant.entityStatus.DRAFT &&
      currentEntry._status !== coreConstant.entityStatus.CHANGE_REQUESTED
      ) {
      // create new entry as draft
        delete body["id"];
        const created = await databaseActions.create(database,model,{
          ...body,
          _status: coreConstant.entityStatus.DRAFT,
          updatedBy: req.user.userId,
          commitId: uuidv4(),
        });
        if(created){
          WrappidLogger.info("New entry created as draft");
          return { message: "New entry created as draft" };
        }else{
          WrappidLogger.error("Can not update or create draft");
          throw new Error("Can not update or create draft");
        }
      }
    } 
    //Delete id columnn 
    delete body["id"];
    // update model
    result = await databaseActions.update(database, model,
      {
        ...body,
        commitId: uuidv4(), 
        updatedBy: req.user.userId 
      },
      { where: { id: modelID } }
    );
    
    WrappidLogger.info(result);

    if (result){
      return{status: 200,
        entity: model,
        message: model + " updated successfully",
      };
    } else {
      WrappidLogger.error("Something went wrong");
      throw new Error("Something went wrong");
    }
  } catch (error:any) {
    WrappidLogger.error(error);
    return{
      status:500,
      entity: model,
      error: error,
      message: "Error to update " + model,
    };
  }
};

export const getDatabaseModelsFunc = async (req:any) => {
  try {
    // let model = req.params.model;
    // WrappidLogger.info("model=" + model);

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
    // WrappidLogger.info("___________________________________");
    // //   WrappidLogger.info("data=" + Object.keys(_data[0].dataValues));
    // WrappidLogger.info(Object.keys(db[model].rawAttributes));
    // WrappidLogger.info("___________________________________");

    // paginate(db[model], [], baseQuery, pageQuery)
    //   .then((_data) => {
    //     res.status(200).json({
    //       message: "Data fetched successfully",
    //       data: _data,
    //     });
    //   })
    //   .catch((err) => {
    //     WrappidLogger.info(err);
    //     res.status(500).json({ message: "Error to fetch data from model" });
    //   });
    WrappidLogger.info(req?.query);
    
    return {status:200, message: "API Call successfully!!"};
  } catch (err:any) {
    WrappidLogger.error(err);
    return({status: 500, message: "Error to fetch data from model" });
  }
};

export const postDatabaseModelFunc = async (req:any) => {
  try {
    WrappidLogger.logFunctionStart("postDatabaseModelFunc");
    const model = req.params.model;
    const database:string = <string>req.query?.database || "application";
    WrappidLogger.info("model=" + model);
    WrappidLogger.info("database=" + database);
    if (!model) {
      WrappidLogger.error("Model is missing in path parameter");
      throw new Error("Model is missing in path parameter");
    }
    if (!databaseProvider[database].models[model]) {
      WrappidLogger.error("Model[" + model + "] is not defined in database");
      throw new Error("Model[" + model + "] is not defined in database");
    }

    let body = req.body;
    WrappidLogger.info(body);

    const appBuilderModels = await databaseActions.findOne("application", "SettingMeta", {
      where: {
        name: "appBuilderModels",
        status: constant.entityStatus.ACTIVE
      }
    });
    const isBuilderModel = appBuilderModels?.value?.includes(req.params.model);
    if(isBuilderModel){
    
    
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
      body = {
        ...body, 
        _status: constant.entityStatus.DRAFT,
        commitId: uuidv4()
      };
    }
    const result = await databaseActions.create(database, model,{
      ...body,
      createdBy: req.user.userId,
      updatedBy: req.user.userId
    });

    WrappidLogger.info(result);

    if (result)
      return{
        status:200,
        entity: model,
        message: model + " created successfully",
      };
    else {
      WrappidLogger. error("Something went wrong");
      throw new Error("Something went wrong");
    }
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }
};

const createModelData = async (database: string, model: string, data: GenericObject, additionalData?: GenericObject): Promise<boolean> => {
  try {
    WrappidLogger.logFunctionStart("createModelData");
    const entityRef:string = <string>data?.entityRef || "";
    let dataExistFlag = false;
    if(!entityRef){
      WrappidLogger.error("entityRef is missing!!");
      throw new Error("entityRef is missing!!");
    }
    if(!model){
      WrappidLogger.error("Model is missing!!");
      throw new Error("Model is missing!!");
    }
    switch (model) {
      case APP_BUILDER_MODELS.ROUTES:
      case APP_BUILDER_MODELS.FORM_SCHEMAS:
      case APP_BUILDER_MODELS.BUSINESS_ENTITY_SCHEMAS:
      case APP_BUILDER_MODELS.PAGES:
      case APP_BUILDER_MODELS.THEME_SCHEMAS:
        dataExistFlag = await checkEntityRefExist(database, model, entityRef);
        break; 
      default:
        dataExistFlag = false;
        break;
    }
  
    if(dataExistFlag){
      WrappidLogger.error("Data exist on database");
      throw new Error("Data exist on database");
    } else {
      let createOptions = {};
      if (model === APP_BUILDER_MODELS.ROUTES) {
        createOptions = {
          include: [
            {
              association: databaseProvider[database].models.Users
            }
          ]
        };
        data = {
          ...data,
          name: entityRef,
          source: `${additionalData?.source}-side`
        };
      }

      await databaseActions.create(database, model, { ...data, _status: constant.entityStatus.PUBLISHED }, createOptions);
      /**
       * @todo review required @techoneel
       * need to log it
       */
      return true;
    }
  } catch (error:any) {
    WrappidLogger.info(error);
    throw error;
  }
};


/**
 * This function will sync model data to database
 * 
 * @param req : Request Object 
 * @returns response
 */
export const postDataModelSyncFunc = async (req: any) => {
  try {
    WrappidLogger.logFunctionStart("postDataModelSyncFunc");
    const database:string = <string>req.query?.database || "application";
    const source:string = <string>req.query?.source || "server";
    const model:string = req.params?.model;
    const data: GenericObject[] = req.body || [];
    const dataSyncReport:{[key:string]: GenericObject} = {} ;
    if(data?.length > 0){
      const modifiedData = await Promise.all(
        data?.map(async (eachData: GenericObject) => {
          if(Object.prototype.hasOwnProperty.call(eachData, "entityRef")){
            const key:string = eachData.entityRef;
            try {
              const result = <boolean> await createModelData(database, model, eachData, {source}).catch();
              return { entityRef: key, result };
            } catch (error:any) {
              return { entityRef: key, result: false, error: { message: error.message } };
            }
          }
        })
      );
      modifiedData.forEach((data: {entityRef: string, result: boolean}) =>{
        dataSyncReport[data?.entityRef] = data;
      });
      return {
        status: 201, 
        message: "Data synced successfully", 
        data: dataSyncReport
      }; 
    }
    return {
      status: 500, 
      message: "Invalid Data", 
    }; 
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }
};

const checkEntityRefExist = async (database:string, model:string, entityRef:string ): Promise<boolean> => {
  try {
    const data = await databaseActions.findAll(database, model, {
      where: {
        entityRef: entityRef,
        _status: constant.entityStatus.PUBLISHED
      }
    });
    if(data.length>0){
      return true;
    }else{
      return false;
    } 
  } catch (error:any) {
    WrappidLogger.info(error);
    throw error;
  }
};


/**
 * This function will help us to get data from database
 * 
 * @param db : database value 
 * @param entityRef : entityRef value 
 * @param model : model value 
 * @param _auth : auth value 
 * @returns 
 */
async function getDataFromDB(db: string, entityRef: string, model: string) {
  WrappidLogger.logFunctionStart("getDataFromDB");
  // const dbSequelize = databaseProvider[db].Sequelize;
  const whereClause: GenericObject = {
    entityRef: entityRef,
    _status: constant.entityStatus.PUBLISHED,
  };
  // if (auth) {
  //   whereClause["authRequired"] = true;
  // } else {
  //   whereClause["authRequired"] = {
  //     [dbSequelize.Op.or]: {
  //       [dbSequelize.Op.eq]: false,
  //       [dbSequelize.Op.is]: null,
  //     },
  //   };
  // }
  const formSchema = await databaseActions.findOne(db, model, {
    where: whereClause,
  });
  return formSchema;
}
  
/**
 * This function will helps to clone model data
 * 
 * @param req : Request Object
 * @returns 
 */
export const postCloneDataModelFunc = async (req: any) => {
  try {
    WrappidLogger.logFunctionStart("postCloneDataModelFunc");
    const model = req.params.model;
    const entityRef = req.params.entityRef;
    let masterTableFlag = false;
    const masterTableList = ["BusinessEntitySchemas", "Routes", "Pages", "FormSchemas", "ThemeSchemas"];
    masterTableList.forEach(element => {
      if (element === model) {
        masterTableFlag = true;
      }
    });
    if(!masterTableFlag){
      return {
        status: 500,
        message: `${model} is not master data table`};
    }  
    if (!entityRef) {
      return {
        status: 500,
        message: "entityRef is missing api path parameter"
      };
    }
  
    const dbData = await getDataFromDB("application", entityRef, model);
    // object cloneSchema
    const cloneSchema = {
      formID: dbData?.formID + "-" + new Date().getTime(),
      name: `Custom ${dbData.name}-${new Date().getTime()}`,
      _status: constant.entityStatus.DRAFT,
      schema: dbData.schema,
      extraInfo: dbData.extraInfo,
      entityRef: `${dbData?.entityRef}-${new Date().getTime()}`,
    };
  
    if (dbData) {
      const clonedSchema = await databaseActions.create("application", model,{
        ...cloneSchema,
        commitId: uuidv4(),
        createdBy: req.user.userId,
        updatedBy: req.user.userId
      });
      return {
        status: 200,
        name: clonedSchema.name,
        data: clonedSchema,
      };
    } else {
      return {
        status: 200
      };
    }
  } catch (error:any) {
    WrappidLogger.info(error);
    throw error;
  }
};
  
/**
 * This function will provide JSON Object
 * 
 * @param data Array<GenericObject>
 * @returns JSON Object
 */
export function transformRowDataToJSON(data: Array<GenericObject>) {
  WrappidLogger.logFunctionStart("transformRowDataToJSON");
  const transformedData:GenericObject = {};
  data.forEach((datum: GenericObject) => {
    transformedData[datum.key] = datum.value;
  });
  return transformedData;
}

/**
 * This function will provide meta field values in JSON Object
 * 
 * @param tableName Table name value
 * @param parentID parentID value
 * @returns JSON Object 
 */
export const getMetaDataJSON = async(tableName:string, parentID:number) => {
  try {
    WrappidLogger.logFunctionStart("getMetaDataJSON");
    const resultData = await databaseActions.findAll("application", tableName, {
      where: {
        "parentID": parentID,
        "_status": constant.entityStatus.ACTIVE
      }
    });
    const data = await transformRowDataToJSON(resultData);
    return {parentID: parentID, ...data};
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("getMetaDataJSON");
  }
};

/**
 *  This function is used to create bulk data
 * @param tableName : Table name value
 * @param parentID : parentID value
 * @param bodyData : bodyData value
 * @returns
 */
export const createBulkData = async(tableName:string, parentID:number, bodyData:string) => {
  try {
    let returnData: {status:number, message:string};
    const processData = await processInput(bodyData, parentID, "active");

    // Use bulkCreate to insert multiple records
    const result:any = await databaseProvider["application"].models[tableName].bulkCreate(processData);
    if(result.length===0){
      returnData =  {
        status: 200,
        message: "Data created successfully"
      };
    }
    return returnData;
  } catch (error:any) {
    WrappidLogger.error("createBulkData");
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("createBulkData");
  }
};

/**
 * This function is used to get meta data
 * @param tableName : Table name value
 * @param parentID : parentID value
 * @returns 
 */
export const getMetaDatas = async(tableName:string, parentID:number)=> {
  try {
    WrappidLogger.logFunctionStart("getMetaDatas");
    const resultData = await databaseActions.findAll("application", tableName, {
      where: {
        parentID: parentID,
        _status: constant.entityStatus.ACTIVE
      }
    });
    if(!resultData){
      WrappidLogger.error("No data found");
      return {
        status: 200,
        messaage: "No data found!" 
      };  
    }
    const _data = await transformDataWithValidation(resultData);
    return {
      status: 200,
      data: _data
    };  
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("getMetaDatas");
  }
};


/**
 * This function is used to process input data
 * @param input data
 * @param parentID parentID 
 * @param status status
 * @returns 
 */
async function processInput(input:any, parentID:number, status:string) {
  const result = [];
  for (const key in input) {
    result.push({ key: key, value: input[key], parentID:parentID, _status:status  });
  }
  return result;
}


/**
 *
 */
interface DataItem {
  key: string;
  value: any;
  parentID: number;
  _status?: string;
}

export const updateMetaData = async (tableName: string, parentID: number, bodyData: string) => {
  try {
    // 1. Process input data
    const processData: DataItem[] = await processInput(bodyData, parentID, "active");
    
    // 2. Get existing active records
    const existingRecords = await databaseProvider["application"].models[tableName].findAll({
      where: {
        parentID,
        _status: "active"
      },
      raw: true
    });

    // 3. Compare and categorize updates
    const updateRequested = processData.map(item => item.key); // All requested keys
    const recordsToUpdate: DataItem[] = [];
    const noUpdateNeeded: string[] = [];

    processData.forEach(newItem => {
      const existingRecord = existingRecords.find((record:any) => record.key === newItem.key);
      
      if ((existingRecord && existingRecord.value === newItem.value) || (newItem.value===null)) {
        // Record exists with same value - no update needed
        noUpdateNeeded.push(newItem.key);
      } else {
        // Either record doesn't exist or value is different - needs update
        recordsToUpdate.push(newItem);
      }
    });

    // 4. Return early if no actual updates needed
    if (recordsToUpdate.length === 0) {
      return {
        status: 200,
        message: "No updates performed",
        data: {
          requested: updateRequested,
          updated: [],
          ignored: noUpdateNeeded,
          reason: "Existing values are same as requested values"
        }
      };
    }

    // 5. Perform updates for records that need it

    try {
      // Set existing records to inactive
      const keysToUpdate = recordsToUpdate.map(item => item.key);
      await databaseProvider["application"].models[tableName].update(
        { _status: "inactive" },
        {
          where: {
            parentID,
            key: keysToUpdate,
            _status: "active"
          },
        }
      );

      // Insert new records
      // eslint-disable-next-line no-unused-vars
      const result = await databaseProvider["application"].models[tableName].bulkCreate(
        recordsToUpdate,  { fields: ["key", "value", "_status", "parentID"] }
      );


      return {
        status: 200,
        message: "Updates completed",
        data: {
          requested: updateRequested,
          updated: keysToUpdate,
          ignored: noUpdateNeeded,
          reason: "Existing values matched requested values"
        }
      };

    } catch (error:any) {
      WrappidLogger.error(error);
      throw error;
    }

  } catch (error: any) {
    WrappidLogger.error(error);
    throw error;
  }
};


/**
 * This 
 * @param inputData :input
 * @returns 
 */
async function transformDataWithValidation(inputData: Array<any>) {
  try {
    WrappidLogger.logFunctionStart("transformDataWithValidation");
    if (!Array.isArray(inputData) || inputData.length === 0) {
      throw new Error("Input must be a non-empty array");
    }
    
    // Check if all parentIDs are the same
    const firstParentID = inputData[0].parentID;
    const allSameParentID = inputData.every(item => item.parentID === firstParentID);
      
    if (!allSameParentID) {
      throw new Error("All items must have the same parentID");
    }
    
    const result: { [key: string]: any } = {
      parentID: firstParentID
    };
    
    inputData.forEach(item => {
      if (!item.key) {
        throw new Error("Each item must have a key");
      }
      result[item.key] = item.value;
    });
    
    return result;
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("transformDataWithValidation");
  }
 
}




