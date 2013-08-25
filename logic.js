var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [];
var emitters = [new Emitter(new Vector(100,230), Vector.fromAngle(0,5)), new Emitter(new Vector(600,600), Vector.fromAngle(1.6,-5))];

var maxParticles = 100000; 
var emissionRate = 4; //number of particles generated each rate
var particleSize = 1;

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
	// will be updated in the future to change dynamically and fluently
	var colors = ["rgb(255, 140, 0)", "rgb(0, 255, 127)"]

	ctx.fillStyle = colors[1];

	for(var i = 0; i < particles.length; i++){
		var position = particles[i].position;

		ctx.fillRect(position.x, position.y, particleSize, particleSize);
	}
};

loop();