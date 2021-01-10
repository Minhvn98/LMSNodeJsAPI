const Joi = require('joi');

const validateBody = function (schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error)
      return res.status(400).json(validationResult.error);

    if (!req.value) req.value = {};
    if (!req.value.body) req.value.body = validationResult.value;

    next();
  };
};

const validateId = function (schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.params.id);

    if (validationResult.error)
      return res.status(400).json(validationResult.error);

    if (!req.value) req.value = {};
    req.value.id = validationResult.value;

    next();
  };
};

const schema = {
  idSchema: Joi.string().regex(/^[A-Fa-f-0-9]{24}$/),

  userSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(10),
    role: Joi.number().min(0).max(2).required(),
  }),
};

module.exports = {
  validateBody,
  validateId,
  schema,
};
