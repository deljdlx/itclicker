ITClicker.Project=function(game)
{
	this.game=game;
	this.charge=100;
	this.element=null;
	
	this.tasks=[];
	
	this.id=ITClicker.Actor.autoIncrement;
	
	ITClicker.Actor.autoIncrement++:
	
}




ITClicker.Actor.autoIncrement=0;


ITClicker.Project.prototype.getid=function() {
	return this.id;
}


ITClicker.Project.prototype.createTask=function() {
	var task=new ITClicker.Task(this);
	this.addTask(task);
	return task;
}

ITClicker.Project.prototype.createRandomTask=function() {
	var task=this.createTask();
	

	var types=[
		'developpement',
		'integration',
		'database',
		'javascript',
		'sysadmin',
		'test',
	]
	
	var tickets={};

	var charge=Math.random()*70+30;

	var typeIndex=Math.floor(Math.random()*types.length);
	var type=types[typeIndex]

	if(typeof(tickets[typeIndex])=='undefined') {
		tickets[typeIndex]=task.createTicket(type, charge);
	}
	else {
		tickets[typeIndex].addCharge(charge);
	}
	


	var nbTicket=Math.floor(Math.random()*5);


	for(var i=0; i<nbTicket; i++) {
	
		var charge=Math.random()*100;
		
		if(charge>10) {
			var typeIndex=Math.floor(Math.random()*types.length);
			var type=types[typeIndex]
		
			if(typeof(tickets[typeIndex])=='undefined') {
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
	this.tasks.push(task);
}




ITClicker.Project.prototype.getElement=function() {

	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-project';
	}
	return this.element;
}


ITClicker.Project.prototype.render=function(container) {

	this.container=container;
	var element=this.getElement();
	this.container.appendChild(this.element);
	
	for(var i=0; i<this.tasks.length; i++) {
		this.tasks[i].render();
	}
	
	return this.element;
}

//console.debug(ITClicker.Project.prototype);
