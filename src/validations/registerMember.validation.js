import Joi from 'joi';

const registerMemberSchema = Joi.object({
  firstName: Joi.string().required().empty(),
  lastName: Joi.string().required().empty(),
  userName: Joi.string().required().empty(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .empty(),
  password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}$/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain atleast a number, upper-case letter, longer than 8 characters, and no space',
    }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password must match',
  }),
  phone: Joi.string().required().empty(),
});

export default registerMemberSchema;
