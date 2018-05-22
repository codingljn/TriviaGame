// List of questions in array form. We can use this to get the right answer by listing the position in the array.
var triviaQuestions = [{
	question: "How many miles can ships save by going through the Panama Canal?",
	answerList: ["6,000", "7,000", "8,000", "9,000"],
	answer: 2
},{
	question: "How tall is the tallest stream of the Seven Sisters Waterfall in Norway?",
	answerList: ["150 meters", "250 meters", "350 meters", "450 meters"],
	answer: 1
},{
	question: "Citizens of which country cannot legally gamble?",
	answerList: ["Monaco", "Chile", "Russia", "Finland"],
	answer: 0
},{
	question: "The Port of _____ holds the title for the busiest cruise port in the world",
	answerList: ["Shanghai", "Miami", "Panama", "Hong Kong"],
	answer: 1
},{
	question: "What is the ratio of sheep to people in New Zealand?",
	answerList: ["1:1", "1:5", "1:10", "1:20"],
	answer: 2
},{
	question: "______ is the sunniest city in Europe with 250 sunny days a year",
	answerList: ["Copenhagen", "Dublin", "Paris", "Madrid"],
	answer: 3
},{
	question: "How often is the Eiffel Tower repainted?",
	answerList: ["Once every 3 years", "Once every 7 years", "Once every 10 years", "Never"],
	answer: 1
},{
	question: "Denmark has _____ the number of bicycles as cars",
	answerList: ["twice", "three times", "four times", "ten times"],
	answer: 0
},{
	question: "How many bridges are there in Venice?",
	answerList: ["207", "317", "417", "507"],
	answer: 2
},{
	question: "Where was the first subway built?",
	answerList: ["London", "Boston", "Chile", "Shanghai"],
	answer: 0
}];
// Declare variables
var gifArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Sorry! That's not the right answer",
	endTime: "Oh no! You're out of time!",
	finished: "Thanks for playing! Let's see how well you know the world."
}
// Start game and hide button
$("#startButton").on('click', function(){
	$(this).hide();
	newGame();
});
// Restart game and hide button
$("#startOverButton").on('click', function(){
	$(this).hide();
	newGame();
});
// Set up for new game
function newGame(){
	$("#finalMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}
// Shows question
function newQuestion(){
	$("#message").empty();
	$("#correctAnswer").empty();
	$("#gif").empty();
	answered = true;
    
// Sets up new questions & answer choices
	$("#currentQuestion").html("Question #"+(currentQuestion+1)+"/"+triviaQuestions.length);
	$(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
	for(var i = 0; i < 4; i++){
		var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
		$(".answerList").append(choices);
	}
	countdown();
// Clicking an answer will pause the timer and setup answerPage
	$(".thisChoice").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
// Sets timer to go down 1 second at a time
	time = setInterval(showCountdown, 1000);
}
// Show the user how much time is left
function showCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$("#currentQuestion").empty();
	$(".thisChoice").empty(); //Clears question page
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$("#gif").html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" height = "300px" width = "400px">');
// Checks whether answer is correct, incorrect, or if it was left unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();

	$("#finalMessage").html(messages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#startOverButton").addClass('reset');
	$("#startOverButton").show();
    $("#startOverButton").html('Start Over?');
    
}