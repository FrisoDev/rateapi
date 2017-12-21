const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/students/:id', authenticate, (req, res, next) => {
  const id = req.params.id

   Student.findById(id)
    .then((student) => {
      if (!student) { return next() }
      res.json(student)
      })
    .catch((error) => next(error))
})


  .post('/students', authenticate, (req, res, next) => {
      let newStudent = req.body

      Student.create(newStudent)
       .then((student) => res.json(student))
       .catch((error) => next(error))
  })

  .put('/students/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const updatedStudent = req.body

     Student.findByIdAndUpdate(id, { $set: updatedStudent }, { new: true })
       .then((student) => res.json(student))
       .catch((error) => next(error))
    })

  .patch('/students/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const studentEval = req.body

    Student.findById(id)

     .then((student) => {
       if (!student) { return next() }
       if (student.evaluations[student.evaluations.length-1].date ===  studentEval.date)
          {student.evaluations.splice((student.evaluations.length-1), 1)}
      student.evaluations.push(studentEval)

       Student.findByIdAndUpdate(id, { $set: student }, { new: true })
         .then((student) => res.json(student))
         .catch((error) => next(error))
     })
     .catch((error) => next(error))

})
     .delete('/students/:id', authenticate, (req, res, next) => {
       const id = req.params.id

       Student.findByIdAndRemove(id)
        .then(() => {
              res.status = 200
              res.json({
               message: 'Shits gone',
               _id: id
             })
           })
       .catch((error) => next(error))
})
module.exports = router
