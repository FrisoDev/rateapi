.put('/batches/:id', authenticate, (req, res, next) => {

  const students = req.body.students

  const red = students.filter((e) => (e.evaluations.color === "red"))
  const yellow = students.filter((e) => (e.evaluations.color === "yellow"))
  const green = students.filter((e) => (e.evaluations.color === "green"))
  const rand = Math.floor(Math.random(1..100))

    if(rand <= 17){
      return green
    }
    if(rand > 17 && rand <= 50){
      return yellow
    }
    if(rand > 50){
      return red
    }
  }
module.exports = studentSelector
