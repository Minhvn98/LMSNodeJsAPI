const Course = require('../models/Course');
const Homework = require('../models/detais_course/Homework');

//[POST] /homeworks
const createHomework = async function (req, res, next) {
  const coursePromise = Course.findById(req.value.body.course);
  const file = req.file;

  req.value.body.filePath = file ? file.path.split('public')[1] : '#';

  const homework = new Homework(req.value.body);
  await homework.save();

  const course = await coursePromise;
  course.homeworks.push(homework._id);
  await course.save();

  res.status(200).json({ homework });
};

//[DELETE] /homeworks/:id
const deleteHomework = async function (req, res, next) {
  const homework = await Homework.findById(req.value.id);
  homework.remove();

  const course = await Course.findById(homework.course);
  course.homeworks.pull(homework._id);
  course.save();

  res.status(200).json({ success: true });
};

//[GET] /homeworks/:id
const getHomework = async function (req, res, next) {
  const homework = await Homework.findById(req.value.id);

  if (!homework)
    return res.status(400).json({ message: 'Homework not found!' });

  res.status(200).json({ homework });
};

//[GET] /homeworks
const index = async function (req, res, next) {
  const homeworks = await Homework.find({});
  res.status(200).json({ homeworks });
};

//[PUT] /homeworks/:id
const replaceHomework = async function (req, res, next) {
  const homeworkId = req.value.id;
  const file = req.file;

  if (file) req.value.body.filePath = file.path.split('public')[1];

  await Homework.findByIdAndUpdate(homeworkId, req.value.body);

  res.status(200).json({ success: true });
};

//[PATCH] /homeworks/:id
const updateHomework = async function (req, res, next) {
  const homeworkId = req.value.id;
  const file = req.file;

  if (file) req.value.body.filePath = file.path.split('public')[1];

  await Homework.findByIdAndUpdate(homeworkId, req.value.body);

  res.status(200).json({ success: true });
};

module.exports = {
  createHomework,
  deleteHomework,
  getHomework,
  index,
  replaceHomework,
  updateHomework,
};
