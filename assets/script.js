var data = [
    {
      q : "What… is your name?",
      o : [
        "Sir Robin",
        "Sir Lancelot",
        "Sir Galahad",
        "King Arthur"
      ],
      a : 1 // arrays start with 0, so answer is 70 meters
    },
    {
      q : " What… is your quest?",
      o : [
        "To seek the Holy Conquest",
        "V",
        "We don't talk about the quest",
        "To seek the Holy Grail"
      ],
      a : 3
    },
    {
      q : "What is your favorite color?",
      o : [
        "Yellow",
        "Red",
        "Blue",
        "Green"
      ],
      a : 2
    },
    {
      q : "What… is your name?",
      o : [
        "Sir Robin",
        "Sir Lancelot",
        "Sir Galahad",
        "King Arthur"
      ],
      a : 0
    },
    {
      q : "What… is your quest?",
      o : [
        "To seek the Holy Conquest",
        "Auuuuuuuugh",
        "Pacific Ocean",
        "To seek the Holy Grail"
      ],
      a : 3
    },
    {
      q : "What… is the capital of Assyria?",
      o : [
        "Assur",
        "Assyria?",
        "Austin",
        "I don't know"
      ],
      a : 3
    }
]
var start = document.getElementById("start");
var startButton = document.getElementById("startButton");
var quiz = document.getElementById("quiz");
var highscore = document.getElementById("highscore");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var result = document.getElementById("result");
var radioButtons = document.querySelectorAll("input[name='answer']");
var submitButton = document.getElementById("submit");
var highscoreButton = document.getElementById("highscoreButton");
var restart = document.getElementById("restart");
var count = 0;
var time = 45;
// the draw function draws the question and answers based on the count variable.
function draw() {
    question.innerHTML = data[count].q;
    for(var i = 0; i < data[count].o.length; i++) {
        //console.log(data[count].o[i]);
        answers.innerHTML += "<input type='radio' name='answer' value='" + i + "'>" + data[count].o[i] + "<br>";
    }
}
// the undraw function is self-explanatory. It removes the question and answers from the page.
function undraw() {
    answers.innerHTML = "";
}
// the check function checks if the answer is correct or not and regardless of the result it will move to the next question.
function check() {
    var radioButtons = document.querySelectorAll("input[name='answer']");
    for(radioButtons of radioButtons) {
        if(radioButtons.checked) {
            //console.log("checked");
            if(radioButtons.value == data[count].a) {
                result.innerHTML = "Correct!";
                //console.log("Correct!");
            }else {
                result.innerHTML = "Wrong!";
                //console.log("Wrong!");
                time -= 5;
            }
        }
    }
    count++;
    //console.log("question " + count);
}
// the switchScreen function switches the screen from one to another by making all the id's hidden and showing the one that is called.
function switchScreen(destination) {
    start.style.display = "none";
    quiz.style.display = "none";
    highscore.style.display = "none";
    destination.style.display = "flex";

}
// the timer also functioning as the score is started by the setTimer function.
function setTimer(){
  var timer = setInterval(function(){
    time--;
    document.getElementById("timer").innerHTML = time;
    if(time == 0) {
      document.getElementById("timer").innerHTML = "00";
      clearInterval(timer);
      switchScreen(highscore);
      time = 45;
    }
    if(count == data.length) {
      clearInterval(timer);
    }
  }, 1000);
}

// game code starts here
switchScreen(start);
for(var i = 0; i < localStorage.length; i++) {
  newText = document.createElement("li");
  newText.innerHTML = localStorage.key(i) + ": " + localStorage.getItem(localStorage.key(i));
  highscore.children[0].appendChild(newText);
}
// the start button starts the game and switches to the quiz screen.
startButton.onclick = function() {
  switchScreen(quiz);
  draw();
  setTimer();
}
// the submit button checks the answer and moves to the next question.
submitButton.onclick = function() {
  check();
  undraw();
  //console.log(data.length);
  // below is the end of the game it stores the score in local which will be used to display the highscore.
  if(count == data.length) {
    let user = prompt("Enter your name");
    localStorage.setItem(user, time);
    newText = document.createElement("li");
    newText.innerHTML = (user + ": " + time);
    highscore.children[0].appendChild(newText);
    switchScreen(highscore);
  }else {
    draw();
  }
}


// the highscore button switches to the highscore screen.
highscoreButton.onclick = function() {
  undraw();
  switchScreen(highscore);
  time = 1;
}
// the restart button is contained on the highscore screen and it restarts the game.
restart.onclick = function() {
  undraw();
  switchScreen(start);
  // prevents the user from breaking the game if they view the highscore screen mid game.
  time = 45;
  count = 0;
}


