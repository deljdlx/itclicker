ITClicker.Game=function()
{
	this.money=0;
	this.companyName='Biniou it ++';
}


/*
ITClicker.Game.prototype.launch=function() {
}
*/



ITClicker.Game.prototype.addMoney=function(value) {
	this.money+=value;
	
	var incrementMoney=function() {
		var currentValue=parseInt(this.moneyContainer.innerHTML);
		if(currentValue<this.money) {
		
			var increment=Math.max(
				Math.ceil((this.money-currentValue)/10),
				1
			);
		
			this.moneyContainer.innerHTML=currentValue+increment;
			setTimeout(function() {
				incrementMoney();
			}.bind(this), 20);
		}
	}.bind(this);
	incrementMoney();
}




ITClicker.Game.prototype.renderTopBar=function(container) {

	this.element=document.createElement('div');
	this.element.className='itclicker-topBar';


	this.avatarContainer=document.createElement('div');
	this.avatarContainer.className='itclicker-avatar';
	this.avatarContainer.innerHTML='<img src="resource/image/user/test/avatar.png"/>';
	this.element.appendChild(this.avatarContainer);

	this.moneyContainer=document.createElement('div');
	this.moneyContainer.className='itclicker-money';
	this.moneyContainer.innerHTML=this.money;
	this.element.appendChild(this.moneyContainer);
	
	this.companyContainer=document.createElement('div');
	this.companyContainer.className='itclicker-company';
	this.companyContainer.innerHTML=this.companyName;
	this.element.appendChild(this.companyContainer);

	
	
	
	
	container.appendChild(this.element);

}



/*
ITClicker.fireEvent=function(type, data, target) {
	var event=new CustomEvent(type,{detail: data});
	target.dispatchEvent(event);
	
	console.debug(event);
}
*/
