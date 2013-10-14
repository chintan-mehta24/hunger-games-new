Ext.define('HungerApp.view.ActionSheetViewChallenge', {
	extend: 'Ext.ActionSheet',
	xtype: 'ActionSheetViewChallenge',
	config: {
		height : '100%',
		width  : '100%',
		hidden : true,
		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Video',
				ui: 'plain',
				items:[{
					xtype: 'button',
					text: 'close',
					handler : function(){
						var homeview = Ext.Viewport.down('homeview');	
						var ActionSheetViewChallenge = homeview.down('#idActionSheetViewChallenge');		
						ActionSheetViewChallenge.hide();
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
