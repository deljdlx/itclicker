ITClicker.Task=function(project)
{

	this.id=ITClicker.Task.autoIncrement;
	ITClicker.Task.autoIncrement++;


	this.project=project;
	this.game=this.project.game;
	
	this.project.addTask(this);
	this.options=this.defaultOptions;

	this.element=null;
	this.tickets={};


	this.options=this.defaultOptions;
	if(typeof(options)!=='undefined') {
		for(var attribute in options) {
			this.options[attribute]=options[attribute];
		}
	}
	
	this.value=1000;
	

}

ITClicker.Task.autoIncrement=0;


ITClicker.Task.prototype.getTickets=function() {
	return this.tickets;
}


ITClicker.Task.prototype.defaultOptions={
	name: 'Tâche'
}

ITClicker.Task.prototype.getId=function() {
	return this.id;
}


ITClicker.Task.prototype.getValue=function() {
	return this.value;
}

ITClicker.Task.prototype.applyEffort=function(effort) {

	for(var id in this.tickets) {
		var ticket=this.tickets[id];
		if(ticket.applyEffort(effort)) {
			return ticket;
		}
	}
}

ITClicker.Task.prototype.destroyTicket=function(ticket) {
	this.game.addMoney(ticket.getValue());
	
	delete(this.tickets[ticket.getId()]);
	
	var finished=true;
	for(var id in this.tickets) {
		finished=false;
		break;
	}
	
	if(finished) {
		this.destroy();
	}
	
}

ITClicker.Task.prototype.destroy=function() {


	this.project.detroyTask(this);

	this.ticketContainer.style.height=0;
	this.ticketContainer.style.opacity=0;
	setTimeout(function() {
		jQuery(this.element).remove();
	}.bind(this), 300);
}



ITClicker.Task.prototype.createTicket=function(type, charge, level) {
	var ticket=new ITClicker.Ticket(this, type, charge, level);
	this.addTicket(ticket);
	return ticket;
}

ITClicker.Task.prototype.renderTicket=function(ticket) {
	this.ticketContainer.appendChild(ticket.getElement());
}


ITClicker.Task.prototype.addTicket=function(ticket) {
	this.tickets[ticket.getId()]=ticket;
}



ITClicker.Task.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-task';
			this.ticketContainer=document.createElement('div');
			this.ticketContainer.className='ticketContainer';
		this.element.appendChild(this.ticketContainer);
		
		for(var id in this.tickets) {
			this.renderTicket(this.tickets[id]);
			//this.tickets[i].render();
		}
		
	}
	return this.element
}




ITClicker.Task.prototype.render=function() {
	var element=this.getElement();
	this.project.renderTask(this);
	return this.element;
}


