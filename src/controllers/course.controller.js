const Account = require('../models/Account');
const Course = require('../models/Course');
const Comment = require('../models/detais_course/Comment');
const Document = require('../models/detais_course/Document');
const Homework = require('../models/detais_course/Homework');
const Lesson = require('../models/detais_course/Lesson');

//[GET] /courses
const index = async function (req, res, next) {
  const courses = await Course.find({})
    .populate('comments')
    .populate('documents')
    .populate('homeworks')
    .populate('lessons');

  res.status(200).json(courses);
};

//[POST] /courses
const createCourse = async function (req, res, next) {
  const file = req.file;

  if (file) req.value.body.image = file.path.split('public')[1];

  const course = new Course(req.value.body);
  course.save();

  const teacher = await Account.findById(course.teacher);
  teacher.courses.push(course.id);
  teacher.save();

  res.status(201).json({ course });
};

//[DELETE] /course/:id
const deleteCourse = async function (req, res, next) {
  const { id: courseId } = req.value;

  const course = await Course.findById(courseId);
  await course.remove();

  const teacher = await Account.findById(course.teacher);
  teacher.courses.pull(course._id);
  await teacher.save();

  res.json({ success: true });
};

//[GET] /courses/:id
const getCourse = async function (req, res, next) {
  const course = await Course.findById(req.value.id);

  if (!course)
    return res.status(400).json({
      message: 'Course not found!',
    });

  res.status(200).json({ course });
};

//[PUT] /coures/:id
const replaceCourse = async function (req, res, next) {
  const { id: courseId } = req.value;
  const { body: dataUpdate } = req.value;

  const file = req.file;
  if (file) req.value.body.image = file.path.split('public')[1];

  await Course.findByIdAndUpdate(courseId, dataUpdate);

  res.status(200).json({ success: true });
};

//[PATCH] /coures/:id
const upadteCourse = async function (req, res, next) {
  const { id: courseId } = req.value;
  const { body: dataUpdate } = req.value;

  const file = req.file;
  if (file) req.value.body.image = file.path.split('public')[1];

  await Course.findByIdAndUpdate(courseId, dataUpdate);

  res.status(200).json({ success: true });
};

module.exports = {
  createCourse,
  deleteCourse,
  index,
  getCourse,
  replaceCourse,
  upadteCourse,
};
