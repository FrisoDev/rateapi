const algo = require('./algo')

const studentSelector = (students) => {

  const students = algo(students)
  return students[Math.floor(Math.random()*students.length)];

}
module.exports = studentSelector
