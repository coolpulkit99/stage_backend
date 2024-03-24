const { Joi } = require('celebrate');

module.exports = {
  addToList: {
    body: {
      content_id: Joi.string().required().messages({
        'string.base': 'Content id must be a string',
        'string.empty': 'Content id cannot be empty',
        'any.required': 'Content id is a required field, Please fill all the required fields',
      }),
      content_type: Joi.string().required().messages({
        'string.base': 'Content type must be a string',
        'string.empty': 'Content type cannot be empty',
        'any.required': 'Content type is a required field, Please fill all the required fields',
      }),
    },
  },
};
