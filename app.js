//********************** FOR QUESTIONS  */

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function(choice) {
    return this.answer === choice;
}


//*************** FOR SELECTIVE ANSWERS */
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}


//Button ki values is function sy ari hn
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}


//Ya wala function question change krny k lea use howa hy means user correct answer select kry ya wrong ya next question pr ly jayga
Quiz.prototype.guess = function(answer) {
    //.correct answer uper Question.prototype sy lea hy means wo wala function call kea hy
    if(this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.ended = function() {
    return this.questionIndex === this.questions.length;
}


function populate() {
    if(quiz.ended()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("HTML is which type of language?", ["Scripting", "Markup","Programming", "Network Protocol"], "Markup"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("_______  tag is an extension to HTML that can enclose any number of JavaScript?", ["Head", "Body","Script", "Title"], "Script"),
    new Question("Who is the inventor of javascript?", ["Brendan Eich", "Guido van Rossum", "Jordan Walke", "Charles Babbage"], "Brendan Eich"),
    new Question("BootStrap is a ______.", ["Language", "Library", "Framework", "All"], "Framework")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();






