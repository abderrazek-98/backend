const isEmpty = require("./Empty");
const validator = require("validator");

module.exports = function validatorProduct(data) {
  let errors = {};
  
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
 
  if (validator.isEmpty(data.name)) {
    errors.name = "Required  name";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Required description";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};