const Joi = require('joi');

const schema = Joi.object().keys({
  title: Joi.string().trim().min(5).required(),
  course: Joi.string()
    .trim()
    .regex(/^[A-Fa-f-0-9]{24}$/),
});

const validateDetailCourse = function () {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);

    if (validatorResult.error)
      return res.status(400).json(validatorResult.error);

    if (!req.value) req.value = {};
    if (!req.value.body) req.value.body = validatorResult.value;

    next();
  };
};

module.exports = {
  validateDetailCourse,
};
