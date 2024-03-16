import * as yup from "yup";

interface SettingMeta {
  body: yup.ObjectSchema<object>;
  query: yup.ObjectSchema<object>;
}

const getSettingMeta: SettingMeta = {
  body: yup.object({}).noUnknown().strict(),
  query: yup.object({}).noUnknown().strict(),
};


const emailOrPhone = yup
  .string()
  .matches(/^([0-9]{10}|[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+)$/);

const sentOtp = {
  body: yup
    .object({
      data: emailOrPhone.required("Please enter emailOrPhone!!"),
      // Type: yup.string().required("Please enter Type!!"),
      type: yup.string().notRequired(),
      templateID: yup.string().notRequired(),
    })
    .noUnknown()
    .strict(),
  query: yup.object({}).noUnknown().strict(),
};

export {getSettingMeta, sentOtp};