ITClicker.Actor=function(openSpace, options)
{
	this.openSpace=openSpace;
	this.id=ITClicker.Actor.autoIncrement;
	ITClicker.Actor.autoIncrement++;
	
	
	this.ready=false;
	
	
	this.options=this.defaultOptions;
	if(typeof(options)!=='undefined') {
		for(var attribute in options) {
			this.options[attribute]=options[attribute];
		}
	}
}

ITClicker.Actor.prototype.defaultOptions={

	loadingTime: 15000,
	competences: {
		php : {
			level: 1,
			power: 1
		},
		css: {
			level: 5,
			power: 1
		},
		javascript: {
			level: 5,
			power: 1
		},
		html: {
			level: 5,
			power: 1
		}
	}
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


ITClicker.Actor.prototype.getEffortTick=function() {
	return {
		actor: this,
		effort: this.options.competences
	};
}

ITClicker.Actor.prototype.animateEffort=function(ticket) {
	var fire=new ITClicker.Fire(this, ticket);
	document.body.appendChild(fire.getElement());
	fire.animate();
}




ITClicker.Actor.prototype.getElement=function() {
	if(!this.element) {
		
		this.element=document.createElement('div');
		this.element.manager=this;
		this.element.className='itclicker-actor';
		this.element.manager=this;
			this.actorContainer=document.createElement('div');
			this.actorContainer.className='itclicker-actorImage';
		this.element.appendChild(this.actorContainer);
		
			this.loaderContainer=document.createElement('div');
			this.loaderContainer.className='itclicker-actor-loaderContainer';
		this.element.appendChild(this.loaderContainer);

		jQuery(this.element).attr('unselectable', 'on')
			.css('user-select', 'none')
			.on('selectstart', false);
			
		this.makeDraggable(this.element);
	}
	
	return this.element;
}

ITClicker.Actor.prototype.makeDraggable=function(element) {
	var self=this;
	$(element).draggable({
		appendTo: 'body',
		helper: 'clone',
		start: function(event, ui) {
			if(!self.isReady()) {
				return false;
			}
			this.style.opacity=0.5;
		},
		stop: function(event, ui) {
			this.style.opacity=1;
		}
	});
}


ITClicker.Actor.prototype.triggerAction=function() {
	//this.actionEffect();
}



ITClicker.Actor.prototype.actionEffect=function() {
	var effectContainer=document.createElement('div');
	effectContainer.className='clickZone-effectContainer';
	effectContainer.innerHTML=this.getSentence();
	
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

ITClicker.Actor.prototype.getSentence=function() {

	var sentences=[
		'Hello world',
		'Parse error',
		'while(true) {',
		'Putin fait chier',
		'print_r($data);',
		'if(this.enable) {',
		'return Math.random(',
		'c\'est quoi cette merde !',
		'for(var attribute in instance) {',

	];

	var index=Math.floor(Math.random()*sentences.length);
	return sentences[index];



}

ITClicker.Actor.prototype.isReady=function() {
	return this.ready;
}


ITClicker.Actor.prototype.loading=function() {

	this.ready=false;

	jQuery(this.actorContainer).addClass('itclicker-actor-loading');
	var self=this;
	//jQuery(self.loaderContainer).empty();
	jQuery(self.loaderContainer).show();
	
	if(!this.loader) {
		this.loader=$(this.loaderContainer).circleProgress({
			startAngle:-Math.PI/2,
			value: 1,
			thickness: 5,
			size: 50,
			animation: {
				duration: this.options.loadingTime,
				ease: 'linear'
			},
			fill: {
				gradient: ["blue"]
			}
		});
		
		this.loader.on('circle-animation-end', function(event) {
			jQuery(self.loaderContainer).fadeOut();
			$(self.actorContainer).removeClass('itclicker-actor-loading');
			self.ready=true;
		});
	}
	else {
		this.loader.circleProgress('redraw');
	}
}



ITClicker.Actor.prototype.render=function(container) {
	var element=this.getElement();
	this.container=container;
	container.appendChild(element);
	
	
	this.loading();
	
	return this.element;
}












