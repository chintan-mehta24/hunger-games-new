Ext.define('HungerApp.view.UserChallenge', {
	extend: 'Ext.dataview.DataView',
	xtype: 'UserChallenge',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		store : 'UserChallenge',
		itemTpl: 	'<div style="width:100%">'+
						'<div class="title">{title}</div>'+
						'<div>{description}</div>'+
						'<tpl if="!is_published">'+
							'<div class="postBtnCls" >Post to Feed</div>'+
						'<tpl else>'+
							'<div class="completedBtnCls" >Completed</div>'+
						'</tpl>'+
					'</div>',
		emptyText: 'No items',
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
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
				buttons: [/*{
					itemId: 'image',
					xtype: 'fileupload',
					text: 'Image',
					handler: this.hideMessageBox
				},*/{
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
			msgbox.down('fileupload[itemId=video]').on('loadsuccess',this.postToFeed,this);
			msgbox.down('fileupload[itemId=video]').on('success',this.onSuccesfullyPosted,this);
			msgbox.down('fileupload[itemId=video]').on('failure',this.onFailurePosted,this);
			//var imageBtn = s;
			VideoBTN.fileElement.dom.accept = "video/*";
			msgbox.show();
		}
	},
	hideMessageBox: function(ths){
		msgbox.hide();
	},
	postToFeed: function(a,b){
		console.log("onPhotoSelect",a,b)		
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
	onSuccesfullyPosted:function(){
		Ext.Viewport.setMasked(false);
	},
	onFailurePosted:function(){
		Ext.Viewport.setMasked(false);
		Ext.Msg.alert('','Media not Uploaded');
		var fileUP = msgbox.down('fileupload[itemId=video]');
		fileUP.reset();
	}
});