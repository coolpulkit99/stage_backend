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
  deleteFromList: {
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
  fetchList: {
    query: {
      content_type: Joi.string().messages({
        'string.base': 'Content type must be a string',
        'string.empty': 'Content type cannot be empty',
        'any.required': 'Content type is a required field, Please fill all the required fields',
      }),
      page: Joi.number().messages({
        'number.base': 'Page must be a number',
        'number.empty': 'Page cannot be empty',
      }),
      limit: Joi.number().messages({
        'number.base': 'Limit must be a number',
        'number.empty': 'Limit cannot be empty',
      }),
    },
  },
};
