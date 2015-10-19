// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Tree image
var treeReady = false;
var treeImage = new Image();
treeImage.onload = function () {
	treeReady = true;
};
treeImage.src = "images/tree.png;"

// Game objects
var hero = {
	speed: 512 // movement in pixels per second
};
var monster = {};
var tree = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {


	// Throw the monster somewhere on the screen randomly
	monster.x = 45 + (Math.random() * (canvas.width - 90));
	monster.y = 45 + (Math.random() * (canvas.height - 90));
};

// Update game objects
var update = function (modifier) {

/*
	if (
		hero.x <= (tree.x + 32)
		&& tree.x <= (hero.x + 32)
		&& hero.y <= (tree.y + 32)
		&& tree.y <= (hero.y + 32)
	) {
		if (38 in keysDown && hero.y >= 25) { // Player holding up
			hero.y += 5 // -= hero.speed * modifier;
		}
		if (40 in keysDown && hero.y <= 415) { // Player holding down
			hero.y -= 5 // += hero.speed * modifier;
		}
		if (37 in keysDown && hero.x >= 25) { // Player holding left
			hero.x -= 5 // -= hero.speed * modifier;
		}
		if (39 in keysDown && hero.x <= 450) { // Player holding right
			hero.x += hero.speed * modifier;
		}
	}
	else
	{*/
	if(hero.y>(tree.y+32) || hero.y<(tree.y-32) || hero.x>(tree.x+32) || hero.x<(tree.x-32)) {
		if (38 in keysDown && hero.y >= 25) { // Player holding up
			hero.y -= hero.speed * modifier;
		}
		if (40 in keysDown && hero.y <= 415) { // Player holding down
			hero.y += hero.speed * modifier;
		}
		if (37 in keysDown && hero.x >= 25) { // Player holding left
			hero.x -= hero.speed * modifier;
		}
		if (39 in keysDown && hero.x <= 450) { // Player holding right
			hero.x += hero.speed * modifier;
		}
	}
	/*else{
		hero.x = 45 + (Math.random() * (canvas.width - 90));
		hero.y = 45 + (Math.random() * (canvas.height - 90));
	}
	//}*/
/*
	if (38 in keysDown && hero.y >= 25) { // Player holding up
		if(hero.x>(tree.x+32) || hero.x<(tree.x-32)){hero.y -= hero.speed * modifier;}
		else{do{hero.y -= hero.speed * modifier;}while(hero.y>=(tree.y+32) || hero.y<=(tree.y-32))}
	}
	if (40 in keysDown && hero.y <= 415) { // Player holding down
		if(hero.x>(tree.x+32) || hero.x<(tree.x-32)){hero.y += hero.speed * modifier;}
		else{do{hero.y += hero.speed * modifier;}while(hero.y>=(tree.y+32) || hero.y<=(tree.y-32))}
	}
	if (37 in keysDown && hero.x >= 25) { // Player holding left
		if(hero.y>(tree.y+32) || hero.y<(tree.y-32)){hero.x -= hero.speed * modifier;}
		else{do{hero.x -= hero.speed * modifier;}while(hero.x>=(tree.x+32) || hero.x<=(tree.x-32))}
	}
	if (39 in keysDown && hero.x <= 450) { // Player holding right
		if(hero.y>(tree.y+32) || hero.y<(tree.y-32)){hero.x += hero.speed * modifier;}
		else{do{hero.x += hero.speed * modifier;}while(hero.x>=(tree.x+32) || hero.x<=(tree.x-32))}
	}*/
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (treeReady){
		ctx.drawImage(treeImage,tree.x, tree.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
hero.x = canvas.width / 2;
hero.y = canvas.height / 2;
tree.x = 65 + (Math.random() * (canvas.width - 130));
tree.y = 65 + (Math.random() * (canvas.height - 130));
reset();
main();
