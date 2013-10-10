Ext.define('HungerApp.view.ActionSheetViewChallenge', {
	extend: 'Ext.ActionSheet',
	xtype: 'ActionSheetViewChallenge',
	config: {
		hidden : true,
		items: [
			
			{
				text: 'Cancel',
				ui  : 'confirm',
				handler : function(){
					//ActionSheetImageOption.hide();
				}

			}
		]
	}
});
