const router = require('express-promise-router')();

const upload = require('../helpers/upload-file.helper');
const lessonController = require('../controllers/lesson.controller');
const {
  validateDetailCourse,
} = require('../validators/course-detail.validator');
const { schema, validateId } = require('../validators/router.validator');

router
  .route('/')
  .get(lessonController.index)
  .post(
    upload.single('file'),
    validateDetailCourse(),
    lessonController.createLesson
  );

router
  .route('/:id')
  .get(validateId(schema.idSchema), lessonController.getLesson)
  .put(
    upload.single('file'),
    validateId(schema.idSchema),
    validateDetailCourse(),
    lessonController.replaceLesson
  )
  .patch(
    upload.single('file'),
    validateId(schema.idSchema),
    validateDetailCourse(),
    lessonController.updateLesson
  )
  .delete(validateId(schema.idSchema), lessonController.deleteLesson);

module.exports = router;
