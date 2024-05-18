export const ThemeSchemas = (sequelize: any, DataTypes: any) => {
  const themeSchemas = sequelize.define("ThemeSchemas", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entityRef: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    name: {
      // This field has to be deleted ASAP
      type: DataTypes.STRING,
      defaultValue: null,
    },
    schema: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    extraInfo: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    commitId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    _status: {
      type: DataTypes.STRING,
      defaultValue: "new",
    },
    comments: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    deletedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    system: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  
  themeSchemas.associate = (models: any) => {
    if(models.Users){
      themeSchemas.belongsTo(models.Users, {
        foreignKey: "createdBy",
        as: "Owner",
        sourceKey: "id",
      });
      themeSchemas.belongsTo(models.Users, {
        foreignKey: "updatedBy",
        as: "Updater",
        sourceKey: "id",
      });
      themeSchemas.belongsTo(models.Users, {
        foreignKey: "deletedBy",
        as: "Destroyer",
        sourceKey: "id",
      });
    }
  };
  
  return themeSchemas;
};
  