const mongoose = require('mongoose');
const { Schema } = mongoose;

const LessonSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model('Lesson', LessonSchema);
