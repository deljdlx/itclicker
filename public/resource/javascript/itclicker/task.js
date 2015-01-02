ITClicker.Task=function(project, task)
{

	this.id=ITClicker.Task.autoIncrement;
	ITClicker.Task.autoIncrement++;

	this.project=project;
	this.project.addTask(this);
	this.options=this.defaultOptions;

	this.element=null;
	this.tickets=[];


	this.options=this.defaultOptions;
	if(typeof(options)!=='undefined') {
		for(var attribute in options) {
			this.options[attribute]=options[attribute];
		}
	}

}

ITClicker.Task.autoIncrement=0;



ITClicker.Task.prototype.defaultOptions={
	name: 'Tâche'
}

ITClicker.Task.prototype.getId=function() {
	return this.id;
}


ITClicker.Task.prototype.applyEffort=function(effort) {

	for(var id in this.tickets) {
		var ticket=this.tickets[id];
		ticket.applyEffort(effort);
	}

	//console.debug(effort);
}



ITClicker.Task.prototype.createTicket=function(type, charge, level) {
	var ticket=new ITClicker.Ticket(this, type, charge, level);
	
	this.addTicket(ticket);
	
	//this.tickets.push(ticket);
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


