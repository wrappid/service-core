// import { coreConstant } from "../../../index";
// import { auditAttributes, getEntitySchema } from "./businessEntity.helper";

// /**
//  * This function helps us to prepare create data
//  * 
//  * @param {*} db : database value
//  * @param {*} modelName : modelName value
//  * @param {*} attributes : attributes value
//  * @param {*} request : request value
//  */
// const prepareCreateData = (
//   db: string,
//   modelName: string,
//   attributes: any,
//   request: any
// ) => {
//   if (!modelName) {
//     throw new Error("model is undefined");
//   }
//   if (db && Object.prototype.hasOwnProperty.call(db, modelName)) {
//     throw new Error(`${modelName} is missing in DB`);
//   }
//   const _attributes = attributes || Object.keys(db[modelName]?.rawAttributes);
//   const _createData: any = {};
//   // prepare data
//   _attributes.forEach((attr: any) => {
//     if (!auditAttributes.includes(attr)) {
//       _createData[attr] = request.body[attr];
//     }
//   });
//   _createData["_status"] = coreConstant.entityStatus.DEFAULT;
//   _createData["createdBy"] = request?.user?.userId;

//   return _createData;
// };

// const createData = async (
//   db: any,
//   modelName: any,
//   attributes: any,
//   transaction: any,
//   request: any
// ) => {
//   const createData = prepareCreateData(
//     db,
//     modelName,
//     attributes || null,
//     request
//   );

//   return await db[modelName].create(createData, {
//     transaction: transaction,
//   });
// };

// /**
//  *
//  * @param {*} db
//  * @param {*} schemaName
//  * @param {*} request
//  */
// const postBusinessEntityData = async (
//   db: any,
//   schemaName: any,
//   request: any
// ) => {
//   try {
//     const schema = await getEntitySchema(schemaName);
//     if (!schema) {
//       throw new Error("Business entity is missing");
//     }
//     const schemaResult: any = {};
//     /* let result =  */ await db.sequelize.transaction(async (t: any) => {
//       schemaResult[schema?.model] = await createData(
//         db,
//         schema?.model,
//         schema?.attributes,
//         t,
//         request
//       );

//       schema?.include?.forEach((_eachInclude: any) => {
//         schemaResult[_eachInclude?.model] = createData(
//           db,
//           _eachInclude?.model,
//           _eachInclude?.attributes,
//           t,
//           request
//         );
//       });
//     });
//   } catch (error: any) {
//     console.error("-------------------------------------");
//     console.error("getBusinessEntity.helper>postBusinessEntityData");
//     console.error(error);
//     console.error("-------------------------------------");
//     throw error;
//   }
// };

// module.exports = {
//   postBusinessEntityData,
// };
