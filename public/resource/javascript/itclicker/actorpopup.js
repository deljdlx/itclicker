ITClicker.ActorPopup=function(actor)
{


}

ITClicker.ActorPopup.bind=function(node) {
	var object=node.manger;
	
	console.debug(node);
}


ITClicker.ActorPopup.prototype.show=function() {
	
	console.debug('ici');
}






jQuery(function() {

	jQuery('.itclicker-actor').each(function(index, item) {
		ITClicker.ActorPopup.bind(item);
		
		
		/*
		this.onclick=function() {
		}.bind(this.manager);
		*/
1	});


	jQuery('.itclicker-closePopup').click(function() {
		jQuery('.itclicker-popup').hide();

	});
});






