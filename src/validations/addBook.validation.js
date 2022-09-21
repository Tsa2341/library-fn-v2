import Joi from 'joi';

const createBookSchema = Joi.object({
  ISBN: Joi.string().required().empty(),
  publisher: Joi.string().required().empty(),
  title: Joi.string().required().empty(),
  language: Joi.string().required().empty().lowercase(),
  pages: Joi.any().required().empty(),
  author: Joi.string().required().empty(),
  category: Joi.string().required().empty().lowercase(),
  about: Joi.string().required().empty(),
});

export default createBookSchema;
