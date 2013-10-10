Ext.define('HungerApp.view.UserPledgeCharity', {
	extend: 'Ext.form.Panel',
	xtype: 'UserPledgeCharity',
	config: {
		defaults:{
			labelWidth: 'auto'
		},
		items : [
		/*	{
				docked: 'top',
				ui: 'plain',
				xtype: 'titlebar',
				title: 'User Pledge Charity',
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
				xtype : 'panel',
				layout: {
					type : 'hbox'
				},
				items : [
					{
						xtype  : 'selectfield',
						label: 'Select Charity',
						flex : 2,
						labelAlign: 'top',
						name: 'charity',
						placeHolder : 'Select Charity',
						options: [
							{text: 'First Option',  value: 'first'},
							{text: 'Second Option', value: 'second'},
							{text: 'Third Option',  value: 'third'}
						],
						autoSelect : false,
						displayField:'text'				
					},
					{
						xtype: 'selectfield',
						label: 'Amount',
						flex : 1,
						margin : '0 0 0 1em',
						labelAlign: 'top',
						name: 'amount',
						placeHolder : 'Amount',
						options: [
							{text: '$5',  value: 'first'},
							{text: '$10', value: 'second'},
							{text: '$15',  value: 'third'}
						],
						autoSelect : false,
						displayField:'text'				
					},
				]
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
				text  : 'Submit',
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
		//homeview.down('#mainNavigationTopbar').setHidden(false);
		homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
	}
});