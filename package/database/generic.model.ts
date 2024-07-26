import { constant } from "../constants/server.constant";
import { databaseActions } from "./actions.database";

type GenericObject = { [key: string]: any };

const processAttributes = (attributesSchema:GenericObject, dataTypes:any) => {
  const outputJson:GenericObject = {};
  Object.keys(attributesSchema).forEach((key:string ) => {
    const { type } = attributesSchema[key];
    outputJson[key] = {
      ...attributesSchema[key],
      type: dataTypes[type]
    };
  });
  return outputJson;
};

const processRelationData = (relationData:GenericObject, dataTypes:any) => {
  if(typeof relationData.foreignKey == "object" ){
    relationData.foreignKey = {
      ...relationData.foreignKey,
      type: dataTypes[relationData.foreignKey.type]
    };
  }
  return relationData;
};


const processAssociation = (genericModel:any, models:any, associationSchema:any, dataTypes:any) => {
  associationSchema.forEach((element: any) => {
    const { model, data } = element;

    if (!model || !data) {
      throw new Error("Invalid input format");
    }
    
    if(Object.keys(models)?.length > 0 && Object.keys(models).includes(model)){
      data.forEach((assSchema:GenericObject) => {
        const { type, data: relationData } = assSchema;
        genericModel[type](
          models[model],
          processRelationData(relationData, dataTypes)
        );
      });
    }
  });
};


export const GenericModel = (name:string, schema: GenericObject, sequelize: any, DataTypes: any) => {

  const GenericModel = sequelize.define(
    name, 
    processAttributes(schema.attributes, DataTypes)
  );

  
  GenericModel.associate = (models: any) => {
    // Process association
    processAssociation(GenericModel, models, schema.associations, DataTypes);
  };

  
  return GenericModel;


};

export const addCustomFunction = (modelInstance: any, schema:GenericObject) => {
/**
   * @todo 
   * we need to move below two functionalites based on enableRoles and enablePermissions flag 
   * To auth/ums module so that it is not going to be default functionalities
   */
  if(schema?.enableRoles){
    modelInstance.prototype.assignRole = async (modelID:number, roleIdentifier: string|number) => {
    /**
       * Give database entry to ModelRoles if not present
       */
      console.log(modelInstance);
      console.log(this);
      
      console.log("roleIdentifier = ", roleIdentifier);
      /**
       * Get role by roleIdentifier 
       * Where roleIdentifier if string then find By slug 
       * If number findBy number
       */
      let role: GenericObject;
      if(typeof roleIdentifier === "number"){
        role = await databaseActions.findByPk("ums", "Roles", roleIdentifier);
      }else{
        role = await databaseActions.findOne("ums", "Roles", {where: {slug: roleIdentifier}});
      }
      await databaseActions.create(schema?.database, "ModelRoles", {
        model: schema?.table || "Unknown",
        modelID: modelID, // 
        roleID: role.id, // determine from database
        status: constant.entityStatus.ACTIVE
      });

    };
    modelInstance.prototype.revokeRole = async (databaseName: string, roleIdentifier: string|number) => {
      console.log("roleIdentifier = ", roleIdentifier);
      await databaseActions.create(databaseName, "ModelRoles", {
        model: "pritam",
        modelId: roleIdentifier
      });

    };
  }
  if(schema?.enablePermissions){
    modelInstance.prototype.assignPermission = (databaseName: string, permissionIdentifier: string|number) => {
    /**
     * Give database entry to ModelPermissions if not present
     */
      console.log("permissionIdentifier = ", permissionIdentifier);
    };
    modelInstance.prototype.revokePermission = (databaseName: string, permissionIdentifier: string|number) => {
      console.log("permissionIdentifier = ", permissionIdentifier);
    };
  }

};
