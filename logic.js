var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [];
var emitters = [new Emitter(new Vector(100,230), Vector.fromAngle(0,5))]//, new Emitter(new Vector(600,600), Vector.fromAngle(1.6,-5))];
var fields = [new Field(new Vector(500, 300), 500), new Field(new Vector(900, 200), 900)];

var maxParticles = 100000; 
var emissionRate = 4; //number of particles generated each frame
var particleSize = 2;

var color = new Color();
var contextColor = "rgb(255, 140, 0)";
var changeColorFlagTimeOut = 30;
var currentColorFlagTimeOut = 0;

function loop(){
	clear();
	update();
	draw();
	queue();
};

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function queue(){
	window.requestAnimationFrame(loop);
};

function addNewParticle() {
	if(particles.length > maxParticles){ 
		return;
	}
	for(var i = 0; i < emitters.length; i++){
		for(var j = 0; j < emissionRate; j++){
			particles.push(emitters[i].emitParticle());
		}
	}
}

function plotParticles(boundsX, boundsY) {
	var currentParticles = [];

	for(var i = 0; i < particles.length; i++){
		var particle = particles[i];
		var pos = particle.position;

		//out of bounds particle check
		if(pos.x < 0 || pos.y > boundsX || pos.y < 0 || pos.y > boundsY){
			continue;
		}

		//update velocity and acceleration to account for fields
		particle.submitToFields(fields);

		particle.move();

		//buffering the new particles state
		currentParticles.push(particle);
	}

	//updating particles state
	particles = currentParticles;
}

function update(){
	addNewParticle();
	plotParticles(canvas.width, canvas.height);
};

function draw(){
	currentColorFlagTimeOut++;

	//check if it is time to change color;
	if(currentColorFlagTimeOut == changeColorFlagTimeOut){
		currentColorFlagTimeOut = 0;
		color.changeColor(0.3, 0.3, 0.3, 0, 2, 4);
		contextColor = color.produceColorString();
	}

	ctx.fillStyle = contextColor;
	for(var i = 0; i < particles.length; i++){
		var position = particles[i].position;

		ctx.fillRect(position.x, position.y, particleSize, particleSize);
	}
};

//initiating main loop
loop();