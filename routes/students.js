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
    const changedStudent = req.body

    if (changedStudent.evaluations[changedStudent.evaluations.length-1].date === changedStudent.evaluations[changedStudent.evaluations.length-2].date )
       {changedStudent.evaluations.splice((changedStudent.evaluations.length-2), 1)}

     Student.findByIdAndUpdate(id, { $set: changedStudent }, { new: true })
       .then((student) => res.json(student))
       .catch((error) => next(error))
    })

  .patch('/students/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const studentRate = req.body

    Student.findById(id)
     .then((student) => {
       if (!student) { return next() }
       if (student.evaluations[student.evaluations.length-1].date ===  studentRate.date)
          {student.evaluations.splice((student.evaluations.length-1), 1)}
      student.evaluations.push(studentRate)

       Student.findByIdAndUpdate(id, { $set: student }, { new: true })
         .then((student) => res.json(student))
         .catch((error) => next(error))
     })
     .catch((error) => next(error))
})



module.exports = router
