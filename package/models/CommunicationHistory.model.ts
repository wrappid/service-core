export const CommunicationHistories = (sequelize: any, DataTypes: any) => {
  const CommunicationHistories = sequelize.define("CommunicationHistories", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commType: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    receipients: {
      type: DataTypes.JSON,
      defaultValue: "",
    },
    sub: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    deletedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
  });

  return CommunicationHistories;
};
