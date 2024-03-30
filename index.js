var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;

$(document).keydown(function(event){
    if(!started){
        if(event.key==' '){
        nextSequence();
        started = true;
        }
    }
});

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level "+level);
    level++;
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function(event){
    if(event.key == '1'){
        playSound('yellow');
        animatePress('yellow');
        userClickedPattern.push('yellow');
        checkAnswer(userClickedPattern.length - 1);
    }
    else if(event.key == '4'){
        playSound('green');
        animatePress('green');
        userClickedPattern.push('green');
        checkAnswer(userClickedPattern.length - 1);
    }
    else if(event.key == '5'){
        playSound('red');
        animatePress('red');
        userClickedPattern.push('red');
        checkAnswer(userClickedPattern.length - 1);
    }
    else if(event.key == '2'){
        playSound('blue');
        animatePress('blue');
        userClickedPattern.push('blue');
        checkAnswer(userClickedPattern.length - 1);
    }
})


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){nextSequence();}, 1000);
        }
    }
    else{
        wrongAnswer();
        startOver();
    }

}

function wrongAnswer(){
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass('game-over');
    setTimeout(function(){
        $("body").removeClass('game-over');
    }, 200);
    $("h1").text("Press spacebar to restart!");
}

function startOver(){
    level = 1;
    started = false;
    gamePattern = [];
}






