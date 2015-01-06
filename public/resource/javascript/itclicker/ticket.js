ITClicker.Ticket=function(task, type, charge, level)
{
	this.task=task;
	this.maxCharge=charge;
	this.charge=charge;
	this.type=type;
	this.element=null;
	this.animatedElement=null;
	
	
	this.level=level;
	
	this.value=100;
	
	this.id=ITClicker.Ticket.autoIncrement;
	ITClicker.Ticket.autoIncrement++;


	this.animationRange=0;
	this.speed=20;
	this.pixelPerSecond=0;
	
	
	this.started=false;
}



ITClicker.Ticket.autoIncrement=0;

ITClicker.Ticket.prototype.getType=function() {
	return this.type;
}

ITClicker.Ticket.prototype.getId=function() {
	return this.id;
}

ITClicker.Ticket.prototype.getValue=function() {
	return this.value;
}

ITClicker.Ticket.prototype.isStarted=function() {
	return this.started;
}


ITClicker.Ticket.prototype.applyEffort=function(effort) {

	if(this.testEffort(effort) && this.started) {

		this.charge-=effort.getPower();
		
		effort.setPower(0);
		this.updateElement();
		
		
		if(this.charge>0) {
			effort.getActor().animateEffort(this);
		}
		else {
			this.destroy();
		}
		return true;
	}
	return false;
}





ITClicker.Ticket.prototype.start=function(openSpace) {

	var element=this.getAnimatedElement();
	element.style.opacity=0;
	openSpace.ticketContainerContent.appendChild(element);
	this.animatedElement.style.opacity=1;
	
	this.started=true;
	
	setTimeout(function() {
		this.animate()
	}.bind(this), 10);
}


ITClicker.Ticket.prototype.addCharge=function(charge) {
	this.charge+=charge;
}

ITClicker.Ticket.prototype.testEffort=function(effort) {
	if(effort.getType()==this.type) {
		return true;
	}
	return false
}

ITClicker.Ticket.prototype.destroy=function() {
	this.task.destroyTicket(this);
	jQuery(this.element).remove();
	jQuery(this.animatedElement).remove();
}


ITClicker.Ticket.prototype.updateElement=function() {
	if(this.gaugeElement) {
		this.gaugeElement.style.height=100-(this.charge/this.maxCharge)*100+'%';
	}
}


ITClicker.Ticket.prototype.getPositionIn=function(second) {
	if(this.animatedElement) {
		var offsets=jQuery(this.animatedElement).offset();
		return parseInt(offsets.left)+this.pixelPerSecond*second;
	}
	else  {
		return false;
	}
}


ITClicker.Ticket.prototype.getAnimatedElement=function() {
	if(!this.animatedElement) {
		ticketElement=document.createElement('div');
		ticketElement.className='itclicker-ticket itclicker-ticket-'+this.type;
		
			ticketGaugeContainerElement=document.createElement('div');
			ticketGaugeContainerElement.className='itclicker-ticket-gaugeContainer';
				ticketGaugeElement=document.createElement('div');
				ticketGaugeElement.className='itclicker-ticket-gauge';
			ticketGaugeContainerElement.appendChild(ticketGaugeElement);
		
		ticketElement.appendChild(ticketGaugeContainerElement);
		
		ticketElement.style.left='0';
		
		ticketElement.style.transition='left '+this.speed+'s linear';
		
		this.animatedElement=ticketElement;
		this.gaugeElement=ticketGaugeElement;
		
		this.animatedElement.addEventListener('transitionend', function() {
			if(this.started) {
				this.animatedElement.style.transition='none';
				this.animatedElement.style.left='0px';
				setTimeout(function() {
					this.animatedElement.style.transition='left '+this.speed+'s linear';
					this.animatedElement.style.left='100%';
				}.bind(this), 100);
			}
		}.bind(this), false);
	}
	return this.animatedElement;
}

ITClicker.Ticket.prototype.animate=function() {

	if(!this.started) {
		return false;
	}
	
	if(this.animatedElement.parentNode) {
		this.animationRange=this.animatedElement.parentNode.offsetWidth;
		this.pixelPerSecond=this.animationRange/this.speed;
	}
	this.animatedElement.style.left='100%';
}


ITClicker.Ticket.prototype.stop=function() {
	
	this.started=false;

	if(this.animatedElement) {
		this.animatedElement.style.left=getComputedStyle(this.animatedElement).left;
	}
}



ITClicker.Ticket.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-ticket '+'itclicker-ticket-'+this.type;
		this.element.style.width=this.charge+'px';
		
	}
	return this.element
}


























