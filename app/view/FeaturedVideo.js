Ext.define('HungerApp.view.FeaturedVideo', {
	extend: 'Ext.Panel',
	xtype: 'FeaturedVideo',
	config: {
		backForm: null,
		layout: 'vbox',
		padding: '1em',
		items : [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Featured Video',
				ui: 'plain',
				items:[{
					xtype: 'button',
					ui: 'back',
					text: 'Back',
					itemId: 'btnBack'
				}]
			},
			{
				xtype    : 'video',
				flex	 : 1,
				autoResume : true,
				url      : "http://www.w3schools.com/html/movie.mp4",
				posterUrl: 'http://t3.gstatic.com/images?q=tbn:ANd9GcSbXFQNac9_ND3jKI9Dvh2VF05eliTez8aZaj48Jo4vECE4nYJphA&t=1'
			}
		],
		listeners : [{
			delegate: '#btnBack',
			event: 'tap',
			fn: 'backToRegistration'
		}]
	},
	backToRegistration: function(){
		var backform = this.getConfig('backForm'),
			homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#' + backform, {type:'slide',direction: 'right'});
/*		if(backform)
			homeview.animateActiveItem('#' + backform, {type:'slide',direction: 'right'});
		else
			homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
			*/
		this.setConfig('backForm',null);
	},
	
});
