const algo = (students) => {

  const stuChoice = Math.floor(Math.random(1..100))
  const students = []

  const red = students.filter((e) => (e.evaluations.color == "red"))
  const yellow = students.filter((e) => (e.evaluations.color == "yellow"))
  const green = students.filter((e) => (e.evaluations.color == "green"))

  if(stuChoice <= 17){
    return green
  }
  if(stuChoice > 17 && stuChoice <= 50){
    return yellow
  }
  if(stuChoice > 50){
    return red
  }
}

module.exports = algo
