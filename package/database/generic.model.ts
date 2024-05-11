// import fs from "fs";
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

const processRelationData = (relationData:GenericObject) => {
  return relationData;
};


const processAssociation = (genericModel:any, models:any, associationSchema:any) => {
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
          processRelationData(relationData)
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
    processAssociation(GenericModel, models, schema.associations);
  };
  return GenericModel;
};
