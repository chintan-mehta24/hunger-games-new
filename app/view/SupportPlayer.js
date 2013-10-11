Ext.define('HungerApp.view.SupportPlayer', {
	extend: 'Ext.form.Panel',
	xtype: 'SupportPlayer',
	config: {
		defaults:{
			labelWidth: 'auto'
		},
		items : [
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
				itemId: 'playerId',
				placeHolder : 'Select player',
				autoSelect : false,
				store: 'PlayerList',
				displayField: 'fullname',
				valueField: 'id'
			},
			{
				xtype : 'button',
				text  : 'Submit Support',
				itemId: 'btnSupportPlayer',
				cls   : 'submitBtnCls'
			}
		],
		listeners : [{
			delegate: '#btnRegistrationBack',
			event: 'tap',
			fn: 'backFromRegistration'
		},{
			event: 'painted',
			fn: 'loadPlayers'
		},{
			delegate: '#btnSupportPlayer',
			event: 'tap',
			fn: 'doSupportPlayer'
		}]
	},
	backFromRegistration: function(){
		var homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
	},
	loadPlayers: function(){
		var userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0),
			auth_token = record.get('auth_token'),
			playerList = Ext.getStore('PlayerList'),
			playerProxy = playerList.getProxy();
		playerProxy.setExtraParams({
			auth_token : auth_token
		});
		playerList.load();
		Ext.Viewport.setMasked(false);
	},
	doSupportPlayer:function(){
		var currentUserProfile = Ext.getStore('Profile'),
			currentUser = currentUserProfile.getAt(0),
			currentUser_id = currentUser.get('user_id');
		var field = this.down('#playerId'),
			value = field.getValue();
		console.log(value)
		if(!value)
			return;
		Ext.Ajax.request({
			url:applink+"api/users/support_to_player",
			method:"POST",
			jsonData : {
				auth_token : currentUser.get('auth_token'),
				support : value
			},
			success:function(res){
				var resData = Ext.decode(res.responseText);
				if(resData.errors){
					Ext.Msg.alert("Error",resData.errors);
					return;
				}
				Ext.Msg.alert("",resData.message);
			},
			failure:function(res){
				Ext.Msg.alert("Error","Status Code: " + res.status);
			}
		});
	}
});