const isEmpty = require("./Empty");
const validator = require("validator");

module.exports = function validatorRegister(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";


  if (validator.isEmpty(data.name)) {
    errors.name = "Required name";
  }
  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "Required firstname";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};