ITClicker.Effort=function(type, level, power, actor)
{

	this.type=type;
	this.level=level;
	this.power=power;
	
	this.actor=actor;
}


ITClicker.Effort.prototype.getActor=function() {
	return this.actor;
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