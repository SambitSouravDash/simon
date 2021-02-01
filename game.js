const buttonColors=["red","blue","green","yellow"];
var  gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;

var check=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
    }
    started = true;
});  

$(".btn").click(function(){
    var id=this.id;
    userClickedPattern.push(id);
    play(id);
    animatePress(id);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern)
});

function nextSequence(){
    userClickedPattern=[];
    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    play(randomChosenColour);
}

function play(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
        setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        play("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function startOver(){
    gamePattern=[];
    level=0;
    started=false;
}
