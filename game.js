let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ['red', 'blue', 'green', 'yellow'];

//tracking state if it is first sequence
let firstSequence = true;

//level counter
let level = 0;

$(document).keypress(function() {

    //only when game start (first keypress) triger function nextSwquence
    if(firstSequence) {
        nextSequence();
        $('#level-title').text('Level 0');
        firstSequence = false;
    }
});

//function on event listener that generate player sequence
$('.btn').click(function(event) {

    //select targeted (pressed) button, and store its id
    const userChosenColour = $(event.target).attr('id');

    //push targeted (pressed) button into arrey
    userClickedPattern.push(userChosenColour);

    //calling function to create audio object according to button pressed (targeted) and play sound
    playSounds(userChosenColour);

    //animate pressed button
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

//function that compare computer and player sequence
function checkAnswer(currentLevel) {

    //check if last answer is correct
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('sucess');
        //if the last answer is correct, check if the player sequence is finished coparing it with commputer sequence
       if(userClickedPattern.length === gamePattern.length) {
           //if the length of sequence is the same (both have the same sequence length), then it will go to another sequence
           setTimeout(function() {
               nextSequence();
           }, 1000);
       }
    } else {//if pressed button is wrong
        //sound is played, and diferent style is applayed on body, which is remover after 200ms
        playSounds('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        //change title
        $('h1').text('Game Over, Press Any Key to Restart');

        //restart the game, calling function that set variables at difolt value
        startOver();
    }
}

//Function that generate automated sequence (commputer part)
function nextSequence() {
    //each sequence reset arrey and set it to empty for the next level
    userClickedPattern = [];

    //increse level every tme function is called
    level++;

    //Update title with new text that show new level
    $('#level-title').text(`Level ${level}`);

    //generate random number from 0 to 3
    const randomNumber = Math.floor(Math.random() *4);

    //select collor based on random number generated
    const randomChosenColour = buttonColours[randomNumber];

    //pushing generated color into game patern array
    gamePattern.push(randomChosenColour);

    //select and animate button according to generated random color
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

    //calling function to create audio element according to generated random color, and play it
    playSounds(randomChosenColour);
}

//create audio object according to passed arument (generated random color or pressed (targeted) button), and play it
function playSounds(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

//button animation on press
function animatePress(currentColour) {
    //add class pressed to targeted button
    $(`#${currentColour}`).addClass('pressed');
    //remove class pressed after 100 ms
    setTimeout(function() {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}

//declaring function that restart the game, seting firstSequence on true (so it can triger first sequence on keypress), level on 0 and deleting game patern array
function startOver() {
    gamePattern = [];
    firstSequence = true;
    level = 0;
}