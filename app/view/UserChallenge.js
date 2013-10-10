Ext.define('HungerApp.view.UserChallenge', {
	extend: 'Ext.dataview.DataView',
	xtype: 'UserChallenge',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		store : 'UserChallenge',
		itemTpl: 	new Ext.XTemplate('<div style="width:100%">'+
						'<div class="title">{title}</div>'+
						'<div>{description}</div>'+
						'<tpl if="this.isPosted(posted)">'+
							'<div class="completedBtnCls" >Completed</div>'+
						'<tpl else>'+
							'<div class="postBtnCls" >Post to Feed</div>'+
						'</tpl>'+
					'</div>',
					{
						isPosted:function(post){
							console.log(post)
							return post == "true";
						}
					}),
		emptyText: 'No items',
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
		},{
			event: 'painted',
			fn: 'loadChanllenges'
		}]
	},
	onItemTapAction: function(ths,index,target,record,e){
		//console.log(record);
//		var homeview = Ext.Viewport.down('homeview');
//		homeview.down('#mainNavigationTopbar').setHidden(false);
//		homeview.animateActiveItem('#idActionSheetUploadImage',{type:'slide',direction: 'left'});
//		return;
		//var userStore = Ext.getStore('Profile');

		if(e.getTarget('.postBtnCls')){
			var me = this;
			msgbox = new Ext.MessageBox({
				message:"Pick video to upload",
				buttons: [{
					itemId: 'image',
					xtype: 'fileupload',
					text: 'Image',
					handler: this.hideMessageBox
				},{
					itemId: 'video',
					xtype: 'fileupload',
					text: 'Video',
					handler: this.hideMessageBox
				}],
				handler:function(){
					console.log("yess")
				}
			});
			var VideoBTN = msgbox.down('fileupload[itemId=video]');
			VideoBTN.on('loadsuccess',this.postToFeed,this);
			VideoBTN.on('success',this.onSuccesfullyPosted,this);
			VideoBTN.on('failure',this.onFailurePosted,this);
			VideoBTN.fileElement.dom.accept = "video/*";

			var imageBTN = msgbox.down('fileupload[itemId=image]');
			imageBTN.on('loadsuccess',this.postToFeedImage,this);
			imageBTN.on('success',this.onSuccesfullyPosted,this);
			imageBTN.on('failure',this.onFailurePosted,this);
			imageBTN.fileElement.dom.accept = "image/*";

			msgbox.show();
		}
	},
	hideMessageBox: function(ths){
		msgbox.hide();
	},
	postToFeed: function(a,b){
		var userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0),
			auth_token = record.get('auth_token'),
			user_id = record.get('user_id');
		var challengeRecord = this.getSelection()[0];
		var URL = applink + "api/player_challenges?auth_token=" + auth_token;
		var fileUP = msgbox.down('fileupload[itemId=video]');
		fileUP.setConfig({
			url: URL
		});
		fileUP.setName("avatar");
		var length = fileUP.fileElement.dom.files.length;
		if(length == 0){
			Ext.Msg.alert('Avatar','Select Avatar First');
			return;
		}
		fileUP.fileElement.dom.files.name = "avatar";
		fileUP.doUpload(fileUP.fileElement.dom.files[0],{
			"player_challenge[challenge_id]" : challengeRecord.get('challenge_id'),
			"player_challenge[user_id]" : user_id
		});
		Ext.Viewport.setMasked({xtype:'loadmask'});
	},
	postToFeedImage:function(a,b){
		var userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0),
			auth_token = record.get('auth_token'),
			user_id = record.get('user_id');
		var challengeRecord = this.getSelection()[0];
		var URL = applink + "api/player_challenges?auth_token=" + auth_token;
		var fileUP = msgbox.down('fileupload[itemId=image]');
		fileUP.setConfig({
			url: URL
		});
		fileUP.setName("avatar");
		var length = fileUP.fileElement.dom.files.length;
		if(length == 0){
			Ext.Msg.alert('Avatar','Select Avatar First');
			return;
		}
		fileUP.fileElement.dom.files.name = "avatar";
		fileUP.doUpload(fileUP.fileElement.dom.files[0],{
			"player_challenge[challenge_id]" : challengeRecord.get('challenge_id'),
			"player_challenge[user_id]" : user_id
		});
		Ext.Viewport.setMasked({xtype:'loadmask'});
	},
	onSuccesfullyPosted:function(){
		Ext.Viewport.setMasked(false);
		this.loadChanllenges();
	},
	onFailurePosted:function(){
		Ext.Viewport.setMasked(false);
		Ext.Msg.alert('','Media not Uploaded');
		var fileUP = msgbox.down('fileupload[itemId=video]');
		fileUP.reset();
	},
	loadChanllenges:function(){
		var userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0),
			user_id = record.get('user_id'),
			auth_token = record.get('auth_token');
		var userChallenge = Ext.getStore('UserChallenge'),
			userChallengeProxy = userChallenge.getProxy();
		userChallengeProxy.setExtraParams({
			'auth_token' : auth_token,
			'user_id' : user_id
		});
		userChallenge.load();
		Ext.Viewport.setMasked(false);
	}
});