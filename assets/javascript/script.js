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
        question: "Question 1",
        answers: ["Answer1a", "Answer1b", "Answer1c", "Answer1d"],
        correctAnswer: "Answer1a"    
    },
    {
        question: "Question 2",
        answers: ["Answer2a", "Answer2b", "Answer2c", "Answer2d"],
        correctAnswer: "Answer2b"    
    },
    {
        question: "Question 3",
        answers: ["Answer3a", "Answer3b", "Answer3c", "Answer3d"],
        correctAnswer: "Answer3c"    
    },
    {
        question: "Question 4",
        answers: ["Answer4a", "Answer4b", "Answer4c", "Answer4d"],
        correctAnswer: "Answer4d"    
    },
    {
        question: "Question 5",
        answers: ["Answer5a", "Answer5b", "Answer5c", "Answer5d"],
        correctAnswer: "Answer5a"    
    },
    {
        question: "Question 6",
        answers: ["Answer6a", "Answer6b", "Answer6c", "Answer6d"],
        correctAnswer: "Answer6b"    
    },
    {
        question: "Question 7",
        answers: ["Answer7a", "Answer7b", "Answer7c", "Answer7d"],
        correctAnswer: "Answer7c"    
    },
    {
        question: "Question 8",
        answers: ["Answer8a", "Answer8b", "Answer8c", "Answer8d"],
        correctAnswer: "Answer8d"    
    },
    {
        question: "Question 9",
        answers: ["Answer9a", "Answer9b", "Answer9c", "Answer9d"],
        correctAnswer: "Answer9a"    
    },
    {
        question: "Question 10",
        answers: ["Answer10a", "Answer10b", "Answer10c", "Answer10d"],
        correctAnswer: "Answer10b"    
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

