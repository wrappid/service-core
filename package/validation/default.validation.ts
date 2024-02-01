import * as yup from "yup";

export const validateEmail = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const validatePhone = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
});
