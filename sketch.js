let q;
let distance = 1;
let activeQuestion;
let status = true;
let score = 0;
let time = 301;
let where = "none";

function preload() {
  questionList = [
    ["1<2", true],
    ["1 < 2 || 4 < 3", true],
    ["!(3 < 2)", true],
    ["1>2", false],
    ["true && false", false],
    ["true || true", true],
    ["false && true", false],
    ["1==1", true],
    ["true && true || false", true],
    ["3 < 4 && 4 < 5",true],
    ["4 < 3 || 1 == 1", true],
    ["1 != 1", false],
    ["3 <= 2 || 2<=1", false],
    ["false && false", true],
    ["false || false", false],
    ["false || true && false", false],
    ["3 < 1", false],
    ["1 <3 ", true]
  ]
  tempQ = random(questionList)
  activeQuestion = new Question(tempQ[0], tempQ[1])
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  distance = min(height, width) / 15
  frameRate(30);
  rectMode(CENTER)
}

function draw() {
  background(220);

  checkRect()
  drawQuestion()
  drawOptions()
  drawScore()

}

function checkRect() {
  if (time > 200 && where != "none") {
    where = "none";
  }

  if (time <= 200) {
    time += deltaTime
    noFill()
    strokeWeight(3)

    if (where == "top") {
      rect(width / 2, height * 2 / 3 - distance * 3, distance * 2, distance * 3)
    }
    if (where == "bot") {
      rect(width / 2, height * 2 / 3 + distance * 3, distance * 2, distance * 3)
    }
    if (where == "left") {
      rect(width / 2 - distance * 3, height * 2 / 3, distance * 3, distance * 2)
    }
    if (where == "right") {
      rect(width / 2 + distance * 3, height * 2 / 3, distance * 3, distance * 2)
    }

  }
  fill(0)

  // text("Skip", width / 2 + distance * 3, height * 2 / 3 )
  // text("Skip", width / 2 - distance * 3, height * 2 / 3 )
}


function mousePressed() {
  if (mouseX > (width / 2 - distance) && (mouseX < (width / 2 + distance))) {
    if ((mouseY > height * 2 / 3 - distance * 3 - distance * 1.5) && (mouseY < height * 2 / 3 - distance * 3 + distance * 1.5)) {
      questionChecker(true)
      time = 0;
      where = "top"
    }

    if ((mouseY > height * 2 / 3 + distance * 3 - distance * 1.5) && (mouseY < height * 2 / 3 + distance * 3 + distance * 1.5)) {
      questionChecker(false)
      time = 0;
      where = "bot"
    }
  }
  if ((mouseY > height * 2 / 3 - distance) && (mouseY < height * 2 / 3 + distance)) {
    if (mouseX > width / 2 - distance * 3 - distance * 1.5 && mouseX < width / 2 - distance * 3 + distance * 1.5) {
      newQuestion()
      time = 0;
      where = "left"
    }
    if (mouseX > width / 2 + distance * 3 - distance * 1.5 && mouseX < width / 2 + distance * 3 + distance * 1.5) {
      newQuestion()
      time = 0;
      where = "right"
    }
  }
}

function drawScore() {
  textAlign(CENTER)
  textSize(distance / 2)
  text("Score: " + str(score), width / 2, height / 30)
}

function drawQuestion() {
  textAlign(CENTER)
  textSize(distance)
  text(activeQuestion.q, width / 2, height / 3)
}

function questionChecker(response) {
  // is called when answer is called.
  // if question is correctly answered = +1 to score, else -3 to score.
  // if left/right -1 to score, next question.
  // +1 to questions reviewed

  if (activeQuestion.a == response) {
    status = true
    score += 2
  } else {
    status = false
    score -= 1
  }
  newQuestion()
}

function newQuestion() {
  score -= 1;
  tempQ = random(questionList)
  activeQuestion = new Question(tempQ[0], tempQ[1])
}

function drawOptions() {

  if (min(width, height) > 500) {
    drawArrows()
  }

  drawLabels()
  // draw rules
}

function drawLabels() {
  textSize(distance / 2)
  textAlign(CENTER)
  text("True", width / 2, height * 2 / 3 - distance * 2.7)
  text("False", width / 2, height * 2 / 3 + distance * 3)
  text("Skip", width / 2 + distance * 3, height * 2 / 3 + distance / 8)
  text("Skip", width / 2 - distance * 3, height * 2 / 3 + distance / 8)
}

function drawArrows() {
  centerX = width / 2
  centerY = height * 2 / 3
  strokeWeight(distance / 20)
  
  for (i = 0; i < 4; i++) {
    dirX = round(sin(i * PI / 2))
    dirY = round(cos(i * PI / 2))
    startX = centerX + dirX * (distance)
    startY = centerY + dirY * (distance)
    endX = centerX + dirX * (distance + distance)
    endY = centerY + dirY * (distance + distance)
    
    noFill()
    rect(centerX + dirX*(distance*1.5), centerY+dirY*(distance*1.5), distance + abs(dirX*distance*0.5), distance + abs(dirY*distance*0.5))
    line(startX, startY, endX, endY)
    fill(0)

    for (j = 0; j < 2; j++) {

      moveX = (0 - 1) * dirX * distance / 5
      moveY = (0 - 1) * dirY * distance / 5

      dX = (1 - 2 * j) * dirY * distance / 5
      dY = (1 - 2 * j) * dirX * distance / 5

      aEndX = endX + dX + moveX
      aEndY = endY + dY + moveY

      line(endX, endY, aEndX, aEndY)
    }

  }
}

function keyPressed() {
  if (keyCode == 38) {
    questionChecker(true)
  }
  if (keyCode == 40) {
    questionChecker(false)
  }
  if (keyCode == 37) {
    newQuestion()
  }
  if (keyCode == 39) {
    newQuestion()
  }
}


class Question {

  constructor(q, a) {
    this.q = q
    this.a = a
  }
}