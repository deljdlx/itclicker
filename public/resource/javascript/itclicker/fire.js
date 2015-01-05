ITClicker.Fire=function(actor, ticket)
{
	this.actor=actor;
	this.ticket=ticket;

	this.element=null;

}

ITClicker.Fire.prototype.animate=function() {

	var ticketElement=this.ticket.animatedElement;
	var offsets=jQuery(ticketElement).offset();


	this.element.style.left=
		offsets.left+
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
		
	}.bind(this), false);
	
}


ITClicker.Fire.prototype.getElement=function() {
	if(!this.element) {
		this.element=document.createElement('div');
		this.element.className='itclicker-fire';
		
		var actorElement=this.actor.getElement();
		
		var offsets=jQuery(actorElement).offset();
		
		this.element.style.top=offsets.top+actorElement.offsetWidth/2+'px';
		this.element.style.left=offsets.left+actorElement.offsetHeight/2+'px';
	}

	return this.element;
}