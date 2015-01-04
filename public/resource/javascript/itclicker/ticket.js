ITClicker.Ticket=function(task, type, charge, level)
{
	this.task=task;
	this.charge=charge;
	this.type=type;
	this.element=null;
	
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
		this.charge-=effort.getPower();
		effort.setPower(0);
		this.updateElement();
		if(this.charge<=0) {
			this.destroy();
		}
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
}


ITClicker.Ticket.prototype.updateElement=function() {
	this.element.style.width=this.charge+'px';
}


ITClicker.Ticket.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-ticket '+'itclicker-ticket-'+this.type;
		this.element.style.width=this.charge+'px';
		
	}
	return this.element
}



