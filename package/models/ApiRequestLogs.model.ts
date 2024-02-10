import Sequelize from "sequelize";

export const ApiRequestLogs = (sequelize: any, DataTypes: any) => {
  const ApiRequestLogs = sequelize.define(
    "ApiRequestLogs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ip: DataTypes.TEXT,
      access_key: DataTypes.TEXT,
      endpoint: DataTypes.TEXT,
      request: DataTypes.TEXT,
      req_body: DataTypes.JSONB,
      response: DataTypes.JSONB,
      response_status: DataTypes.TEXT,
      response_header: DataTypes.JSONB,
      header_stack: DataTypes.JSONB,
      start_ts: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true,
      },
      end_ts: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true,
      },
      createdAt: {
        field: "created_ts",
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true,
      },
      updatedAt: {
        field: "updated_ts",
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return ApiRequestLogs;
};
