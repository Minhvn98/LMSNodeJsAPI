const Course = require('../models/Course');
const Lesson = require('../models/detais_course/Lesson');

//[POST] /lessons
const createLesson = async function (req, res, next) {
  const coursePromise = Course.findById(req.value.body.course);
  const file = req.file;

  req.value.body.filePath = file ? file.path.split('public')[1] : '#';

  const lesson = new Lesson(req.value.body);
  await lesson.save();

  const course = await coursePromise;
  course.lessons.push(lesson._id);
  await course.save();

  res.status(200).json({ lesson });
};

//[DELETE] /lessons/:id
const deleteLesson = async function (req, res, next) {
  const lesson = await Lesson.findById(req.value.id);
  lesson.remove();

  const course = await Course.findById(lesson.course);
  course.lessons.pull(lesson._id);
  course.save();

  res.status(200).json({ success: true });
};

//[GET] /lessons/:id
const getLesson = async function (req, res, next) {
  const lesson = await Lesson.findById(req.value.id);

  if (!lesson) return res.status(400).json({ message: 'Lesson not found!' });

  res.status(200).json({ lesson });
};

//[GET] /lessons
const index = async function (req, res, next) {
  const lessons = await Lesson.find({});
  res.status(200).json({ lessons });
};

//[PUT] /lessons/:id
const replaceLesson = async function (req, res, next) {
  const lessonId = req.value.id;
  const file = req.file;

  if (file) req.value.body.filePath = file.path.split('public')[1];

  await Lesson.findByIdAndUpdate(lessonId, req.value.body);

  res.status(200).json({ success: true });
};

//[PATCH] /lessons/:id
const updateLesson = async function (req, res, next) {
  const lessonId = req.value.id;
  const file = req.file;

  if (file) req.value.body.filePath = file.path.split('public')[1];

  await Lesson.findByIdAndUpdate(lessonId, req.value.body);

  res.status(200).json({ success: true });
};

module.exports = {
  createLesson,
  deleteLesson,
  getLesson,
  index,
  replaceLesson,
  updateLesson,
};
