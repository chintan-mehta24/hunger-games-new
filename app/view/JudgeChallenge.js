Ext.define('HungerApp.view.JudgeChallenge', {
	extend: 'Ext.dataview.DataView',
	xtype: 'JudgeChallenge',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		store : 'UserChallenge',
		itemTpl: 	'<div class="detail">'+
						'<div style="font-size:1.2em;">{title}</div>'+
						'<div>{description}</div>'+
						//'<tpl if="!is_published">'+
							'<div class="postBtnCls" >View & Rate</div>'+
						//'</tpl>'+
					'</div>',
		emptyText: 'No items',
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
		}]
	},
	onItemTapAction: function(ths,index,target,record,e){
		//console.log(record);
		//var homeview = Ext.Viewport.down('homeview');
		//homeview.down('#mainNavigationTopbar').setHidden(false);
		//homeview.animateActiveItem('#idActionSheetUploadImage',{type:'slide',direction: 'left'});
		//return;
		console.log("record",record,record.data.challenge_id);
		var userStore = Ext.getStore('Profile');
		var token = userStore.data.getAt(0).data.auth_token;
		var challenge_id= record.data.challenge_id;
		
		
		if(e.getTarget('.postBtnCls')){
			var me = this;
			Ext.Ajax.request({
				url:applink+"api/player_challenges/list_of_player_for_challenge?auth_token="+token,
				method:"POST",
				jsonData : {
					challenge_id : challenge_id
				},
				success:function(res){
					console.log(res);
					var loginData = Ext.decode(res.responseText);
					if(loginData.errors)
					{
						Ext.Msg.alert("Error",loginData.errors);
						return;
					}
					
					var store = Ext.getStore('ReviewList');
					store.clearData();
					store.add(loginData.player_challenges);
					
					
					var homeview = Ext.Viewport.down('homeview');
					homeview.down('#mainNavigationTopbar').setHidden(false);
					homeview.animateActiveItem('#idChallengeReview',{type:'slide',direction: 'left'});
				},
				failure:function(res){
					Ext.Msg.alert(null,"Communication Error");
				}
			});
			
			//var homeController = HungerApp.app.getController('Home');
			//homeController.sendChallengePost(userStore.getAt(0).data.auth_token,"accept",record.data.user_id,"");

			
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		}
	},

});