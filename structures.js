/*
	basic Vector structure used as base class 
	for the particle's position,velocity and acceleration
*/
function Vector(x, y){
	this.x = x || 0;
	this.y = y || 0;
};

Vector.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
};

//gets length of vector
Vector.prototype.getMagnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.getAngle = function() {
	return Math.atan2(this.y, this.x);
};

//"static" method
Vector.fromAngle = function(angle, magnitude){
	return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

/*
	particle structure
*/
function Particle(point, velocity, acceleration) {
	this.position = point || new Vector(0, 0);
	this.velocity = velocity || new Vector(0, 0);;
	this.acceleration = acceleration || new Vector(0, 0);
};

Particle.prototype.move = function() {
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
};

/*
	Starting central point that duplicates itself and
	emmits other particles
*/
function Emitter(point, velocity, spread){
	this.position = point;
	this.velocity = velocity;
	this.spread = spread || Math.PI /32;
	this.drawColor = "#999"; //to distinct the particles from the emitter
};

Emitter.prototype.emitParticle = function() {
	var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
	var magnitude = this.velocity.getMagnitude();
	var position = new Vector(this.position.x, this.position.y);
	var velocity = Vector.fromAngle(angle, magnitude);

	return new Particle(position,velocity);
};

