// import { ApiRequestLogs } from "../models/ApiRequestLogs.model";
// import { Applications } from "../models/Applications.model";
// import { CommunicationHistories } from "../models/CommunicationHistory.model";
// import { CommunicationTemplates } from "../models/CommunicationTemplates.model"; 
// import { CronSchemas } from "../models/CronSchemas.model";
// import { DataTableOptions } from "../models/DataTableOptions.model";
// import { MasterData } from "../models/MasterData.model";
// import { Otps } from "../models/Otp.model";
// import { Pages } from "../models/Pages.model";
// // import { Routes } from "../models/Routes.models";
// import { SettingMeta } from "../models/SettingMeta.model";
// import { StringValues } from "../models/StringValues.model";
// import { SupportedLanguages } from "../models/SupportedLanguages.model";
import AppBuilderModelsRegistry from "../modules/_system/models.registry";

const ModelsRegistry: any = {
  // ApiRequestLogs: {
  //   database: "application",
  //   model: ApiRequestLogs,
  // },
  // CronSchemas: {
  //   database: "application",
  //   model: CronSchemas,
  // },
  // Routes: {
  //   database: "application",
  //   model: Routes,
  // },
  // Pages: {
  //   database: "application",
  //   model: Pages,
  // },
  // Applications: {
  //   database: "application",
  //   model: Applications,
  // },
  // DataTableOptions: {
  //   database: "application",
  //   model: DataTableOptions,
  // },
  // MasterData: {
  //   database: "application",
  //   model: MasterData,
  // },
  // StringValues: {
  //   database: "application",
  //   model: StringValues,
  // },
  // SupportedLanguages: {
  //   database: "application",
  //   model: SupportedLanguages,
  // },
  // SettingMeta: {
  //   database: "application",
  //   model: SettingMeta,
  // },
  // CommunicationHistories:{
  //   database: "application",
  //   model: CommunicationHistories
  // },
  // CommunicationTemplates:{
  //   database: "application",
  //   model: CommunicationTemplates
  // },
  // Otps:{
  //   database: "application",
  //   model: Otps
  // },
  ...AppBuilderModelsRegistry,
};
export default ModelsRegistry;
