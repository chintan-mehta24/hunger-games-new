Ext.define('HungerApp.view.PlayerRequestList', {
	extend: 'Ext.dataview.DataView',
	xtype: 'PlayerRequestList',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		itemTpl: 	'<div class="thumb" style="background-image:url({avatar_url});"></div>'+
					'<div class="detail">'+
						'<div>{name} {last_name}</div>'+
						'<div>{email}</div>'+
						'<div class="actionBtn">'+
							'<div class="acceptCls">Accept</div>'+
							'<div class="denyCls">Deny</div>'+
						'</div>'+
					'</div>',
		store : 'PlayerRequest',								
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
		}]
	},
	onItemTapAction: function(ths,index,target,record,e){
		//console.log(record);
		//return;
		var userStore = Ext.getStore('Profile');

		if(e.getTarget('.acceptCls')){
			//alert("Yes clicked");
			var homeController = HungerApp.app.getController('Home');
			homeController.sendReason(userStore.getAt(0).data.auth_token,"accept",record.data.user_id,"");

			
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		}
		if(e.getTarget('.denyCls')){
			//alert("No clicked");
			this.getReason(userStore.getAt(0).data.auth_token,record.data.user_id);
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		}
	},
	
	getReason: function(token,uid){
		Ext.Msg.prompt(null,"No? Please give a reason why?",function(btn,data){
			if(btn == "ok"){
				if(Ext.isEmpty(data)){
					Ext.Msg.alert(null,'Please enter a reason.',function(){
						this.getReason(token,uid);
					},this);
					return;
				}
				var homeController = HungerApp.app.getController('Home');
				homeController.sendReason(token,"reject",uid,data);
			}
		},this,false,false,{
			xtype: 'textareafield',
			placeHolder: 'Enter reason'
		});
	},

});