const Course = require('../models/Course')
const Comment = require('../models/detais_course/Comment')
const Document = require('../models/detais_course/Document')
const Homework = require('../models/detais_course/Homework')
const Lesson = require('../models/detais_course/Lesson')

const index = function (req, res, next) {
  Course.find({})
    .populate('comments')
    .populate('documents')
    .populate('homeworks')
    .populate('lessons')
    .then((courses) => res.status(200).json(courses))
    .catch(err => next(err))
}

const createCourse = function(req, res, next) {
  res.status(200).json(req.body)
}


module.exports = {
  createCourse,
  index,
}
