import { CronSchemas } from "../models/CronSchemas.model";
import { ApiRequestLogs } from "../models/ApiRequestLogs.model";
import { Routes } from "../models/Routes.models";

const ModelsRegistry: any = {
  ApiRequestLogs: {
    database: "application",
    model: ApiRequestLogs,
  },
  CronSchemas: {
    database: "application",
    model: CronSchemas,
  },
  Routes: {
    database: "application",
    model: Routes,
  },
};
export default ModelsRegistry;
