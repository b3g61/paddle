class Paddle {

	constructor(gameWidth, gameHeight) {

		this.width = 150;
		this.height = 30;

		this.maxSpeed = 7;
		this.speed = 0;


		this.position = {

			x: gameWidth / 2 - this.width / 2,
			y: gameHeight - this.height - 10
		};
	}


	moveLeft() {
		this.speed = -this.maxSpeed;
	}

	moveRight() {
		this.speed = +this.maxSpeed;
	}



	draw(ctx){
		ctx.fillStyle = "red";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(deltaTime) {
		if (!deltaTime) return;

		this.position.x += this.speed;


		if(this.position.x < 0) this.position.x = 0;
	}
}


/* 										*/

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

			}
		});
	}
}







/* 										*/


let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");



const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;



ctx.clearRect(0,0, 800, 600);



let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

new InputHandler(paddle);



paddle.draw(ctx);

let lastTime = 0;


function gameLoop(timeStamp) {
	let deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;


	ctx.clearRect(0, 0, 800, 600);
	paddle.update(deltaTime);
	paddle.draw(ctx);

	requestAnimationFrame(gameLoop);
}



gameLoop();


