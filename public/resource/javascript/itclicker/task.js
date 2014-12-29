ITClicker.Task=function(project)
{
	this.project=project;
	this.project.addTask(this);

}

ITClicker.Task.prototype.element=null;
ITClicker.Task.prototype.tickets=[];



ITClicker.Task.prototype.createTicket=function(type, charge) {
	var ticket=new ITClicker.Ticket(this, type, charge);
	this.tickets.push(ticket);
	return ticket;
}



ITClicker.Task.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-task';
		
		for(var i=0; i<this.tickets.length; i++) {
			this.tickets[i].render();
		}
		
	}
	return this.element
}




ITClicker.Task.prototype.render=function() {
	var element=this.getElement();
	this.project.getElement().appendChild(element);
	return this.element;
}


