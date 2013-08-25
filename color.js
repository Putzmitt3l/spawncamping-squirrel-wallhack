/*
	color structure used to set the particles color
*/
function Color(){
	this.red = 0;
	this.green = 0;
	this.blue = 0;
	this.waveIncrement = -1; // used in changeColor function
}

/*
	NOTE: Taking advantage of sine waves properties

	frequency 1, 2, 3 - how fast we change the wave length of the RGB channels
	(if we set them all to the same value we get a shade of gray/white/black colors)

	phase 1, 2, 3 - the alignment of the sine waves that we use for each channel

	center - base color value arround which the wave is changing 
	width - width of the wave
	length - length of the wave
*/
Color.prototype.changeColor = function(frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width, len) {
	
	this.waveIncrement++;
	if(this.waveIncrement >= len){
		this.waveIncrement = 0;
	}

	//setting default values
	if(len === undefined) { len = 50; }
	if(center === undefined) { center = 255/2; } //or 128
	if(width === undefined) { width = 255/2; } //or 127

	this.red = Math.sin(frequency1 * this.waveIncrement + phase1) * width + center;
	this.green = Math.sin(frequency2 * this.waveIncrement + phase2) * width + center;
	this.blue = Math.sin(frequency3 * this.waveIncrement + phase3) * width + center;
};

Color.prototype.produceColorString = function() {
	return "rgb(" + Math.floor(this.red) + ',' + Math.floor(this.green) + ',' + Math.floor(this.blue) + ')' ;
};