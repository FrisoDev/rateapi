const mongoose = require('../config/database')
const { Schema } = mongoose

const evalSchema = new Schema({
  date: { type: Date, default: Date.now },
  evaluation: { type: Number, default: 0},
  note: { type: String}
})

const studentSchema = new Schema({
  name: { type: String, default: "Big Shaq"},
  evaluations: [evalSchema],
  image_url: { type: String, default: "https://i2.wp.com/www.kingsizemag.se/wp-content/uploads/2017/11/big-shaq-genius-mans-not-ls.jpg" },
});

const batchSchema = new Schema({
  batchNumber: { type: Number, default: 11},
  students: [studentSchema],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {usePushEach:true})

module.exports = mongoose.model('batches', batchSchema)
