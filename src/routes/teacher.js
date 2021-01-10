const router = require('express-promise-router')();

const teacherController = require('../controllers/teacher.controller');
const {
  schema,
  validateBody,
  validateId,
} = require('../validators/router.validator');

router
  .route('/')
  .get(teacherController.index)
  .post(validateBody(schema.userSchema), teacherController.createTeacher);

router
  .route('/:id')
  .get(validateId(schema.idSchema), teacherController.getTeacher)
  .put(validateId(schema.idSchema), validateBody(schema.userSchema), teacherController.updateTeacher)
  .patch(validateId(schema.idSchema), validateBody(schema.userSchema), teacherController.updateTeacher)

module.exports = router;
