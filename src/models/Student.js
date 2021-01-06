const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    avatar: { type: String, default: '/images/avatar.jpg' },
    courses: [{ type: Schema.Types.ObjectId }],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.Model('Student', StudentSchema);
