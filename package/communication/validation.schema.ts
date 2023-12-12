import * as yup from "yup";

const validateEmail: yup.StringSchema<string> = yup
  .string()
  .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email")
  .required();

const validatePhone: yup.StringSchema<string> = yup
  .string()
  .matches(/^[0-9]{10}$/, "Phone number must contains 10 digits")
  .required();

export { validateEmail, validatePhone };
