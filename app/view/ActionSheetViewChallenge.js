Ext.define('HungerApp.view.ActionSheetViewChallenge', {
	extend: 'Ext.Panel',
	xtype: 'ActionSheetViewChallenge',
	config: {
		//height : '100%',
		//width  : '100%',
		backForm: null,
		layout : 'card',
		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				cls: 'topBarLoginCls',
				title: '',
				ui: 'plain',
				items:[{
					xtype: 'button',
					ui: 'plain',
					icon: 'resources/images/left_arrow.png',
					text: 'Back',
					handler : function(){
						//var homeview = Ext.Viewport.down('homeview');	
						//var ActionSheetViewChallenge = homeview.down('#idActionSheetViewChallenge');		
						//ActionSheetViewChallenge.hide();
						
						//var backform = this.getConfig('backForm');
						var homeview = Ext.Viewport.down('homeview');
						//if(backform)
							//homeview.animateActiveItem('#' + backform, {type:'slide',direction: 'right'});
						//else
							homeview.animateActiveItem('#idChallengeReview',{type:'slide',direction: 'right'});
						//this.setConfig('backForm',null);
						
					}
				}]
			},
			{
				xtype    : 'video',
				flex	 : 1,
				itemId	 : 'idVideo',
				//url      : "http://www.w3schools.com/html/movie.mp4",
				//posterUrl: 'http://t3.gstatic.com/images?q=tbn:ANd9GcSbXFQNac9_ND3jKI9Dvh2VF05eliTez8aZaj48Jo4vECE4nYJphA&t=1'
			},
			{
				xtype    : 'image',
				flex	 : 1,
				itemId	 : 'idImage',
				//src		 : 'http://t3.gstatic.com/images?q=tbn:ANd9GcSbXFQNac9_ND3jKI9Dvh2VF05eliTez8aZaj48Jo4vECE4nYJphA&t=1'
			}
		]
	}
});
