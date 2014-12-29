ITClicker.Actor=function(openSpace)
{
	this.openSpace=openSpace;
	this.id=ITClicker.Actor.autoIncrement;
	ITClicker.Actor.autoIncrement++;
}


ITClicker.Actor.autoIncrement=0;


ITClicker.Actor.prototype.getId=function() {
	return this.id;
}

ITClicker.Actor.prototype.setOpenSpace=function(openSpace) {
	if(this.openSpace) {
		this.openSpace.removeActor(this);
	}

	this.openSpace=openSpace;
	openSpace.addActor(this);
}






ITClicker.Actor.prototype.getElement=function() {
	if(!this.element) {
		
		this.element=document.createElement('div');
		this.element.component=this;
		this.element.className='itclicker-actor';

		jQuery(this.element).attr('unselectable', 'on')
			.css('user-select', 'none')
			.on('selectstart', false);
	}
	
	
	this.element.onclick=function() {
	
		this.triggerAction();
		
	}.bind(this);
	
	return this.element;
}

ITClicker.Actor.prototype.triggerAction=function() {

	

	this.actionEffect();
}



ITClicker.Actor.prototype.actionEffect=function() {
	var effectContainer=document.createElement('div');
	effectContainer.className='clickZone-effectContainer';
	effectContainer.innerHTML='effect';
	
	effectContainer.style.top=this.element.offsetTop+'px';
	
	document.body.appendChild(effectContainer);

	var offsets=jQuery(this.element).offset();
	

	var baseLeft=offsets.left-(effectContainer.offsetWidth/2)+(this.element.offsetWidth/2)
	
	effectContainer.style.left=baseLeft+'px';
	effectContainer.style.top=offsets.top+'px';
	
	
	jQuery(effectContainer).animate({
		top:0,
		opacity: 0
	}, 800, function() {
		jQuery(effectContainer).remove();
	});
}



ITClicker.Actor.prototype.render=function(container) {
	var element=this.getElement();
	this.container=container;
	container.appendChild(element);
	return this.element;
}