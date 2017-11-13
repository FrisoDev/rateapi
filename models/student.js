// models/game.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  evalDay: { type: Date, default: Date.now },
  evalColor: { type: Number, default: 0 },
  evalText: { type: String, default: false },
});

const studentSchema = new Schema({
  studentName: { type: String, default: false },
  studentImage: { type: String, default: false },
  currentColor: { type: Number, default: 0 },
  studentEval: [evaluationSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('students', studentSchema)
