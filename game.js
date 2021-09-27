alert('You can press any key to start and it will show you a tile that you have to click on. And as you go from level to level, the patterns get more and more complicated');
var buttonColours = ['green','red','yellow','blue'];
var gamePattern = [];
var userClicks = [];
var level = 0;
var maxscore = [];

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

$('.play').click(clicks);    

$(document).keypress(function(){
    $("#start").hide();
    $("#or").hide();
    setTimeout(function(){
        nextSequence();
    },200);
});
$('#start').click(function(){
    
    $('#start').hide();
    $("#or").hide();
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
        maxscore.push(level-1);
        setTimeout(function(){
            $('body').removeClass('game-over');
            $("h1").text('Game Over, Press Any Key to Restart')
            $("#start").text('Click to Restart');
            $("#or").show();
            $("#start").show();
            level=0;
            gamePattern=[];
            userClicks = [];

        },200); 
        var cmax = Math.max.apply(Math,maxscore); 
        $("#maxScore").text('Max Score: '+cmax);
    }
}
