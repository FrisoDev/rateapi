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
    var stuGroup = green
  }
  if(rand > 17 && rand <= 50){
    var stuGroup = yellow
  }
  if(rand > 50){
    var stuGroup = red
  }

  var fkdStudent = stuGroup[Math.floor(Math.random() * stuGroup.length)]

 Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
   .then((batch) => res.json(fkdStudent))
   .catch((error) => next(error))
})


module.exports = router
