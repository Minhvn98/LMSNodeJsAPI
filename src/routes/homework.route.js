const router = require('express-promise-router')();

const upload = require('../helpers/upload-file.helper');
const homeworkController = require('../controllers/homework.controller');
const {
  validateDetailCourse,
} = require('../validators/course-detail.validator');
const { schema, validateId } = require('../validators/router.validator');

router
  .route('/')
  .get(homeworkController.index)
  .post(
    upload.single('file'),
    validateDetailCourse(),
    homeworkController.createHomework
  );

router
  .route('/:id')
  .get(validateId(schema.idSchema), homeworkController.getHomework)
  .put(
    upload.single('file'),
    validateId(schema.idSchema),
    validateDetailCourse(),
    homeworkController.replaceHomework
  )
  .patch(
    upload.single('file'),
    validateId(schema.idSchema),
    validateDetailCourse(),
    homeworkController.updateHomework
  )
  .delete(validateId(schema.idSchema), homeworkController.deleteHomework);

module.exports = router;
