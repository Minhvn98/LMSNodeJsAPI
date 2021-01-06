const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const { Schema } = mongoose;
mongoose.plugin(slug);

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    categories: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
    lecture: { type: Schema.Types.ObjectId, ref: 'Lecture' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    homeworks: [{ type: Schema.Types.ObjectId, ref: 'Homework' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);