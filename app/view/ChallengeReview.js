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
			var videoView = ActionSheetViewChallenge.down('#idVideo');
			var imageView = ActionSheetViewChallenge.down('#idImage');
			if(type.toLowerCase()=="video"){
				videoView.setHidden(false);
				videoView.setUrl(post_url);
				videoView.play();
				videoView.ghost.hide();
				videoView.media.show();
				imageView.setHidden(true);
			}
			else if(type.toLowerCase()=="image"){
				videoView.setHidden(true);
				imageView.setHidden(false);
				imageView.setSrc(post_url);				
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
/* 		Ext.Msg.prompt("Rate","Enter your points",function(btn,data){
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
		}); */
		

		var ratePromptView = Ext.Viewport.add({
			xtype: 'panel',
			centered: true,
			modal: true,
			rateData: {
				user_id : uid,
				auth_token: token,
				challenge_id: cid
			},
			cls: ['x-msgbox','ratingPromptCls'],
			items:[{
					xtype: 'titlebar',
					docked: 'top',
					cls:'x-msgbox-title',
					title: 'Rate'
				},{
					xtype: 'dataview',
					inline: true,
					cls: 'ratingDataviewCls',
					itemTpl: '<div>{number}</div>',
					scrollable: null,
					data: [
						{number:1},{number:2},{number:3},
						{number:4},{number:5},{number:6},
						{number:7},{number:8},{number:9},
						{number:10}
					]
				},
				{
					xtype: 'titlebar',
					docked:'bottom',
					cls:'x-msgbox-buttons',
					items:[{
						xtype: 'button',
						cls: 'x-button',
						align: 'left',
						itemId: 'cancel',
						text: 'Cancel'
					},{
						xtype: 'button',
						align: 'right',
						cls: 'x-button',
						itemId: 'ok',
						text: 'Ok'
					}]
				}
			]
		});
		var btn = ratePromptView.down('#cancel');
		btn.on('tap',ratePromptView.hide,ratePromptView);
		var btn = ratePromptView.down('#ok');
		btn.on('tap',this.doTapOnRateButton, ratePromptView);
	},
	doTapOnRateButton: function(){
		var dataview = this.down('dataview');
		var selection = dataview.getSelection();
		if(!selection.length){
			Ext.Msg.alert('','Please select number');
			return;
		}
		var rate = selection[0].get('number');
		this.hide({duration: 300,type: 'fade',out:true});
		var userData = this.config['rateData'];
		var homeController = HungerApp.app.getController('Home');
		homeController.sendPoints(userData.user_id, userData.auth_token, userData.challenge_id, rate);
	}
});