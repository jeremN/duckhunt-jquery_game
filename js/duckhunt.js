/**GAME VAR**/
//var
var $duck = $("#duck");
var $counter = $("#ammo h2"); 
var $duckCount = $("#other h2");

//espace de jeu width & height
var ww = $("#gamefield").width();
var wh = $("#gamefield").height();

//var score, compteur de répétition
var	scoreInit = 0;
var	scoreDuck = 0;
var	duckSent = 0;

//Hide try again
$("#again").hide();

/**GAME FUNCTIONS**/
//New game
function newGame(){
	resetGame();
	window.setTimeout(flyingRight, 1000);
}

//End game
function endGame(){
	$duck.stop();
	resetDuck();
}

//Duck position reset
function resetDuck(){
	$duck.css({
		"top" : getRandomTopPosition(),
		"left": -130,	
		"background-image" : "url(img/duckhuntimg/duck_right.gif)",	
		"z-index": 3
	})	
}

//Duck animation
function flyingRight(){
	if (duckSent == 10){
		$("#again").show();
		endGame();
		return false;
	}

	duckSent ++;	

	$duck
		.animate({
			"left" : ww + $duck.width(),
			"top" : getRandomTopPosition()}, 2000, function(){
				//Duck missed
				scoreDuck+=1;
				$duckCount.html("miss" +" "+ scoreDuck);

				resetDuck();
				flyingRight();
		});
}

//Random position
function getRandomTopPosition(){
	var newTopPosition = $("header").outerHeight() + Math.random() * (wh - $duck.height() - $("header").outerHeight());
	return newTopPosition;
}

//Kill duck	
function killDuck(){
	//Duck killed
	scoreInit += 10;
	$counter.html("score" +" "+ scoreInit);	
	
	$duck
		.stop()
		.css({
			"background-image" : "url(img/duckhuntimg/duck_dead.png)",
			"z-index" : 1
		})
		.animate({"top" : wh }, 1000, function(){
			resetDuck();
			flyingRight();
	});
}

//Reset
function resetGame(){
	scoreInit = 0;
	scoreDuck = 0;
	duckSent = 0;

	$counter.html("score" +" "+ scoreInit);	
	$duckCount.html("miss" +" "+ scoreDuck);

	$duck.stop();
	$("#start").hide();
	$("#again").hide();
	resetDuck();
}


/**CLICK EVENT**/
//Mouse click	
$duck.on("mousedown",killDuck);

//Start button
$("#start button").on("click", newGame)

//Try again button
$("#again button").on("click", newGame);