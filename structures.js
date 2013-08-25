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
	calculates the attraction/repellence of the particles to the fields
	(expensive function)
*/
Particle.prototype.submitToFields = function(fields) {
	var totalAccelerationX = 0;
	var totalAccelerationY = 0;

	for(var i = 0; i < fields.length; i++){

		//finding distance between particle and field
		var vectorX = fields[i].position.x - this.position.x;
		var vectorY = fields[i].position.y - this.position.y;

		var force = fields[i].mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5);

		totalAccelerationX += vectorX * force;
		totalAccelerationY += vectorY * force;

		this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
	}
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

/*
	Field structure - point(object) in space that attracts/repels particles.
	If it's mass is positive it attracts, else if the mass is negative - repels.
*/

function Field(point, mass) {
	this.position = point;
	this.setMass(mass);
}

Field.prototype.setMass = function(mass) {
	this.mass = mass || 100;
	this.drawColor = (mass < 0) ? "#f00" : "#0f0";
};