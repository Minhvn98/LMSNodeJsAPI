const express = require('express')
const router = express.Router()

const courseController = require('../controllers/course.controller')

router.route('/')
  .get(courseController.index)
  .post(courseController.createCourse)

module.exports = router