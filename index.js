
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = false;
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];
var level = 0;

$("*").keydown(function(){
   if(!started){
    $("h1").text("Level"+ level);
    nextSequence();
    started = true;
    }
});
// For Mobile users since they have no key to press, therefore a button will solve their problem
$("#startButton").click(function(){
  if(!started){
    $("h1").text("Level"+ level);
    $("#startButton").css("display","none");
    nextSequence();
    started = true;
    }
});
//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = this.id;

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
  //console.log(userClickedPattern);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("h1").text("Press A Key to Start");
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}   

