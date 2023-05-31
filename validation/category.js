const isEmpty = require("./Empty");
const validator = require("validator");

module.exports = function validatorCategory(data) {
  let errors = {};
  
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.slug = !isEmpty(data.slug) ? data.slug : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Required  name";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Required description";
  }
  if (validator.isEmpty(data.slug)) {
    errors.slug = "Required slug";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};