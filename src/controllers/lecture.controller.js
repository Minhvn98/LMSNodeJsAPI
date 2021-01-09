const Account = require('../models/Account')

const index = function(req, res, next) {
  Account.find({role: 1})
    .then(lectures => res.status(200).json(lectures))
    .catch(err => next(err))
}

const createLecture = function(req, res, next) {
  const { email, name, password, phone } = req.body

  const lecture = { email, name, password, phone, role: 1}
  console.log(lecture)
  res.status(200).json(lecture)
}

module.exports = {
  createLecture,
  index
}