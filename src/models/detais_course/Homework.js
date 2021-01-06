const mongoose = require('mongoose');
const { Schema } = mongoose;

const HomeworkSchema = new Schema(
  {
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    title: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Homework', HomeworkSchema);