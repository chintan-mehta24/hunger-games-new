Ext.define('HungerApp.view.SupportPlayer', {
	extend: 'Ext.form.Panel',
	xtype: 'SupportPlayer',
	config: {
		defaults:{
			labelWidth: 'auto'
		},
		items : [
		/*	{
				docked: 'top',
				ui: 'plain',
				xtype: 'titlebar',
				title: 'Support Player',
				items:[{
					xtype: 'button',
					ui: 'back',
					text: 'Back',
					itemId: 'btnRegistrationBack'
				}]
			},*/
			{
				xtype : 'label',
				cls: 'welcomeMsgCls',
				html  : 'Wellcome message'
			},
			{
				xtype: 'selectfield',
				label: 'Select player',
				flex : 1,
				labelAlign: 'top',
				name: 'player',
				placeHolder : 'Select player',
				options: [
					{text: 'P - 1',  value: 'first'},
					{text: 'P - 2', value: 'second'},
					{text: 'P - 3',  value: 'third'}
				],
				autoSelect : false,
				displayField:'text'				
			},
			{
				xtype : 'button',
				text  : 'Submit Support',
				cls   : 'submitBtnCls'
			}
		],
		listeners : [{
			delegate: '#btnRegistrationBack',
			event: 'tap',
			fn: 'backFromRegistration'
		}]
	},
	backFromRegistration: function(){
		var homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
	}
});