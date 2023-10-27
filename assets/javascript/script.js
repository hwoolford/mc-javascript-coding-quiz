const timeEl = document.getElementById("timer");
const startEl = document.getElementById("start-element");
const quizEl = document.getElementById("quiz-element");
const questions = document.getElementById("question-container")
const startBtn = document.getElementById("start-button");
const answerBtnContainer = document.getElementById("answer-btn-container");
const answerBtns = document.querySelectorAll(".answer");
const evaluate = document.getElementById("evaluation");
const evaluateEl = document.getElementById("evaluation-element");
const scoreEl = document.getElementById("score-container");
const yourScore = document.getElementById("score");
const backBtn = document.getElementById("back");
const clearBtn = document.getElementById("clear");
const viewHighLink = document.getElementById("view-high");
const initialsUser = document.getElementById("initials-text-box");
const submitBtn = document.getElementById("submit-button");
const highScoreEl = document.getElementById("high-score-container");
const hScoreTextBox = document.getElementById("score-text-box");

let timeLeft = 40;

//This array of objects stores all the questions and answer choices.
const quizArray = [
    {
        question: "Which of the following methods is used to access HTML elements using JavaScript?",
        answers: ["getElementById()", "getElementsByClassName()", "Both A and B", "None of the above"],
        correctAnswer: "Both A and B"    
    },
    {
        question: "Which function is used to serialize an object into a JSON string in JavaScript?",
        answers: ["stringify()", "parse()", "convert()", "None of the above"],
        correctAnswer: "stringify()"    
    },
    {
        question: "Which of the following are closures in JavaScript?",
        answers: ["Variables", "Functions", "Objects", "All of the above"],
        correctAnswer: "All of the above"    
    },
    {
        question: "How do you stop an interval timer in JavaScript?",
        answers: ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
        correctAnswer: "clearInterval"    
    },
    {
        question: "How is a comment written in JavaScript?",
        answers: ["/* */", "//", "#", "$ $"],
        correctAnswer: "//"    
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answers: ["It is an ordered list of objects", "It is an ordered list of functions", "It is an ordered list of values", "It is an ordered list of string"],
        correctAnswer: "It is an ordered list of values"    
    },
    {
        question: "Which of the following is the main entry point to all client-side JavaScript features and APIs?",
        answers: ["Position", "Standard", "Location", "Window"],
        correctAnswer: "Window"    
    },
    {
        question: "Why are event handlers needed in JavaScript?",
        answers: ["Allows JavaScript code to alter the behavior of windows", "Adds innerHTML page to the code", "Changes the server location", "Performs handling of exceptions and occurrences"],
        correctAnswer: "Allows JavaScript code to alter the behavior of windows"    
    },
    {
        question: "Which Window object method is used to display a message in a dialog box?",
        answers: ["prompt()", "message()", "alert()", "console.log"],
        correctAnswer: "alert()"    
    },
    {
        question: "In JavaScript the x===y statement implies that:",
        answers: ["Both x and y are equal in value, type and reference address as well.", "Both are x and y are equal in value only.", "Both are equal in the value and data type.", "Both are not same at all."],
        correctAnswer: "Both are equal in the value and data type."    
    }
];

// Switching from start page to quiz page
    startBtn.addEventListener("click", function() {
    quizEl.style.display = "block"
    startEl.style.display = "none"
    setTime();
    showQuestion();
})

  // This function provides the questions and answer choices.
  let currentQuestion = 0;

function showQuestion() {
    questions.innerHTML = quizArray[currentQuestion].question;
    let answerChoices = quizArray[currentQuestion].answers;
    let answerButtons = document.createElement("div");
  
    for (let i = 0; i < answerChoices.length; i++) {
      let answerChoice = document.createElement("button");
      answerChoice.className = "answer";
      answerChoice.innerHTML = answerChoices[i];
      answerChoice.addEventListener("click", function() {
        answerButtons.innerHTML = "";
        checkAnswer(this);
      });
      answerButtons.appendChild(answerChoice);
    }
  
      quizEl.appendChild(answerButtons);
  }

  // This function checks that the selected answer is correct
  function checkAnswer(answerChoice) {
    if (answerChoice.innerHTML == quizArray[currentQuestion].correctAnswer) {
        evaluate.textContent = "CORRECT!";
    } else {
        evaluate.textContent = "INCORRECT!";
        timeLeft -= 9;
    }
    currentQuestion++;
    if (currentQuestion < quizArray.length) {
        showQuestion();
    } else {
        showScore();
    }
  }

// This function shows the score
function showScore() {
    scoreEl.style.display = "block";
    quizEl.style.display = "none";
    evaluateEl.style.display = "none";
    yourScore.innerHTML = "Your final score is " + timeLeft;

    submitBtn.addEventListener("click", setScore);
}

// This function collects the initials and sets the initials and score into local storage.
function setScore () {
    let inputValue = (initialsUser).value;
    let highScore = JSON.parse(localStorage.getItem("finalScore")) || []
    let userScore = {
        time: timeLeft,
        initials: inputValue
    };
    highScore.push(userScore);
    localStorage.setItem("finalScore", JSON.stringify(highScore));

    getHighScore();
}

// Switches to high score screen and outputs the time and initials to the textbox.
function getHighScore() {
    highScoreEl.style.display = "block";
    scoreEl.style.display = "none";
    startEl.style.display = "none";
    quizEl.style.display = "none";
    evaluateEl.style.display = "none";
    let highScores = JSON.parse(localStorage.getItem("finalScore"));
    highScores.sort((a, b) => b.time - a.time);
    hScoreTextBox.innerHTML = "";
    for (let i = 0; i < highScores.length; i++) {  
        let score = highScores[i];
        let scoreText = score.initials + " - " + score.time
        hScoreTextBox.innerHTML += scoreText + "<br>";
    }
}


// Clears local storage when "clear scores" button is clicked
function clearScores() {
        localStorage.clear();
}




// Display high scores when "View high scores" link is clicked.
viewHighLink.addEventListener("click", getHighScore);




// Timer code
function setTime() {
    const timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        if(timeLeft <= 0 || currentQuestion > 9) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
}

