const router = require('express-promise-router')();

const upload = require('../helpers/upload-file.helper');
const { validateCourse } = require('../validators/course.validator');
const { schema, validateId } = require('../validators/router.validator')
const courseController = require('../controllers/course.controller');

router
  .route('/')
  .get(courseController.index)
  .post(
    upload.single('image'),
    validateCourse(),
    courseController.createCourse
  );


router
  .route('/:id')
  .get(validateId(schema.idSchema), courseController.getCourse)
  .put(
    validateId(schema.idSchema),
    upload.single('image'),
    validateCourse(),
    courseController.replaceCourse
  )
  .patch(
    validateId(schema.idSchema),
    upload.single('image'),
    validateCourse(),
    courseController.replaceCourse
  )
  .delete(
    validateId(schema.idSchema),
    courseController.deleteCourse
  )


module.exports = router;
