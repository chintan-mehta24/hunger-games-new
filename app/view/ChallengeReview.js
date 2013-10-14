Ext.define('HungerApp.view.ChallengeReview', {
	extend: 'Ext.dataview.DataView',
	xtype: 'ChallengeReview',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		itemTpl: 	'<div class="thumb" style="background-image:url({avatar_url});"></div>'+
					'<div class="detail">'+
						'<div>{name} {last_name}</div>'+
						'<div>{email}</div>'+
						'<div class="actionBtn">'+
							'<div class="acceptCls">View</div>'+
							'<div class="denyCls">Rate</div>'+
						'</div>'+
					'</div>',
		emptyText: 'No items Review',
		store : 'ReviewList',								
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
		}]
	},
	onItemTapAction: function(ths,index,target,record,e){
		var userStore = Ext.getStore('Profile');
	
		if(e.getTarget('.acceptCls')){
			//alert("View clicked");
			var homeview = Ext.Viewport.down('homeview');	
			var ActionSheetViewChallenge = homeview.down('#idActionSheetViewChallenge');
			console.log(record.data.avatar_content_type,record.data.post_url);
			var post_url = record.data.post_url;
			var type = record.data.avatar_content_type.substr(0,5);
			if(type.toLowerCase()=="video")
			{
				ActionSheetViewChallenge.down('#idVideo').setHidden(false);
				ActionSheetViewChallenge.down('#idVideo').setUrl(post_url);
				ActionSheetViewChallenge.down('#idVideo').play();
				ActionSheetViewChallenge.down('#idVideo').ghost.hide();
				ActionSheetViewChallenge.down('#idVideo').media.show();
				ActionSheetViewChallenge.down('#idImage').setHidden(true);
			}
			else if(type.toLowerCase()=="image")
			{
				ActionSheetViewChallenge.down('#idVideo').setHidden(true);
				ActionSheetViewChallenge.down('#idImage').setHidden(false);
				ActionSheetViewChallenge.down('#idImage').setSrc(post_url);				
			}
			ActionSheetViewChallenge.setBackForm(this.getItemId());
			homeview.animateActiveItem('#idActionSheetViewChallenge',{type:'slide',direction: 'left'})
			
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		}
		if(e.getTarget('.denyCls')){
			//alert("Rate clicked");
			this.ratePrompt(record.data.user_id,userStore.getAt(0).data.auth_token,record.data.challenge_id);
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		}
	},
	
	ratePrompt: function(uid,token,cid){
		Ext.Msg.prompt("Rate","Enter your points",function(btn,data){
			if(btn == "ok"){
				if(Ext.isEmpty(data)){
					Ext.Msg.alert(null,'Points cannot be blank.',function(){
						this.ratePrompt(uid,token,cid);
					},this);
					return;
				}
				
				var num = Number(data);
				
				if((0>num) || (10<num) || (isNaN(data)==true)){
					Ext.Msg.alert(null,'Points should be within 0 to 10.',function(){
						this.ratePrompt(uid,token,cid);
					},this);
					return;
				}
				var homeController = HungerApp.app.getController('Home');
				homeController.sendPoints(uid,token,cid,data);
			}
		},this,false,false,{
			xtype: 'numberfield',
			placeHolder: 'Enter points'
		});
	},
	
});