ITClicker.Ticket=function(task, type, charge, level)
{
	this.task=task;
	this.charge=charge;
	this.type=type;
	this.element=null;
	
	this.level=level;
	
	this.id=ITClicker.Ticket.autoIncrement;
	ITClicker.Ticket.autoIncrement++;
}



ITClicker.Ticket.autoIncrement=0;

ITClicker.Ticket.prototype.getId=function() {
	return this.id;
}


ITClicker.Ticket.prototype.addCharge=function(charge) {
	this.charge+=charge;
}


ITClicker.Ticket.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-ticket '+'itclicker-ticket-'+this.type;
		this.element.style.width=this.charge+'px';
		
	}
	return this.element
}



