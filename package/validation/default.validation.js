const yup = require("yup");

const validateEmail = yup
  .string()
  .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email")
  .required();

const validatePhone = yup
  .string()
  .matches(/^[0-9]{10}$/, "Phone number must contains 10 digits")
  .required();

module.exports = {
  validateEmail,
  validatePhone,
};