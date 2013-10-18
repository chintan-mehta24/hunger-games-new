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
			var homeview = Ext.Viewport.down('homeview');	
			var ActionSheetViewChallenge = homeview.down('#idActionSheetViewChallenge');
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
			
		}
		if(e.getTarget('.denyCls')){
			this.ratePrompt(record.data, userStore.getAt(0).data.auth_token);
		}
	},
	
	ratePrompt: function(recordData,token){
		var data = Ext.apply({
				auth_token: token
			},recordData);
		var ratePromptView = Ext.Viewport.add({
			xtype: 'panel',
			centered: true,
			modal: true,
			rateData: data,
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
		userData.points = rate;
		console.log(userData);
		homeController.sendPoints(userData);
	}
});