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

  /**
   * @todo 
   * we need to move below two functionalites based on enableRoles and enablePermissions flag 
   * To auth/ums module so that it is not going to be default functionalities
   */
  if(schema?.enableRoles){
    GenericModel.assignRole = async (databaseName: string, roleIdentifier: string|number) => {
      /**
       * Give database entry to ModelRoles if not present
       */
      console.log("roleIdentifier = ", roleIdentifier);
      await databaseActions.create(databaseName, "ModelRoles", {
        model: "pritam",
        modelId: roleIdentifier
      });

    };
    GenericModel.revokeRole = async (databaseName: string, roleIdentifier: string|number) => {
      console.log("roleIdentifier = ", roleIdentifier);
      await databaseActions.create(databaseName, "ModelRoles", {
        model: "pritam",
        modelId: roleIdentifier
      });

    };
  }
  if(schema?.enablePermissions){
    GenericModel.assignPermission = (databaseName: string, permissionIdentifier: string|number) => {
      /**
       * Give database entry to ModelPermissions if not present
       */
      console.log("permissionIdentifier = ", permissionIdentifier);
    };
    GenericModel.revokePermission = (databaseName: string, permissionIdentifier: string|number) => {
      console.log("permissionIdentifier = ", permissionIdentifier);
    };
  }

  return GenericModel;
};
