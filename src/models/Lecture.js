const mongoose = require('mongoose');
const { Schema } = mongoose;

const LectureSchema = new Schema(
  {
    avatar: { type: String, default: '/images/avatar.jpg' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: String,
    phone: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lecture', LectureSchema);
