import Joi from 'joi';

const paymentSchema = Joi.object({
  cardNumber: Joi.string().required().empty(),
  expireDate: Joi.string().required().empty(),
  cardHolder: Joi.string().required().empty(),
  ccv: Joi.string().required().empty(),
});

export default paymentSchema;
