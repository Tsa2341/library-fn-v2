import Joi from 'joi';

const updateMemberSchema = Joi.object({
  firstName: Joi.string().required().empty(),
  lastName: Joi.string().required().empty(),
  userName: Joi.string().required().empty(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}$/)
    .messages({
      'string.base': '{{#label}} must be of type string',
      'string.pattern.base':
        '{{#label}} must contain atleast a number, upper-case letter, longer than 8 characters, and no space',
    }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).messages({
    'any.only': 'Password must match',
  }),
  phone: Joi.string().required().empty(),
  gender: Joi.string().required().empty(),
  occupation: Joi.string().required().empty(),
  birthDate: Joi.date().required().empty(),
});

export default updateMemberSchema;
