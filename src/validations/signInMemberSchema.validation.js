import Joi from 'joi';

const signInMemberSchema = Joi.object({
  userName: Joi.string().required().empty(),
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
});

export default signInMemberSchema;
