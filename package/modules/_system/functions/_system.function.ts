import { databaseActions } from "../../../database/actions.database";

export const getSettingMetaFunc = async () => {
  try {
    const data = await databaseActions.findAll("application", "SettingMeta", {});
    console.log("SettingMeta fetched successfully");
    return { status: 200, message: "SettingMeta fetched successfully", data };
  } catch (err) {
    console.log(err);
    return {status:500,  message: "SettingMeta fetched error"};
  }
};
  