module.exports = (sequelize, DataTypes) => {
  const routes = sequelize.define("Routes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // ref: {
    //   type: DataTypes.STRING,
    //   defaultValue: null,
    // },
    entityRef: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    name: {
      // This field has to be deleted ASAP
      type: DataTypes.STRING,
      defaultValue: null,
    },
    url: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    pageRef: {
      type: DataTypes.STRING,
    },
    controllerRef: {
      type: DataTypes.STRING,
    },
    reqMethod: {
      type: DataTypes.STRING,
    },
    authRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    title: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    keywords: { type: DataTypes.JSONB, defaultValue: [] },
    extraInfo: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: "server-side",
    },
    // commitId: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   unique: true,
    // },
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
  });

  routes.associate = (models) => {
    routes.hasOne(models.Pages, {
      foreignKey: { name: "ref", type: DataTypes.STRING },
      sourceKey: "pageRef",
    });
    routes.belongsTo(models.Users, {
      foreignKey: "createdBy",
      as: "Owner",
      sourceKey: "id",
    });
    routes.belongsTo(models.Users, {
      foreignKey: "updatedBy",
      as: "Updater",
      sourceKey: "id",
    });
    routes.belongsTo(models.Users, {
      foreignKey: "deletedBy",
      as: "Destroyer",
      sourceKey: "id",
    });
  };

  return routes;
};
