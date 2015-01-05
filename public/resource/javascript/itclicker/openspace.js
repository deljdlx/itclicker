ITClicker.OpenSpace=function(game)
{
	this.game=game;
	this.actors={};
	
	this.projects={};
	
	this.projectContainer;
	this.element;
	this.actorContainer;
}

//ITClicker.OpenSpace.prototype.actors=[];



ITClicker.OpenSpace.prototype.addActor=function(actor) {
	this.actors[actor.getId()]=actor;
}
ITClicker.OpenSpace.prototype.removeActor=function(actor) {

	delete(this.actors[actor.getId()]);
}



ITClicker.OpenSpace.prototype.addProject=function(project) {
	this.projects[project.getId()]=project;
	
	project.render(this.projectContainer);
}




ITClicker.OpenSpace.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		
		this.element.component=this;
		
		
		this.element.className='itclicker-openspace';

		
			this.clickContainer=document.createElement('div');
			this.clickContainer.className='itclicker-clickContainer';
			
				jQuery(this.clickContainer).attr('unselectable', 'on')
					.css('user-select', 'none')
					.on('selectstart', false);
					
					
			this.projectContainer=document.createElement('div');
			this.projectContainer.className='itclicker-projectContainer';
		this.element.appendChild(this.projectContainer);
			

			this.element.appendChild(this.clickContainer);
			
				var button=document.createElement('div');
				button.className='itclicker-clickButton';
				this.clickContainer.appendChild(button);
				
				
				var self=this;
				
				jQuery(button).mousedown(function() {
					jQuery(this).addClass('itclicker-clickButton_down');
				});
				jQuery(button).mouseup(function() {
					jQuery(this).removeClass('itclicker-clickButton_down');
				});
				
				jQuery(button).click(function() {
					for(var id in self.actors) {
						self.actors[id].triggerAction();
						
						var action=self.actors[id].getEffortTick();
						self.applyEffort(action);
					}
				});

			this.ticketContainer=document.createElement('div');
			this.ticketContainer.className='itclicker-ticketContainer';
				this.ticketContainerContent=document.createElement('div');
				this.ticketContainerContent.className='itclicker-ticketContainer-content';
			this.ticketContainer.appendChild(this.ticketContainerContent);
			
			this.element.appendChild(this.ticketContainer);


			this.actorContainer=document.createElement('div');
			this.actorContainer.className='itclicker-actorContainer';
			this.element.appendChild(this.actorContainer);
			this.makeDropable(this.element);
	}
	
	return this.element;
}

ITClicker.OpenSpace.prototype.testTicket=function() {
	
	
	var project=this.getCurrentProject();
	var tickets=[];
	
	if(project) {
		tickets=project.getCurrentTickets();
		var i=0;
		
		var self=this;
		
		for(var id in tickets) {
			var element=tickets[id].getAnimatedElement();
			self.ticketContainerContent.appendChild(element);
			
			setTimeout(function() {
				setTimeout(function() {
					this.animate()
				}.bind(this), 50);
			}.bind(tickets[id]), 1700*i);
			
			i++;
		}
		
	}
	
	
	//this.ticketContainer.appendChild(ticketElement);

}


ITClicker.OpenSpace.prototype.getCurrentProject=function() {
	for(var id in this.projects) {
		return this.projects[id];
	}
	return false;
}


ITClicker.OpenSpace.prototype.applyEffort=function(action) {
	
	var effort=action.effort;
	
	for(var skillName in effort) {
		var effortInstance=new ITClicker.Effort(
			skillName,
			effort[skillName].level,
			effort[skillName].power,
			action.actor
		);
		
		for(var id in this.projects) {
			var project=this.projects[id];
			project.applyEffort(effortInstance);
			break;
		}
	}
}










ITClicker.OpenSpace.prototype.makeDropable=function(element) {
	$(element).droppable({
		hoverClass: "hover",
		drop: function( event, ui ) {
			jQuery(this).find('.itclicker-actorContainer').append(ui.draggable);
			ui.draggable.get(0).component.setOpenSpace(this.component);
			jQuery(ui.draggable).css('opacity', 1);
		}
	});
}



ITClicker.OpenSpace.prototype.render=function(container) {

	var element=this.getElement();
	
	this.container=container;



	for(var id in this.actors) {
		this.actors[id].render(this.actorContainer);
	}


	this.container.appendChild(element);
	
	return element;

}


















