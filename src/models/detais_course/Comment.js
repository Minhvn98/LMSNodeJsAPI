const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
