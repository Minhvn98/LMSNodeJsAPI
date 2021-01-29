const router = require('express-promise-router')();

const teacherController = require('../controllers/teacher.controller');
const upload = require('../helpers/upload-file.helper');
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
  .put(
    upload.single('avatar'),
    validateId(schema.idSchema),
    validateBody(schema.userSchema),
    teacherController.updateTeacher
  )
  .patch(
    upload.single('avatar'),
    validateId(schema.idSchema),
    validateBody(schema.userSchema),
    teacherController.updateTeacher
  )
  .delete(validateId(schema.idSchema), teacherController.deleteTeacher);

module.exports = router;
