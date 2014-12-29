ITClicker.ClickZone=function(game)
{
	this.game=game;
}

ITClicker.ClickZone.prototype.element=null;
ITClicker.ClickZone.prototype.container=null;



ITClicker.ClickZone.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='clickZone';
		this.bindEvent(this.element);
	}
	return this.element;
}


ITClicker.ClickZone.prototype.render=function(container) {
	
	var element=this.getElement();
	
	this.container=container;
	container.appendChild(element);
	return this.element;
}

ITClicker.ClickZone.prototype.bindEvent=function(element) {
	element.onclick=function() {
		this.clickEffect();
	}.bind(this);
}




ITClicker.ClickZone.prototype.clickEffect=function() {
	var effectContainer=document.createElement('div');
	effectContainer.className='clickZone-effectContainer';
	effectContainer.innerHTML='effect';
	
	effectContainer.style.top=this.element.offsetTop+'px';
	
	this.container.appendChild(effectContainer);
	
	var baseLeft=this.element.offsetLeft-(effectContainer.offsetWidth/2)+(this.element.offsetWidth/2)
	
	effectContainer.style.left=baseLeft+'px';
	
	jQuery(effectContainer).animate({
		top:0,
		opacity: 0
	}, 800, function() {
		jQuery(effectContainer).remove();
	});
}