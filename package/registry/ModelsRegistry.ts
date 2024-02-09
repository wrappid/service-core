import { CronSchemas } from "../models/CronSchemas.model";
import { ApiRequestLogs } from "../models/ApiRequestLogs.model";
import { Routes } from "../models/Routes.models";
import { Pages } from "../models/Pages.model";
import { Applications } from "../models/Applications.model";
import { DataTableOptions } from "../models/DataTableOptions.model";
import { MasterData } from "../models/MasterData.model";
import { StringValues } from "../models/StringValues.model";
import { SupportedLanguages } from "../models/SupportedLanguages.model";
import { SettingMeta } from "../models/SettingMeta.model";
import AppBuilderModelsRegistry from "../app-builder/models.registry";
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
  Pages: {
    database: "application",
    model: Pages,
  },
  Applications: {
    database: "application",
    model: Applications,
  },
  DataTableOptions: {
    database: "application",
    model: DataTableOptions,
  },
  MasterData: {
    database: "application",
    model: MasterData,
  },
  StringValues: {
    database: "application",
    model: StringValues,
  },
  SupportedLanguages: {
    database: "application",
    model: SupportedLanguages,
  },
  SettingMeta: {
    database: "application",
    model: SettingMeta,
  },
  ...AppBuilderModelsRegistry,
};
export default ModelsRegistry;
