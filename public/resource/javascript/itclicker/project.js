ITClicker.Project=function(game, options)
{
	this.game=game;
	this.charge=100;
	this.element=null;
	
	this.tasks={};
	
	this.id=ITClicker.Actor.autoIncrement;
	ITClicker.Actor.autoIncrement++;
	
	
	this.options=this.defaultOptions;
	
	if(typeof(options)!=='undefined') {
		for(var attribute in options) {
			this.options[attribute]=options[attribute];
		}
	}
	
}




ITClicker.Project.prototype.defaultOptions={
	name: 'Super projet'
};

ITClicker.Project.autoIncrement=0;


ITClicker.Project.prototype.getId=function() {
	return this.id;
}


ITClicker.Project.prototype.createTask=function() {
	var task=new ITClicker.Task(this);
	this.addTask(task);
	return task;
}


ITClicker.Project.prototype.applyEffort=function(effort) {
	var task=this.getCurrentTask();
	
	if(task) {
		task.applyEffort(effort);
	}
}

ITClicker.Project.prototype.getCurrentTickets=function() {
	var task=this.getCurrentTask();
	if(task) {
		return task.getTickets();
	}
	return [];
}

ITClicker.Project.prototype.getCurrentTask=function() {
	for(var id in this.tasks) {
		return this.tasks[id]
	}
	
	return false;
}


ITClicker.Project.prototype.detroyTask=function(task) {

	this.game.addMoney(task.getValue());
	

	delete(this.tasks[task.getId()]);
	
	var finished=true;
	for(var id in this.tasks) {
		finished=false;
		break;
	}
}


ITClicker.Project.prototype.createRandomTask=function() {
	var task=this.createTask();
	

	var types=[
		'css',
		'php',
		'javascript',
		'html',
	]
	
	var tickets={};

	var charge=Math.random()*70+30;

	var typeIndex=Math.floor(Math.random()*types.length);
	var type=types[typeIndex]
	
	var level=Math.floor(Math.random()*99)+1;

	//if(typeof(tickets[typeIndex])=='undefined') {
		tickets[typeIndex]=task.createTicket(type, charge, level);
	//}
	//else {
		//tickets[typeIndex].addCharge(charge);
	//}
	


	var nbTicket=Math.floor(Math.random()*5)+10;
	
	nbTicket=8;


	for(var i=0; i<nbTicket; i++) {
	
		var charge=Math.random()*100;
		
		if(charge>10) {
			var typeIndex=Math.floor(Math.random()*types.length);
			var type=types[typeIndex]
		
			if(typeof(tickets[typeIndex])=='undefined' || 1) {
				tickets[typeIndex]=task.createTicket(type, charge);
			}
			else {
				tickets[typeIndex].addCharge(charge);
			}
		}
	}

	
	return task;
}



ITClicker.Project.prototype.createRandom=function(nbTask) {

	for(var i=0; i<nbTask; i++) {
		this.createRandomTask();
	}

}



ITClicker.Project.prototype.addTask=function(task) {
	this.tasks[task.getId()]=task;
}

ITClicker.Project.prototype.renderTask=function(task) {
	this.taskContainer.appendChild(task.getElement());
}


ITClicker.Project.prototype.getElement=function() {

	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-project';
			var titleBloc=document.createElement('div');
			titleBloc.className='name';
			titleBloc.innerHTML=this.options.name;
		this.element.appendChild(titleBloc);

			this.taskContainer=document.createElement('div');
			this.taskContainer.className='task';
		this.element.appendChild(this.taskContainer);


		
		
	}
	return this.element;
}


ITClicker.Project.prototype.render=function(container) {

	this.container=container;
	var element=this.getElement();
	this.container.appendChild(this.element);
	
	for(var id in this.tasks) {
		this.tasks[id].render();
	}
	
	return this.element;
}

//console.debug(ITClicker.Project.prototype);
