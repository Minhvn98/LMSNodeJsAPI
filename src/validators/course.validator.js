const Joi = require('joi')

const schema = Joi.object().keys({
  categories: Joi.string().required(),
  description: Joi.string(),
  level: Joi.string().required(),
  name: Joi.string().min(10).max(300).required(),
  teacher: Joi.string().regex(/^[A-Fa-f-0-9]{24}$/)
})

const validateCourse = function () {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body)

    if(validatorResult.error)
      return res.status(400).json(validatorResult.error)

    if(!req.value) req.value = {}
    if(!req.value.body) req.value.body = {}
    res.json(validatorResult)
  }
}

module.exports = {
  validateCourse
}
