ITClicker.Fire=function(actor, ticket)
{
	this.actor=actor;
	this.ticket=ticket;

	this.element=null;
	this.speed=0.4;

}

ITClicker.Fire.prototype.animate=function() {


	var ticketLeftPosition=this.ticket.getPositionIn(this.speed);


	var ticketElement=this.ticket.animatedElement;
	var offsets=jQuery(ticketElement).offset();

	if(ticketElement) {

		this.element.style.left=
			ticketLeftPosition+
			(ticketElement.offsetWidth/2)
			+(this.element.offsetWidth/2)
			+'px';
		

		this.element.style.top=
			offsets.top+
			(ticketElement.offsetHeight/2)
			-(this.element.offsetHeight/2)
			+'px';

		this.element.addEventListener('transitionend', function() {
		
			jQuery(ticketElement).addClass('fire');
			setTimeout(function() {
				jQuery(ticketElement).removeClass('fire');
			}, 100);
			
			jQuery(this.element).remove();
			
			delete(this);
			
		}.bind(this), false);
	}
	else {
		this.destroy();
	}
}

ITClicker.Fire.prototype.destroy=function() {
	jQuery(this.element).remove();
	delete(this.ticket);
	delete(this.actor);
}

ITClicker.Fire.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-fire';


		this.element.style.transitionDuration=this.speed+'s';

		
		var actorElement=this.actor.getElement();
		
		var offsets=jQuery(actorElement).offset();
		
		this.element.style.top=offsets.top+actorElement.offsetWidth/2+'px';
		this.element.style.left=offsets.left+actorElement.offsetHeight/2+'px';
	}

	return this.element;
}