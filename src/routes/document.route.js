const router = require('express-promise-router')();

const upload = require('../helpers/upload-file.helper');
const documentController = require('../controllers/document.controller');
const {
  validateDetailCourse,
} = require('../validators/course-detail.validator');
const { schema, validateId } = require('../validators/router.validator');

router
  .route('/')
  .get(documentController.index)
  .post(
    upload.single('file'),
    validateDetailCourse(),
    documentController.createDocument
  );

router
  .route('/:id')
  .get(validateId(schema.idSchema), documentController.getDocument)
  .put(
    upload.single('file'),
    validateId(schema.idSchema),
    validateDetailCourse(),
    documentController.replaceDocument
  )
  .patch(
    upload.single('file'),
    validateId(schema.idSchema),
    validateDetailCourse(),
    documentController.updateDocument
  )
  .delete(validateId(schema.idSchema), documentController.deleteDocument);

module.exports = router;
