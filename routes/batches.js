const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches', (req, res, next) => {
  Batch.find()
    .sort({ createdAt: -1 })
    .then((batches) => res.json(batches))
    .catch((error) => next(error))
  })

  .get('/batches/:id', (req, res, next) => {
    const id = req.params.id

   Student.find({ batchId: id})
      .then((student) => {
    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        batch.students = student
        batch.save()
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  })
  .post('/batches', authenticate, (req, res, next) => {
    let newBatch = req.body

    Batch.create(newBatch)
      .then((batch) => res.json(batch))
      .catch((error) => next(error))
  })

  .put('/batches/:id', authenticate, (req, res, next) => {
  const id = req.params.id
  const students = req.body.students

  function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  var rand = randomInt(1,100)

  var updatedBatch = req.body

  var green = students.filter(student =>
    student.evaluations[student.evaluations.length-1].color === "green")

  var yellow = students.filter(student =>
    student.evaluations[student.evaluations.length-1].color === "yellow")

  var red = students.filter(student =>
     student.evaluations[student.evaluations.length-1].color === "red")

  if(rand <= 17){
    var studentGroup = green
  }
  if(rand > 17 && rand <= 50){
    var studentGroup = yellow
  }
  if(rand > 50){
    var studentGroup = red
  }

  var pickedStudent = studentGroup[Math.floor(Math.random() * studentGroup.length)]

 Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
   .then((batch) => res.json(pickedStudent))
   .catch((error) => next(error))
})


module.exports = router
