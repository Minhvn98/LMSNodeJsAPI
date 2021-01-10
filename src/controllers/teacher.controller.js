const Account = require('../models/Account');
const bcrypt = require('bcryptjs');

const index = function (req, res, next) {
  Account.find({ role: 1 })
    .then((lectures) => res.status(200).json(lectures))
    .catch((err) => next(err));
};

const createTeacher = async function (req, res, next) {
  const teacher = await Account.findOne({ email: req.body.email });
  // check email
  if (teacher)
    return res.status(403).json({
      error: {
        message: 'Email is already in use.',
      },
    });

  const newTeacher = await new Account(req.value.body);
  await newTeacher.save();
  res.status(201).json({
    newTeacher,
  });
};

const getTeacher = async function (req, res, next) {
  const teacher = await Account.findById(req.value.id);
  res.status(200).json(teacher);
};


const updateTeacher = async function (req, res, next) {
  const teacher = await Account.findById(req.value.id);
  console.log(req.file)
  res.json(req.value.body)
}

module.exports = {
  createTeacher,
  index,
  getTeacher,
  updateTeacher
};
