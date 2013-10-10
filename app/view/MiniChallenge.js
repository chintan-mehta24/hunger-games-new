Ext.define('HungerApp.view.MiniChallenge', {
	extend: 'Ext.dataview.DataView',
	xtype: 'minichallenge',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'miniChallengesItemCls',
		itemTpl:	'<div class="title">{title}</div>'+
					'<div class="question">{question}</div>'+
					'<div class="detail">'+
						'<div class="actionBtn">'+
							'<tpl for="challenge_options"><div class="answer" attr="{id}">{option}</div></tpl>'+
						'</div>'+
					'</div>',
		store : 'MiniChallenge',								
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
		},{
			event: 'painted',
			fn: 'loadData'
		}]
	},
	loadData:function(){
		var store = this.getStore(),
			proxy = store.getProxy(),
			userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0);
		proxy.setExtraParams({
			auth_token: record.get('auth_token')
		});
		store.load();
		console.log("load")
		Ext.Viewport.setMasked(false);
	},
	onItemTapAction: function(ths,index,target,record,e){
		var el = e.getTarget('.answer');
		if(el){
			var answer_id = el.getAttribute('attr'),
				options = record.get('challenge_options');
			var user_Profile = Ext.getStore('Profile'),
				user_record = user_Profile.getAt(0),
				auth_token = user_record.get('auth_token');
			var answer = options.filter(function(value){
					if(value.id == answer_id) 
						return value.option;
			});
			if(answer.lenght == 0)
				return;
			Ext.Ajax.request({
				url:applink+"api/mini_challenges",
				method:"POST",
				jsonData : {
					auth_token: auth_token,
					mini_challenge:{
						mini_challenge_id: record.get('id'),
						option: answer[0]
					}
				},
				success:function(res){
					var loginData = Ext.decode(res.responseText);
					if(loginData.errors){
						Ext.Msg.alert("Error",loginData.errors);
						return;
					}
					Ext.Msg.alert("Success",loginData.message);
				},
				failure:function(res){
					console.log(res)
					Ext.Msg.alert(null,"Communication Error");
				}
			});
		}
	}
});