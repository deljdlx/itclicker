ITClicker.Ticket=function(task, type, charge)
{
	this.task=task;
	this.charge=charge;
	this.type=type;
}



ITClicker.Ticket.prototype.element=null;


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

ITClicker.Ticket.prototype.render=function() {
	var element=this.getElement();
	this.task.getElement().appendChild(element);
	return this.element;
}


