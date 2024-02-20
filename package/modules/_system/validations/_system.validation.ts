import * as yup from "yup";

interface SettingMeta {
  body: yup.ObjectSchema<object>;
  query: yup.ObjectSchema<object>;
}

const getSettingMeta: SettingMeta = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};
export {getSettingMeta};