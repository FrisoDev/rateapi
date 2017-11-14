const mongoose = require('../config/database')
const { Schema } = mongoose
const students = require('./student').schema

const batchSchema = new Schema({
  batchNumber: { type: Number, default: 11},
  students: [students],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {usePushEach:true})


module.exports = mongoose.model('batches', batchSchema)
