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
    image: { type: String, default: '/images/course.jpg' },
    slug: { type: String, slug: 'name', unique: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Account' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    homeworks: [{ type: Schema.Types.ObjectId, ref: 'Homework' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
