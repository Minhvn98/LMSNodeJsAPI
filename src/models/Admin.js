const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', AdminSchema);
