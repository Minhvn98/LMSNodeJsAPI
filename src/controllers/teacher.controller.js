const User = require('../models/User');

//[GET] /teachers
const index = function (req, res, next) {
  User.find({ role: 1 })
    .then((lectures) => res.status(200).json(lectures))
    .catch((err) => next(err));
};

//[POST] /teachers
const createTeacher = async function (req, res, next) {
  const teacher = await User.findOne({ email: req.body.email });
  // check email
  if (teacher)
    return res.status(403).json({
      error: {
        message: 'Email is already in use.',
      },
    });

  const newTeacher = await new User(req.value.body);
  await newTeacher.save();
  res.status(201).json({
    teacher: newTeacher,
  });
};

//[DELETE] /teachers/:id
const deleteTeacher = async function (req, res, next) {
  const teacher = await User.findById(req.value.id);

  if (!teacher)
    return res.status(400).json({
      message: 'Teacher not found!',
    });

  res.status(200).json({
    success: true,
  });
};

//[GET] /teachers/:id
const getTeacher = async function (req, res, next) {
  const teacher = await User.findById(req.value.id);
  res.status(200).json(teacher);
};

//[PUT] /teachers/:id
const repalceTeacher = async function (req, res, next) {
  const fileAvatar = req.file;
  if (fileAvatar) {
    req.value.body.avatar = fileAvatar.path.split('public')[1];
  }

  const teacher = await User.findByIdAndUpdate(req.value.id, req.value.body);

  if (!teacher)
    return res.status(400).json({
      error: {
        message: 'Update failed!',
      },
    });

  res.status(200).json(teacher);
};

//[PATCH] /teachers/:id
const updateTeacher = async function (req, res, next) {
  const fileAvatar = req.file;
  if (fileAvatar) {
    req.value.body.avatar = fileAvatar.path.split('public')[1];
  }

  const teacher = await User.findByIdAndUpdate(req.value.id, req.value.body);

  if (!teacher)
    return res.status(400).json({
      error: {
        message: 'Teacher not found!',
      },
    });

  res.status(200).json(teacher);
};

module.exports = {
  createTeacher,
  deleteTeacher,
  index,
  getTeacher,
  repalceTeacher,
  updateTeacher,
};
