export const CommunicationHistories = (sequelize: any, DataTypes: any) => {
  const CommunicationHistories = sequelize.define("CommunicationHistories", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    from: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    to: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    retryCount: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    attachemnts: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    variable: {
      type: DataTypes.JSONB,
      defaultValue: null,
    },
    extraInfo: {
      type: DataTypes.JSONB,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    _status: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    deletedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER
    },
    mailCommId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    deletedBy: {
      type: DataTypes.INTEGER
    },
    templateId: {
      type: DataTypes.INTEGER
    }
  });


  CommunicationHistories.associate = (models: any) => {
    if (models.Users) {
      CommunicationHistories.belongsTo(models.Users, {
        foreignKey: "createdBy",
        as: "Owner",
        sourceKey: "id",
      });
      CommunicationHistories.belongsTo(models.Users, {
        foreignKey: "updatedBy",
        as: "Updater",
        sourceKey: "id",
      });
      CommunicationHistories.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "User",
        sourceKey: "id",
      });
      CommunicationHistories.belongsTo(models.Users, {
        foreignKey: "deletedBy",
        as: "Destroyer",
        sourceKey: "id",
      });
    }
    if(models.CommunicationTemplates){
      CommunicationHistories.belongsTo(models.CommunicationTemplates, {
        foreignKey: "templateId",
        sourceKey: "id",
      });
    }
    if(models.Otps){
      CommunicationHistories.hasOne(models.Otps, {
        foreignKey: "mailCommId",
        sourceKey: "id",
      });
    }
      
    
  };


  return CommunicationHistories;
};
