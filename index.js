//Playerinn - Main circle

class Paddle {

	constructor(gameWidth, gameHeight) {

		//this.width = 150;
		//this.height = 30;

		this.radius = 50;
		this.color = "black";

		this.maxSpeed = 7;
		this.speed = 0;

		this.maxJump = 5;
		this.jump = 0;


		this.position = {

			x: gameWidth / 2 - this.radius / 2,
			y: gameHeight - 50
		};


	}

//hreyfingar notanda teknar inn í reikninginn
	moveLeft() {
		this.speed = -this.maxSpeed;
	}

	moveRight() {
		this.speed = +this.maxSpeed;
	}

	hoppaUpp() {
		this.jump = -this.maxJump;
	}

	faraNiður() {
		this.jump = +this.maxJump;
	}

	stop() {
		this.speed = 0;
		this.jump = 0;
	}

// teiknum aðalleikarann
	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();



	}
// færum aðalleikarann

	update(deltaTime) {
		if (!deltaTime) return;

		this.position.x += this.speed;
		this.position.y += this.jump;

// má ekki fara útfyrir gameScreen
		if(this.position.x < 0 + this.radius) this.position.x = 0 + this.radius;
		if(this.position.x > 800 - this.radius) this.position.x = 800 - this.radius;
		if(this.position.y < 0 + this.radius) this.position.y = 0 + this.radius;
		if(this.position.y > 600 - this.radius) this.position.y = 600 - this.radius;

	}
}


// hringurinn okkar
class Hringur {

	constructor(gameWidth, gameHeight) {

		this.radius = 25;
		this.color = "red";

		this.MaxSpeed = 2;
		this.Speed = 0;

		this.position = {

			x: Math.floor(Math.random() * 800),
			y: -50
		};
	}
//teikna hringinn
	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();



	}
//lætur hringinn detta 
	update(deltaTime) {
		if (!deltaTime) return;

		this.position.y += this.MaxSpeed;



	}
		
}


/* 		–––––––––––––––––––––––––		*/

// Meðhöndlar input notanda

class InputHandler {

	constructor(paddle) {
		document.addEventListener('keydown', (event) => {
			switch(event.keyCode) {
				
				case 37:
				//alert('vinstri');
				paddle.moveLeft();
				break;

				case 39:
				//alert('hægri')
				paddle.moveRight();
				break;

				case 38:
				paddle.hoppaUpp();
				break;

				case 40:
				paddle.faraNiður();
				break;

			}
		});

		document.addEventListener('keyup', (event) => {
			switch(event.keyCode) {
				
				case 37:
				//alert('vinstri');
				paddle.stop();
				break;

				case 39:
				//alert('hægri')
				paddle.stop();
				break;

				case 38:
				paddle.stop();
				break;

				case 40:
				paddle.stop();
				break;

			}
		});
	}
}

// Reiknar fjarlægðir hringa

function getDistance(x1, y1, x2, y2) {

	let xDistance = x2 - x1;
	let yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}




/* 		–––––––––––––––––––––––––		*/


let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");



const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;



ctx.clearRect(0,0, 800, 600);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let hringur = new Hringur(GAME_WIDTH, GAME_HEIGHT);

new InputHandler(paddle);




let lastTime = 0;
var gameScore = 0;
//var Level = 0;

// aðalstuffið 

function gameLoop(timeStamp) {
	let deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	requestAnimationFrame(gameLoop);

//hreinsa og teikna 
	ctx.clearRect(0, 0, 800, 600);
	paddle.draw(ctx);
	paddle.update(deltaTime);
	hringur.draw(ctx);
	hringur.update(deltaTime);

// Athugar árekstur || ef Hringur snertir Paddle
	if (getDistance(paddle.position.x, paddle.position.y, hringur.position.x, hringur.position.y) < paddle.radius + hringur.radius) {
		gameScore = gameScore + 1;
		// teiknar nýjann hring ef við náðum 
		hringur.position = {
			x: Math.floor(Math.random() * 800 - hringur.radius),
			y: -50
		};
		// birtir stigin okkar
		document.getElementById("stig").innerHTML = gameScore;
	}
// Athugar ef hringur fer niður fyrir gameScreen

	if (hringur.position.y > 600 )  {
		gameScore = gameScore - 1;
		// teiknar nýjann ef hinn fór niður fyrir
		hringur.position = {
			x: Math.floor(Math.random() * 800 - hringur.radius),
			y: -50
		};
		// birtir stig
		document.getElementById("stig").innerHTML = gameScore;
	}




	

}



gameLoop();


