var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = -1

//$("body").keypress(function(){

$(".startknop").click(function(){
  console.log("Op start geklikt");
  if (level == -1){
  $(this).addClass("hidden");
  nextSequence();
  }
});

$(".startknop").mouseover(function(){
  $(".startknop").css("background-color", "#fff");
});
$(".startknop").mouseout(function(){
  $(".startknop").css("background-color", "#66b6d2");
});
// Deze functie laat alleen de laatste(nieuwe) kleur horen en zien:

// function nextSequence() {
//   userClickedPattern = [];
//   var randomNumber = Math.floor(Math.random()*4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//   playSound(randomChosenColour);
//   level++;
//   $("h1").text("Level " + level)
// }

// Functie omgebouwd zodat ie steeds de hele sequens voordoet inclusief de nieuwe:

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  // met setInterval zorgen dat ie tussen elke kleur even wacht
  var x = 0;
  var sequens = setInterval(patroon, 600);
  function patroon() {
      if (x < gamePattern.length) {
        $("#" + gamePattern[x]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[x]);
      }
      else {
        clearInterval(sequens);
      }
      x++;
  }
  level++;
  $("#level-title").text("Aantal goed: " + level)
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
//  playSound(userChosenColour);
//  animatePress(userChosenColour);
  checkAnswer(level);
});

function playSound(name){
  var audio = new Audio("sounds/stem/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
  var i = userClickedPattern.length -1;
  if ( gamePattern[i] == userClickedPattern[i]){
    playSound(userClickedPattern[i]);
    animatePress(userClickedPattern[i]);
    if (i == currentLevel){
      setTimeout(function () {
          nextSequence();
      }, 1000);
    }
  }
  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 400);
    gamePattern = [];
    $("#level-title").text("Game Over! Druk op START om opnieuw te beginnen");
    $(".startknop").removeClass("hidden");
    level = -1;
  }
}
