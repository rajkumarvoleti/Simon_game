var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;
// It is store the sequence of colors chosen by the player
var userChosenColor;
var userClickedPattern = [];

// It is to create a sequence of colors
function nextSequence() {
  setTimeout(function () {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    addAnimation(randomChosenColor);
    playSound(randomChosenColor);

    level++;
    $("h1").html("Level " + level);
  }, 1000);
}

function playSound(color) {
  var audioSrc = "sounds/" + color + ".mp3";
  var audio = new Audio(audioSrc);
  audio.play();
}

function addAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      nextSequence();
    }
  } else {
    gameOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function gameOver() {
  userClickedPattern = [];
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").html("Game Over, Press Any Key to Restart");
  startOver();
}

// Start the game
$(".btn").on("click", function () {
  if (started) {
    userChosenColor = $(this).attr("id");
    addAnimation(userChosenColor);
    playSound(userChosenColor);

    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

$("body").keydown(function () {
  if (!started) {
    level = 0;
    $("h1").html("Level " + level);
    started = true;
    nextSequence();
  }
});
