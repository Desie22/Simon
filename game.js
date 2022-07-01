
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var userClickedPattern = [];


var level = 0;
var gameOn = false;
$(document).keydown(function() {
  if (gameOn === false) {
    nextSequence();
    gameOn = true;
  }
});



function nextSequence() {
  level += 1;
  $("h1").text("Level " + level);

  var randomNumber = Math.random() * 3;
  randomNumber = Math.round(randomNumber);
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  flashColor(randomChosenColor);
  playSound(randomChosenColor);

  userClickedPattern = [];
}



function flashColor(randomChosenColor) {
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}



function playSound(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}



$(".btn").click(function() {
  if (userClickedPattern.length < gamePattern.length) {
    var idOfButton = $(this).attr("id");
    userClickedPattern.push(idOfButton);
    playSound(idOfButton);
    animatePress(idOfButton);
    checkAnswer(level);
  }
});



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed").delay(100).queue(function() {
    $(this).removeClass("pressed").dequeue();
  });
}




function checkAnswer(level) {
  if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over").delay(200).queue(function() {
      $("body").removeClass("game-over").dequeue();
    })
    setTimeout(gameOver, 1000);
  }
  if (userClickedPattern[level - 1] === gamePattern[level - 1]) {
    setTimeout(nextSequence, 1000);
  }
}


function gameOver() {
  level = 0;
  gameOn = false;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Game Over! Press Any Key to Restart");
}
