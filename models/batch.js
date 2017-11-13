// models/game.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'students' },
});

const batchSchema = new Schema({
  batchNumber: { type: Number, default: 0 },
  students: [studentSchema],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('batches', batchSchema)
