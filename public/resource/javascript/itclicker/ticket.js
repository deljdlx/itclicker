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
}



ITClicker.Ticket.autoIncrement=0;



ITClicker.Ticket.prototype.getId=function() {
	return this.id;
}

ITClicker.Ticket.prototype.getValue=function() {
	return this.value;
}


ITClicker.Ticket.prototype.applyEffort=function(effort) {


	if(this.testEffort(effort)) {
	
	
		effort.getActor().animateEffort(this);
	
		this.charge-=effort.getPower();
		
		effort.setPower(0);
		this.updateElement();
		if(this.charge<=0) {
			this.destroy();
		}
		return true;
	}
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
	
	this.gaugeElement.style.height=100-(this.charge/this.maxCharge)*100+'%';

	//this.element.style.width=this.charge+'px';
}

ITClicker.Ticket.prototype.getAnimatedElement=function() {
	if(!this.animatedElement) {
		ticketElement=document.createElement('div');
		ticketElement.className='itclicker-ticket';
		
			ticketGaugeContainerElement=document.createElement('div');
			ticketGaugeContainerElement.className='itclicker-ticket-gaugeContainer';
				ticketGaugeElement=document.createElement('div');
				ticketGaugeElement.className='itclicker-ticket-gauge';
			ticketGaugeContainerElement.appendChild(ticketGaugeElement);
		
		ticketElement.appendChild(ticketGaugeContainerElement);
		
		ticketElement.style.left='0';
		
		ticketElement.style.transition='left 20s linear';
		
		this.animatedElement=ticketElement;
		this.gaugeElement=ticketGaugeElement;
		
		this.animatedElement.addEventListener('transitionend', function() {
			this.animatedElement.style.transition='none';
			this.animatedElement.style.left='0px';
			setTimeout(function() {
				this.animatedElement.style.transition='left 20s linear';
				this.animatedElement.style.left='100%';
			}.bind(this), 100);
		}.bind(this), false);
		
	}
	return this.animatedElement;
}

ITClicker.Ticket.prototype.animate=function() {
	this.animatedElement.style.left='100%';
}


ITClicker.Ticket.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-ticket '+'itclicker-ticket-'+this.type;
		this.element.style.width=this.charge+'px';
		
	}
	return this.element
}


























