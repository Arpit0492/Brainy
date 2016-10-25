/**
 * Created by ARPIT JOHRI on 25-10-2016.
 */

(function(document) {
    "use strict";

    //All the questions in the quiz.
    var allQuestions = [{question: "What is the capital of Georgia?",
        choices:["Atlanta", "Savannah", "Athens", "Macon"], correctAnswer:0},
        {question: "What is the capital of Kentucky?",
            choices:["Lexington", "Louisville", "Frankfort"], correctAnswer:2}];

    //Initializes variables.
    var current = 0,
        correctAns,
        next,
        score = 0;

    /**
     * Instantiate quiz
     * @param {Array} Qs
     */
    var Quiz = function(Qs) {
        if (Qs.length < 1) {
            return;
        }

        insertQAndAns(Qs[0]);

    };

    /**
     * Create a question div
     * @param {string} question
     * @return {HTMLElement} newQ
     */
    var createQ = function(question) {
        //Create question element
        var newQ = document.createElement("div");
        newQ.className = "inQuiz";
        newQ.id = "question";
        newQ.value = question;
        newQ.innerHTML = question;

        return newQ;
    };

    /**
     * Creates a radio button.
     * @param {string} value
     * @return {HTMLElement} choice
     */
    var createRadio = function(value) {
        var choice = document.createElement("input");
        choice.type = "radio";
        choice.name = "choice";
        choice.value = value;
        return choice;
    };

    /**
     * Creates a label as text for the radio button.
     * @param {string} text
     * @return {HTMLElement} newLabel
     */
    var createRadioLabel = function(text) {
        var newLabel = document.createElement("Label");
        newLabel.setAttribute("for",text);
        newLabel.innerHTML = text;
        return newLabel;
    };

    /**
     * Creates a div to contain all the possible choices.
     * @param {Array} newChoices
     * @return {HTMLElement} choices
     */
    var createChoices = function(newChoices) {
        //Declare elements.
        var i, choice, label, container, lineBreak;

        //Create div surrounding all the choices.
        var choices = document.createElement("div");
        choices.className = "inQuiz";
        choices.id = "choices";

        //For each choice, create the radio button and its label
        for (i = 0; i < newChoices.length; i++) {
            //Create individual choice
            choice = createRadio(newChoices[i]);
            label = createRadioLabel(newChoices[i]);

            //Set checked radio button to be the first one by default.
            if (i === 0) {
                choice.checked = "checked";
            }

            //Wrap each choice in a div.
            container = document.createElement("div");
            container.className = "choice";
            container.appendChild(choice);
            container.appendChild(label);

            choices.appendChild(container);

            //If not the last choice, add a <br> to space out the choices.
            if (i !== newChoices.length - 1) {
                lineBreak = document.createElement("br");
                choices.appendChild(lineBreak);
            }
        }

        return choices;

    };

    /**
     * Create a question/answers and adds it all to DOM
     * @param {Object} questionObj
     */
    var insertQAndAns = function(questionObj) {
        //Create question element
        var q = createQ(questionObj.question);

        //Create the radio buttons
        var ans = createChoices(questionObj.choices);

        //Get DOM Elements
        var quizForm = document.getElementById("quiz");
        var next = document.getElementById("fixFloat");

        //Set new correct answer.
        correctAns = questionObj.correctAnswer;

        //Add both to DOM model before the next button
        quizForm.insertBefore(q, next);
        quizForm.insertBefore(ans, next);
    };

    /**
     * Determines whether question was answered correctly
     * @param {Number} ans
     */
    var isCorrect = function(ans) {
        if (ans !== null) {
            if (ans === correctAns) {
                score++;
            }
        }
    };

    /**
     * Determines whether question was answered correctly
     * @param {string} name
     * @return {Number} i or null
     */
    var getRadioValue = function(name) {
        //Declares variables
        var i,
            ans = document.getElementsByName(name);

        //Looks for which radio value is checked.
        for(i = 0; i < ans.length; i++) {
            //If a radio button is checked, returns that index
            if (ans[i].checked) {
                return i;
            }
        }

        //Otherwise, returns null.
        return null;
    };

    /**
     * Removes old choices
     */
    var removeElement = function(idParent, idChild) {
        var child = document.getElementById(idChild),
            parent = document.getElementById(idParent);
        parent.removeChild(child);
    };

    /**
     * Removes question and answer from DOM
     */
    var removeQAndAns = function() {
        removeElement("quiz", "question");
        removeElement("quiz", "choices");
    };

    /**
     * Display score
     */
    var displayScore = function() {
        //Create score element with same css as question
        var scoreText = createQ("Score: " + score + "/" + allQuestions.length);

        //Add score to DOM model
        var quizForm = document.getElementById("quiz");

        quizForm.appendChild(scoreText);

    };

    /**
     * Changes screen to last screen.
     */
    var lastScreen = function lastScreen() {
        removeElement("quiz", "fixFloat");
        displayScore();
    };

    /**
     * Changes the question.
     */
    var changeQAndAns = function() {
        //Declare variables.
        var newQ;

        //Get selected answer and compare to correct choice
        isCorrect(getRadioValue("choice"));

        //Removes the previous question and answers from the DOM
        //Increments current question
        current++;
        removeQAndAns();

        //Checks to see if the previous question was the last question.
        if (current === allQuestions.length) {
            lastScreen();
            return;
        }

        //If more questions left, inserts next question/answer set
        newQ = allQuestions[current];
        insertQAndAns(newQ);
    };

    //Starts the quiz, and registers an event handler for the next button.
    Quiz(allQuestions);

    //register event handler for next button
    next = document.getElementById("next");
    next.onclick = function() {changeQAndAns();};

}(document));