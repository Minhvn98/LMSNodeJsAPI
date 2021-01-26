const express = require('express');
const router = express.Router();

const { validateCourse } = require('../validators/course.validator');
const courseController = require('../controllers/course.controller');

router
  .route('/')
  .get(courseController.index)
  .post(validateCourse(), courseController.createCourse);

module.exports = router;
