Ext.define('HungerApp.view.MainActivity', {
	extend: 'Ext.dataview.DataView',
	xtype: 'mainfeedactivity',
	config:{
		cls: 'clsMainFeedActivity',
		padding: '1em',
		style : 'color : white;',
		itemTpl: new Ext.XTemplate([
						'<div class="thumb avatar" style="background-image:url({profile_image});"></div>',
						'<div class="badge"  style="background-image:url({badge});"></div>',
						'<div class="endorsPlayer">',
							'<div>',
								'<div class="title">{user_name}<span>{created_at:this.convertDate}</span></div>',
								'<div class="message">{message}</div>',
								'<tpl if="avatar_image"><div class="poster" style="background-image:url({avatar_image});"></div></tpl>',
							'</div>',
							'<div class="comments">{feed_comments:this.commentCount} Comments',
									'<span class="like <tpl if=\"is_like\">dislike</tpl>"></span>',
									'<span class="comment"></span>',
							'</div>',
							'<tpl if="this.commentCount(feed_comments) &gt; 0"><div class="comment-list">',
								'<tpl for="feed_comments">',
									'<div class="username">{user_name}</div>',
									'<div class="message">{message}</div>',
								'</tpl>',
							'</div></tpl>',
						'</div>',
					'{feed_comments:this.getCommentsList}',
					].join(""),
					{	
						convertDate: function(date){
							return Ext.Date.format(new Date(date),"m/d/y");
						},
						commentCount: function(comment){
							return comment.length;
						},
						getCommentsList: function(comments){
							var HTML = "";
							return HTML;
							console.log(comments)
							for(comment in comments){
								HTML += ('<div class="comment_details">' +
											'<div class="thumb avatar" style="background-image:url(' + comment.profile_image + ');"></div>'+
											'<div class="title">'+ comment.user_name + 
												'<span>'+this.convertDate(comment.created_at) + '</span>'+
											'</div>'+
											'<div class="message">'+comment.message+'</div>'+
										'</div>');
							}
							return HTML
						}
					}),
		emptyText: 'No activity availiable',
		store: 'MainActvityFeed',
		items:[{
			xtype: 'toolbar',
			docked: 'top',
			layout:{
//				align:'stretch',
				pack: 'justify'
			},
			cls: 'clsTopbar',
			ui: 'plain',
			items:[{
				xtype: 'textfield',
				flex: 1,
				itemId: 'idTxtPost',
				placeHolder : 'POST AN UPDATE',
				clearIcon: false
			},{
				// xtype: 'button',
				xtype : 'fileupload',
				iconMask:true,
				itemId: 'idBtnImagePost',
				ui: 'plain',
				icon: 'resources/images/camera.png',
			},{
				xtype: 'button',
				ui: 'plain',
				itemId: 'idBtnTextPost',
				icon: 'resources/images/pencil.png',
			}]
		}],
		listeners:[{
			event: 'painted',
			fn: 'loadMainActivityList'
		},{
			event: 'itemtap',
			fn: 'onItemTapAction'
		},{
			delegate: '#idBtnTextPost',
			event: 'tap',
			fn: 'doTextPost'
		},{
			delegate: '#idBtnImagePost',
			event: 'loadsuccess',	//onFail to select Image 
			fn: 'doLoadImage'
		},{
			delegate: '#idBtnImagePost',
			event: 'loadfailure',	//onFail to select Image 
			fn: function(){
				console.log("Load Failure");
			}
		},{
			delegate: '#idBtnImagePost',
			event: 'success',		//onSuccesfull Image upload
			fn: 'reloadStore'
		},{
			delegate: '#idBtnImagePost',
			event: 'failure',		//onFail Image upload
			fn: 'onFailUpload'
		}]
	},
	onItemTapAction: function(ths,index,target,record,e){
 		if(e.getTarget('.avatar')){
//			var homeview = Ext.Viewport.down('homeview');
//			homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
			var homeController=HungerApp.app.getController('Home');
			homeController.setProfilePageData(record.get('user_id'));
			return true;
		}	
		var me = this;
 		var el = e.getTarget('.like');
		if(el){
			var like = !e.getTarget('.dislike');
			this.doLikeDislike(record,like);
			return true;
		}
		var elComment = e.getTarget('.comment');
		if(elComment){
			var msgBox = Ext.Msg.prompt(record.get("user_name"),"Enter the Text to Comment:",function(btn,value){
				if(btn=="ok")
					me.doComment(record,value);
			},me,null,null,{
				itemId: "commentField"
				// listeners:{
					// action: function(){
						// console.log("actions")
					// }
				// }
			});	
			msgBox.down('#commentField').on('action',function(ths){
				msgBox.hide();
				me.doComment(record,ths.getValue());
			});
			return true;
		}
		if(e.getTarget('.comments')){
			var me = this;
			target.addCls("show-comment");
			return true;
		}
	},
	loadMainActivityList: function(){
		var store = Ext.getStore('MainActvityFeed'),
			proxy = store.getProxy(),
			userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0);
		proxy.setExtraParams({
			auth_token: record.get('auth_token')
		});
		store.load();
		Ext.Viewport.setMasked(false);
	},
	doTextPost: function(){
		var store = Ext.getStore('Profile'),
			record = store.getAt(0),
			auth_token = record.get('auth_token'),
			textField = this.down('#idTxtPost'),
			value = textField.getValue();
		if(Ext.isEmpty(value)){
			Ext.Msg.alert("Error","Post can\'t be blank.");
			return;
		}
		Ext.Ajax.request({
			url:applink+"api/activity_feeds",
			method:"POST",
			jsonData : {
				auth_token: auth_token,
				activity_feed:{
					message: value
				}
			},
			success:function(res){
				var loginData = Ext.decode(res.responseText);
				if(loginData.errors){
					Ext.Msg.alert("Error",loginData.errors);
					return;
				}
				Ext.getStore('MainActvityFeed').load();
				Ext.Viewport.setMasked(false);
				textField.reset();
				Ext.Msg.alert("Success",loginData.message);
			},
			failure:function(res){
				console.log(res)
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
	doLikeDislike: function(record,like){
		console.log(record,like);
		var store = Ext.getStore('Profile'),
			my_record = store.getAt(0),
			auth_token = my_record.get('auth_token');
		Ext.Ajax.request({
			url:applink+"api/activity_feeds/like_n_dislike_activity_feed",
			method:"POST",
			jsonData : {
				auth_token: auth_token,
				activity_feed_id: record.get('activity_id')
			},
			success:function(res){
				var loginData = Ext.decode(res.responseText);
				if(loginData.errors){
					Ext.Msg.alert("Error",loginData.errors);
					return;
				}
				record.set('is_like',like);
				Ext.Msg.alert("Success",loginData.message);
			},
			failure:function(res){
				console.log(res)
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
	doComment: function(record,message){
		var store = Ext.getStore('Profile'),
			my_record = store.getAt(0),
			auth_token = my_record.get('auth_token');
		Ext.Ajax.request({
			url:applink+"api/activity_feeds/comment_on_activity_feed",
			method:"POST",
			jsonData : {
				auth_token: auth_token,
				activity_feed_id: record.get('activity_id'),
				message: message
			},
			success:function(res){
				var loginData = Ext.decode(res.responseText);
				if(loginData.errors){
					Ext.Msg.alert("Error",loginData.errors);
					return;
				}
				Ext.getStore('MainActvityFeed').load();
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert("Success",loginData.message);
			},
			failure:function(res){
				console.log(res)
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
	doLoadImage: function(image){
		var userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0),
			auth_token = record.get('auth_token'),
			textField = this.down('#idTxtPost'),
			value = textField.getValue();
		var URL = applink + "api/activity_feeds?auth_token=" + auth_token;
		//activity_feed[avatar]
		//activity_feed[message]
		var fileUP = this.down('#idBtnImagePost');
		fileUP.setConfig({
			url: URL
		});
		fileUP.setName("activity_feed[avatar]");
		var length = fileUP.fileElement.dom.files.length;
		if(length == 0){
			Ext.Msg.alert('Avatar','Select Avatar First');
			return;
		}
		fileUP.fileElement.dom.files.name = "activity_feed[avatar]";
		fileUP.doUpload(fileUP.fileElement.dom.files[0],{
			"activity_feed[message]" : value
		});
		Ext.Viewport.setMasked({xtype:'loadmask'});
	},
	reloadStore: function(response){
		console.log(response);
		Ext.Viewport.setMasked(false);
		var fileUP = this.down('#idBtnImagePost');
		fileUP.reset();
		var textField = this.down('#idTxtPost');
		textField.reset();
		Ext.Msg.alert('','Successfully Uploaded');
		Ext.getStore('MainActvityFeed').load();
		Ext.Viewport.setMasked(false);
	},
	onFailUpload: function(response){
		Ext.Viewport.setMasked(false);
		var fileUP = this.down('#idBtnImagePost');
		fileUP.reset();
		Ext.Msg.alert('','Media not Uploaded');
	}
});