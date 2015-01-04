ITClicker.Effort=function(type, level, power)
{

	this.type=type;
	this.level=level;
	this.power=power;
}


ITClicker.Effort.prototype.getType=function() {
	return this.type;
}

ITClicker.Effort.prototype.getPower=function() {
	return this.power;
}

ITClicker.Effort.prototype.setPower=function(value) {
	this.power=value;
}