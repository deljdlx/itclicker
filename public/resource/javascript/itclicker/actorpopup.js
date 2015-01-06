ITClicker.ActorPopup=function(actor)
{


}

ITClicker.ActorPopup.bind=function(node) {
	var object=node.manager;
}


ITClicker.ActorPopup.prototype.show=function() {
	jQuery(this.getElement()).show();
}






ITClicker.ActorPopup.prototype.getElement=function() {
	return jQuery('.itclicker-popup').get(0);
}








jQuery(function() {

	jQuery('.itclicker-actor').each(function(index, item) {
		ITClicker.ActorPopup.bind(item);
		
		this.onclick=function() {
			var popup=new ITClicker.ActorPopup(this);
			popup.show();
		}.bind(this.manager);
	
	});


	jQuery('.itclicker-closePopup').click(function() {
		jQuery('.itclicker-popup').hide();

	});
});






