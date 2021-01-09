const express = require('express')
const router = express.Router()

const lectureController = require('../controllers/lecture.controller')

router.route('/')
  .get(lectureController.index)
  .post(lectureController.createLecture)


module.exports = router