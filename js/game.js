var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

/*Funções*/

function nextSequence() {

    userClickedPattern = [];

    var numbersRandom = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[numbersRandom];
    gamePattern.push(randomChosenColour);

    var som = new Audio("sounds/" + randomChosenColour + ".mp3");
    som.play();

    level++;
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + level);

}

function playSound(name) {
    var som = new Audio("sounds/" + name + ".mp3");
    som.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 250);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        console.log('wrong');
        var som1 = new Audio("sounds/wrong.mp3");
        som1.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").text("Game Over, Pressione qualquer tecla para reiniciar");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}

/*Jquery códigos*/

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

})

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }


});

