const mongoose = require('../config/database')
const { Schema } = mongoose


const evaluationSchema = new Schema({
  color: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  note: { type: String },
});
const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String },
  evaluations: [evaluationSchema],
  batchNo: { type: Schema.Types.ObjectId, ref: 'batches' }
});

module.exports = mongoose.model('students', studentSchema)
