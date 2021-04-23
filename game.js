
var variatie = 0;
var klank = "";
var laatste = false;
var variatiekeuze = true;
var gestart = false;

// Kies eerst de variatie:

  $(".niv1").click(function(){
    if(variatiekeuze == true){
      variatie = 1;
      klank = "stem";
      laatste = false;
      $(".startknop").removeClass("hidden");
      $(".variatie2").addClass("dimmen");
      $(".variatie3").addClass("dimmen");
      $(".hoogste2Wrapper").addClass("dimmen");
      $(".hoogste3Wrapper").addClass("dimmen");
      $(".andereVariatieKiezen").removeClass("hidden");
      $("#kiesVariatie").text("Druk op START om te beginnen");
      variatiekeuze = false;
    }
  });

  $(".niv2").click(function(){
    if(variatiekeuze == true){
      variatie = 2;
      klank = "piano";
      laatste = false;
      $(".startknop").removeClass("hidden");
      $(".variatie1").addClass("dimmen");
      $(".variatie3").addClass("dimmen");
      $(".hoogste1Wrapper").addClass("dimmen");
      $(".hoogste3Wrapper").addClass("dimmen");
      $(".andereVariatieKiezen").removeClass("hidden");
      $("#kiesVariatie").text("Druk op START om te beginnen");
      variatiekeuze = false;
    }
  });

  $(".niv3").click(function(){
    if(variatiekeuze == true){
      variatie = 3;
      klank = "piano";
      laatste = true;
      $(".startknop").removeClass("hidden");
      $(".variatie2").addClass("dimmen");
      $(".variatie1").addClass("dimmen");
      $(".hoogste2Wrapper").addClass("dimmen");
      $(".hoogste1Wrapper").addClass("dimmen");
      $(".andereVariatieKiezen").removeClass("hidden");
      $("#kiesVariatie").text("Druk op START om te beginnen");
      variatiekeuze = false;
    }
  });

$(".andereVariatieKiezen").click(function(){
  variatiekeuze = true;
  $(".variatie2").removeClass("dimmen");
  $(".variatie1").removeClass("dimmen");
  $(".variatie3").removeClass("dimmen");
  $(".hoogste3Wrapper").removeClass("dimmen");
  $(".hoogste2Wrapper").removeClass("dimmen");
  $(".hoogste1Wrapper").removeClass("dimmen");
  $("#kiesVariatie").removeClass("hidden");
  // Nu ook nog instellen dat ie opnieuw begint!
  gestart = false;
  gamePattern = [];
  level = -1
  $("#huidigeScore").text("Score: 0" )
})


var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = -1

//$("body").keypress(function(){

$(".startknop").click(function(){
  console.log("Op start geklikt");
  gestart = true;
  $("#kiesVariatie").addClass("hidden");
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



var hoogste1Score = 0
var hoogste2Score = 0
var hoogste3Score = 0

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Steeds de hele reeks laten zien en horen
  //met setInterval zorgen dat ie tussen elke kleur even wacht
  if(laatste == false){
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
  // alleen steeds de laatse nieuwe kleur tonen
  } else {
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
  }
  level++;

  $("#huidigeScore").text("Score: " + level)
  if(variatie == 1){
    if(level > hoogste1Score){
      hoogste1Score = level;
      $("#hoogste1").text(level);
    }
  }
  if(variatie == 2){
    if(level > hoogste2Score){
      hoogste2Score = level;
      $("#hoogste2").text(level);
    }
  }
  if(variatie == 3){
    if(level > hoogste3Score){
      hoogste3Score = level;
      $("#hoogste3").text(level);
    }
  }
}

$(".btn").click(function() {
  if(gestart == true){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(level);
  }
});

function playSound(name){
  var audio = new Audio("sounds/"+ klank + "/" + name + ".mp3");
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
    gestart = false;
    gamePattern = [];
    $("#kiesVariatie").text("Game Over! Druk op START om opnieuw te beginnen");
    $("#kiesVariatie").removeClass("hidden");
    $(".startknop").removeClass("hidden");
    level = -1;
  }
}
