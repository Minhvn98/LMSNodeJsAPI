const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    avatar: { type: String, default: '/images/avatar.jpg' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    email: { type: String, unique: true, lowercase: true, required: true },
    name: { type: String, required: true },
    password: String,
    phone: String,
    role: { type: Number, default: 2 },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(this.password, salt);
    this.password = passwordHashed;
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema);
