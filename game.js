alert('Remember the sequence and play pattern from beginning each time');
var buttonColours = ['green','red','yellow','blue'];
var gamePattern = [];
var userClicks = [];
var level = 0;

function nextSequence(){
    
    $("h1").text('Level '+ level);
    level+=1;
    var randomNumber = Math.floor(Math.random()*4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animate(randomChosenColour);

}

function animate(c){
    $('#'+c).fadeOut(100).fadeIn(100);
    var sound = new Audio(c+'.mp3');
    sound.play();
}
function animateClick(c){
    $('#'+c).addClass('pressed');
    setTimeout(function(){
        $('#'+c).removeClass('pressed');

    },100); 
    var nsound = new Audio(c+'.mp3');
    nsound.play();
}
function clicks(){
    var userChosenColour = this.id;
    animateClick(userChosenColour);
    userClicks.push(userChosenColour);
    checkAnswer(userClicks.length);
}

$('.btn').click(clicks);    

$(document).keypress(function(){
    setTimeout(function(){
        nextSequence();
    },200);
});

function checkAnswer(currLevel){
    if (userClicks[currLevel-1]===gamePattern[currLevel-1]){
        // console.log('success');
        if(currLevel===gamePattern.length){
        
            setTimeout(function(){
                nextSequence();
                userClicks = [];
            },1000);
        }
    }
    else{
        // console.log('wrong');
        var wrong = new Audio('wrong.mp3');
        wrong.play();
        $('body').addClass('game-over');
        setTimeout(function(){
        $('body').removeClass('game-over');
        $("h1").text('Game Over, Press Any Key to Restart')
        level=0;
        gamePattern=[];
        userClicks = [];

    },200); 
    }
}
