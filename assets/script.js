var data = [
    {
      q : "What is the standard distance between the target and archer in Olympics?",
      o : [
        "50 meters",
        "70 meters",
        "100 meters",
        "120 meters"
      ],
      a : 1 // arrays start with 0, so answer is 70 meters
    },
    {
      q : "Which is the highest number on a standard roulette wheel?",
      o : [
        "22",
        "24",
        "32",
        "36"
      ],
      a : 3
    },
    {
      q : "How much wood could a woodchuck chuck if a woodchuck would chuck wood?",
      o : [
        "400 pounds",
        "550 pounds",
        "700 pounds",
        "750 pounds"
      ],
      a : 2
    },
    {
      q : "Which is the seventh planet from the sun?",
      o : [
        "Uranus",
        "Earth",
        "Pluto",
        "Mars"
      ],
      a : 0
    },
    {
      q : "Which is the largest ocean on Earth?",
      o : [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean"
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

function draw() {
    question.innerHTML = data[count].q;
    for(var i = 0; i < data[count].o.length; i++) {
        //console.log(data[count].o[i]);
        answers.innerHTML += "<input type='radio' name='answer' value='" + i + "'>" + data[count].o[i] + "<br>";
    }
}
function undraw() {
    answers.innerHTML = "";
}
function check() {
    var radioButtons = document.querySelectorAll("input[name='answer']");
    for(radioButtons of radioButtons) {
        if(radioButtons.checked) {
            //console.log("checked");
            if(radioButtons.value == data[count].a) {
                result.innerHTML = "Correct!";
                console.log("Correct!");
            }else {
                result.innerHTML = "Wrong!";
                console.log("Wrong!");
                time -= 5;
            }
        }
    }
    count++;
    console.log("question " + count);
    undraw();
    draw();
}
function switchScreen(destination) {
    start.style.display = "none";
    quiz.style.display = "none";
    highscore.style.display = "none";
    destination.style.display = "flex";

}
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
    highscoreButton.onclick = function() {
      clearInterval(timer);
      switchScreen(highscore);
    }
  }, 1000);
}

// game code starts here
switchScreen(start);
startButton.onclick = function() {
  switchScreen(quiz);
  draw();
  setTimer();
}
submitButton.onclick = function() {
  check();
}
highscoreButton.onclick = function() {
  switchScreen(highscore);
}
restart.onclick = function() {
  switchScreen(start);
  undraw();
  time = 45;
  count = 0;
}


