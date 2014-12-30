ITClicker.OpenSpace=function(game)
{
	this.game=game;
	this.actors={};
	
	this.project={};
}

//ITClicker.OpenSpace.prototype.actors=[];



ITClicker.OpenSpace.prototype.addActor=function(actor) {
	this.actors[actor.getId()]=actor;
}
ITClicker.OpenSpace.prototype.removeActor=function(actor) {

	delete(this.actors[actor.getId()]);
}



ITClicker.OpenSpace.prototype.addProject=function(project) {
	this.actors[project.getId()]=project;
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
					}
				});

			this.actorContainer=document.createElement('div');
			this.actorContainer.className='itclicker-actorContainer';
			this.element.appendChild(this.actorContainer);
			
			this.makeDropable(this.element);
	}
	
	return this.element;
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


















